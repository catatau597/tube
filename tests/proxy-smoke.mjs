import assert from 'node:assert/strict';

const baseUrl = process.env.APP_URL || 'http://localhost:8888';
const videoId = process.env.STREAM_VIDEO_ID || '';
const clients = Number(process.env.CLIENTS || 4);
const durationSec = Number(process.env.DURATION_SEC || 15);
const timeoutMs = Math.max(1000, durationSec * 1000);

assert.ok(videoId, 'Defina STREAM_VIDEO_ID para executar o smoke test do proxy.');
assert.ok(Number.isFinite(clients) && clients > 0, 'CLIENTS deve ser um número positivo.');

async function runClient(index) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const startedAt = Date.now();

  let status = 0;
  let bytes = 0;
  let chunks = 0;
  let aborted = false;

  try {
    const response = await fetch(`${baseUrl}/api/stream/${encodeURIComponent(videoId)}`, {
      signal: controller.signal,
    });
    status = response.status;

    if (!response.ok || !response.body) {
      return { index, status, bytes, chunks, ms: Date.now() - startedAt, aborted };
    }

    const reader = response.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;
      bytes += value.byteLength;
      chunks += 1;
    }
  } catch (error) {
    if (error?.name === 'AbortError') {
      aborted = true;
    } else {
      throw error;
    }
  } finally {
    clearTimeout(timer);
  }

  return {
    index,
    status,
    bytes,
    chunks,
    ms: Date.now() - startedAt,
    aborted,
  };
}

async function main() {
  console.log(
    `[proxy-smoke] Iniciando: url=${baseUrl} videoId=${videoId} clients=${clients} durationSec=${durationSec}`,
  );

  const results = await Promise.all(
    Array.from({ length: clients }, (_, i) => runClient(i + 1)),
  );

  for (const item of results) {
    console.log(
      `[proxy-smoke] client=${item.index} status=${item.status} bytes=${item.bytes} chunks=${item.chunks} ms=${item.ms} aborted=${item.aborted}`,
    );
  }

  const badStatus = results.filter((item) => item.status !== 200);
  const withData = results.filter((item) => item.bytes > 0);
  const empty200 = results.filter((item) => item.status === 200 && item.bytes === 0);

  assert.equal(badStatus.length, 0, `Clientes com status inesperado: ${badStatus.map((s) => s.status).join(',')}`);
  assert.ok(withData.length > 0, 'Nenhum cliente recebeu dados do stream.');
  assert.equal(empty200.length, 0, 'Há clientes 200 sem receber bytes (possível stall).');

  const totalBytes = results.reduce((sum, item) => sum + item.bytes, 0);
  console.log(`[proxy-smoke] OK totalBytes=${totalBytes}`);
}

main().catch((error) => {
  console.error(`[proxy-smoke] FALHOU: ${error?.message || String(error)}`);
  process.exit(1);
});

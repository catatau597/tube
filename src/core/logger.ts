import fs from 'fs';
import path from 'path';
import { createLogger, format, transports, Logger } from 'winston';
import { WebSocket } from 'ws';

export class WebSocketLogHub {
  private clients = new Set<WebSocket>();

  addClient(client: WebSocket): void {
    this.clients.add(client);
  }

  removeClient(client: WebSocket): void {
    this.clients.delete(client);
  }

  broadcast(payload: object): void {
    const text = JSON.stringify(payload);
    for (const client of this.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(text);
      }
    }
  }
}

class WsTransport extends transports.Stream {
  private hub: WebSocketLogHub;

  constructor(hub: WebSocketLogHub) {
    super({ stream: process.stdout });
    this.hub = hub;
  }

  log(info: Record<string, unknown>, callback: () => void): void {
    setImmediate(() => {
      this.hub.broadcast({
        level: info.level,
        message: info.message,
        module: info.module ?? 'core',
        timestamp: info.timestamp,
      });
      callback();
    });
  }
}

const dataDir = '/data';
fs.mkdirSync(dataDir, { recursive: true });
const logFile = path.join(dataDir, 'tubewranglerr.log');

export const wsLogHub = new WebSocketLogHub();

export const logger: Logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, level, message }) => `${timestamp} ${level.toUpperCase()} ${message}`),
      ),
    }),
    new transports.File({ filename: logFile }),
    new WsTransport(wsLogHub),
  ],
});

export function setLoggerLevel(level: string): void {
  logger.level = level.toLowerCase();
  logger.info(`Nível de log atualizado para ${level}`);
}

import fs from 'fs';
import path from 'path';
import { createLogger, format, transports, Logger } from 'winston';
import { WebSocket } from 'ws';

export interface LogEntry {
  level: string;
  message: string;
  module?: string;
  timestamp: string;
}

export class WebSocketLogHub {
  private clients = new Set<WebSocket>();
  private recentLogs: LogEntry[] = [];

  addClient(client: WebSocket): void {
    this.clients.add(client);
  }

  removeClient(client: WebSocket): void {
    this.clients.delete(client);
  }

  broadcast(payload: object): void {
    const text = JSON.stringify(payload);
    const entry = payload as LogEntry;
    this.recentLogs.push(entry);
    while (this.recentLogs.length > 1000) {
      this.recentLogs.shift();
    }
    for (const client of this.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(text);
      }
    }
  }

  getRecentLogs(limit = 200): LogEntry[] {
    return this.recentLogs.slice(-limit);
  }
}

class WsTransport extends transports.Console {
  private hub: WebSocketLogHub;

  constructor(hub: WebSocketLogHub) {
    super({ silent: true });
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

import { Stream } from './state-manager';

export interface TitleComponent {
  id: 'status' | 'channel' | 'event' | 'datetime';
  enabled: boolean;
  label: string;
}

export interface TitleFormatConfig {
  components: TitleComponent[];
  useBrackets: boolean;
  dateFormat?: string;
}

const DEFAULT_CONFIG: TitleFormatConfig = {
  components: [
    { id: 'status', enabled: true, label: 'STATUS' },
    { id: 'channel', enabled: true, label: 'NOME DO CANAL' },
    { id: 'event', enabled: true, label: 'NOME DO EVENTO' },
    { id: 'datetime', enabled: true, label: 'DATA E HORA' },
  ],
  useBrackets: true,
  dateFormat: 'DD/MM HH:mm',
};

export class TitleFormatter {
  constructor(private config: TitleFormatConfig = DEFAULT_CONFIG) {}

  formatTitle(stream: Stream, channelDisplayName: string): string {
    const parts: string[] = [];

    for (const component of this.config.components) {
      if (!component.enabled) continue;

      let value = '';
      switch (component.id) {
        case 'status':
          value = this.getStatus(stream);
          break;
        case 'channel':
          value = channelDisplayName;
          break;
        case 'event':
          value = stream.titleOriginal;
          break;
        case 'datetime':
          value = this.getDateTime(stream);
          break;
      }

      if (value) {
        parts.push(this.config.useBrackets ? `[${value}]` : value);
      }
    }

    return parts.join(' ').replace(/\s+/g, ' ').trim();
  }

  private getStatus(stream: Stream): string {
    const statusMap: Record<Stream['status'], string> = {
      live: 'AO VIVO',
      upcoming: 'AGENDADO',
      none: 'GRAVADO',
    };
    return statusMap[stream.status] || '';
  }

  private getDateTime(stream: Stream): string {
    const date = stream.scheduledStart || stream.actualStart || stream.fetchTime;
    const format = this.config.dateFormat || 'DD/MM HH:mm';

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');

    return format
      .replace('DD', day)
      .replace('MM', month)
      .replace('HH', hour)
      .replace('mm', minute);
  }

  updateConfig(config: Partial<TitleFormatConfig>): void {
    this.config = { ...this.config, ...config };
  }

  getConfig(): TitleFormatConfig {
    return { ...this.config };
  }
}

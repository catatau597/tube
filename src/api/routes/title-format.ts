import { Router } from 'express';
import { getConfig, setConfig } from '../../core/config-manager';
import { TitleFormatConfig } from '../../core/title-formatter';

export function createTitleFormatRouter(): Router {
  const router = Router();

  router.get('/title-format', (_request, response) => {
    try {
      const raw = getConfig('TITLE_FORMAT_CONFIG');
      const config: TitleFormatConfig = raw
        ? JSON.parse(raw)
        : {
            components: [
              { id: 'status', enabled: true, label: 'STATUS' },
              { id: 'channel', enabled: true, label: 'NOME DO CANAL' },
              { id: 'event', enabled: true, label: 'NOME DO EVENTO' },
              { id: 'datetime', enabled: true, label: 'DATA E HORA' },
            ],
            useBrackets: true,
            dateFormat: 'DD/MM HH:mm',
          };

      response.json(config);
    } catch (error) {
      response.status(500).json({ error: 'Failed to load title format config' });
    }
  });

  router.post('/title-format', (request, response) => {
    try {
      const config: TitleFormatConfig = request.body;

      // Validação básica
      if (!config.components || !Array.isArray(config.components)) {
        response.status(400).json({ error: 'Invalid components' });
        return;
      }

      setConfig('TITLE_FORMAT_CONFIG', JSON.stringify(config));
      response.json({ success: true });
    } catch (error) {
      response.status(500).json({ error: 'Failed to save title format config' });
    }
  });

  return router;
}

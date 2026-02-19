import { Router } from 'express';
import bcrypt from 'bcrypt';
import { getDb } from '../../core/db';

export function createAuthRouter(): Router {
  const router = Router();

  router.post('/login', async (request, response) => {
    const { username, password } = request.body as { username?: string; password?: string };
    if (!username || !password) {
      response.status(400).json({ error: 'username e password são obrigatórios' });
      return;
    }

    const user = getDb()
      .prepare('SELECT id, username, password_hash, must_change_password FROM auth_users WHERE username = ?')
      .get(username) as
      | { id: number; username: string; password_hash: string; must_change_password: number }
      | undefined;

    if (!user) {
      response.status(401).json({ error: 'Credenciais inválidas' });
      return;
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      response.status(401).json({ error: 'Credenciais inválidas' });
      return;
    }

    request.session.user = {
      id: user.id,
      username: user.username,
      mustChangePassword: user.must_change_password === 1,
    };

    response.json({ ok: true, mustChangePassword: user.must_change_password === 1 });
  });

  router.post('/logout', (request, response) => {
    request.session.destroy(() => {
      response.json({ ok: true });
    });
  });

  router.get('/me', (request, response) => {
    if (!request.session.user) {
      response.status(401).json({ error: 'Unauthorized' });
      return;
    }
    response.json(request.session.user);
  });

  router.patch('/password', async (request, response) => {
    if (!request.session.user) {
      response.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { current, new: nextPassword } = request.body as { current?: string; new?: string };
    if (!current || !nextPassword) {
      response.status(400).json({ error: 'current e new são obrigatórios' });
      return;
    }

    const user = getDb()
      .prepare('SELECT password_hash FROM auth_users WHERE id = ?')
      .get(request.session.user.id) as { password_hash: string } | undefined;

    if (!user) {
      response.status(404).json({ error: 'Usuário não encontrado' });
      return;
    }

    const ok = await bcrypt.compare(current, user.password_hash);
    if (!ok) {
      response.status(401).json({ error: 'Senha atual inválida' });
      return;
    }

    const passwordHash = await bcrypt.hash(nextPassword, 10);
    getDb()
      .prepare('UPDATE auth_users SET password_hash = ?, must_change_password = 0, updated_at = datetime(\'now\') WHERE id = ?')
      .run(passwordHash, request.session.user.id);

    request.session.user.mustChangePassword = false;
    response.json({ ok: true });
  });

  return router;
}

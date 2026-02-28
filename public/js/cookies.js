export async function renderCookies(container, api) {
  container.innerHTML = `
    <div class="card">
      <h2>🍪 Perfis de Cookies</h2>
      <p>Gerencie múltiplos perfis de cookies por plataforma. Cada perfil pode ter seu próprio arquivo Netscape e User-Agent.</p>
      
      <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem;">
        <button class="action-btn" id="btn-add-cookie">➕ Adicionar Perfil</button>
        <button class="secondary-btn" id="btn-refresh">🔄 Atualizar</button>
      </div>

      <div id="cookies-list"></div>
    </div>

    <div id="modal-cookie" class="modal" style="display: none;">
      <div class="modal-content">
        <h3 id="modal-title">Adicionar Perfil</h3>
        <form id="form-cookie">
          <label>
            Nome do Perfil
            <input type="text" id="input-name" required placeholder="Ex: Conta Pessoal" />
          </label>
          
          <label>
            Plataforma
            <input type="text" id="input-platform" required placeholder="Ex: youtube, twitch" />
          </label>

          <label>
            Arquivo de Cookies (Netscape)
            <input type="file" id="input-file" accept=".txt" />
            <small>Formato Netscape. Opcional ao editar (deixe vazio para manter o arquivo atual).</small>
          </label>

          <label>
            User-Agent (Opcional)
            <input type="text" id="input-useragent" placeholder="Ex: Mozilla/5.0..." />
            <small>Deixe vazio para usar o padrão do sistema.</small>
          </label>

          <label style="display: flex; align-items: center; gap: 0.5rem;">
            <input type="checkbox" id="input-default" />
            <span>Definir como padrão da plataforma</span>
          </label>

          <label style="display: flex; align-items: center; gap: 0.5rem;">
            <input type="checkbox" id="input-active" checked />
            <span>Perfil ativo</span>
          </label>

          <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 1rem;">
            <button type="button" class="secondary-btn" id="btn-cancel">Cancelar</button>
            <button type="submit" class="action-btn" id="btn-submit">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const list = container.querySelector('#cookies-list');
  const modal = container.querySelector('#modal-cookie');
  const form = container.querySelector('#form-cookie');
  const modalTitle = container.querySelector('#modal-title');
  const btnAdd = container.querySelector('#btn-add-cookie');
  const btnRefresh = container.querySelector('#btn-refresh');
  const btnCancel = container.querySelector('#btn-cancel');

  let editingId = null;

  async function loadProfiles() {
    list.innerHTML = '<p>⏳ Carregando...</p>';
    try {
      const res = await api('/api/cookies');
      const profiles = await res.json();

      if (profiles.length === 0) {
        list.innerHTML = '<p style="color: #6b7280;">Nenhum perfil cadastrado. Clique em "Adicionar Perfil" para começar.</p>';
        return;
      }

      const grouped = profiles.reduce((acc, p) => {
        if (!acc[p.platform]) acc[p.platform] = [];
        acc[p.platform].push(p);
        return acc;
      }, {});

      list.innerHTML = Object.entries(grouped).map(([platform, items]) => `
        <div style="margin-bottom: 2rem;">
          <h3 style="margin-bottom: 1rem; color: #3b82f6;">🎯 ${platform}</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="border-bottom: 1px solid #374151;">
                <th style="text-align: left; padding: 0.5rem;">Nome</th>
                <th style="text-align: center; padding: 0.5rem;">Padrão</th>
                <th style="text-align: center; padding: 0.5rem;">Ativo</th>
                <th style="text-align: center; padding: 0.5rem;">Criado</th>
                <th style="text-align: center; padding: 0.5rem;">Ações</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(p => `
                <tr style="border-bottom: 1px solid #1f2937;">
                  <td style="padding: 0.75rem;">
                    <strong>${p.name}</strong>
                    ${p.user_agent ? `<br><small style="color: #9ca3af;">${p.user_agent.slice(0, 50)}...</small>` : ''}
                  </td>
                  <td style="text-align: center; padding: 0.75rem;">
                    ${p.is_default ? '<span style="color: #22c55e;">✔️</span>' : '<span style="color: #6b7280;">—</span>'}
                  </td>
                  <td style="text-align: center; padding: 0.75rem;">
                    <button class="icon-btn" data-toggle="${p.id}" title="Toggle ativo/inativo">
                      ${p.active ? '🟢' : '🔴'}
                    </button>
                  </td>
                  <td style="text-align: center; padding: 0.75rem; color: #9ca3af; font-size: 0.875rem;">
                    ${new Date(p.created_at).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}
                  </td>
                  <td style="text-align: center; padding: 0.75rem;">
                    <button class="icon-btn" data-edit="${p.id}" title="Editar">✏️</button>
                    ${!p.is_default ? `<button class="icon-btn" data-set-default="${p.id}" title="Definir como padrão">⭐</button>` : ''}
                    <button class="danger-btn" data-delete="${p.id}" title="Excluir" style="padding: 0.25rem 0.5rem; font-size: 0.875rem;">🗑️</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `).join('');

      // Event listeners para ações
      list.querySelectorAll('[data-toggle]').forEach(btn => {
        btn.addEventListener('click', async () => {
          const id = btn.dataset.toggle;
          await api(`/api/cookies/${id}/toggle-active`, { method: 'POST' });
          loadProfiles();
        });
      });

      list.querySelectorAll('[data-edit]').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.edit;
          const profile = profiles.find(p => p.id === parseInt(id));
          openModal(profile);
        });
      });

      list.querySelectorAll('[data-set-default]').forEach(btn => {
        btn.addEventListener('click', async () => {
          const id = btn.dataset.setDefault;
          if (confirm('Definir este perfil como padrão para a plataforma?')) {
            await api(`/api/cookies/${id}/set-default`, { method: 'POST' });
            loadProfiles();
          }
        });
      });

      list.querySelectorAll('[data-delete]').forEach(btn => {
        btn.addEventListener('click', async () => {
          const id = btn.dataset.delete;
          if (confirm('Excluir este perfil? O arquivo de cookies será removido.')) {
            await api(`/api/cookies/${id}`, { method: 'DELETE' });
            loadProfiles();
          }
        });
      });
    } catch (err) {
      console.error('[cookies] Erro ao carregar:', err);
      list.innerHTML = `<p style="color: #fca5a5;">Erro ao carregar perfis: ${err.message}</p>`;
    }
  }

  function openModal(profile = null) {
    editingId = profile ? profile.id : null;
    modalTitle.textContent = profile ? 'Editar Perfil' : 'Adicionar Perfil';
    form.reset();

    if (profile) {
      container.querySelector('#input-name').value = profile.name;
      container.querySelector('#input-platform').value = profile.platform;
      container.querySelector('#input-platform').disabled = true; // Não permite mudar plataforma ao editar
      container.querySelector('#input-useragent').value = profile.user_agent || '';
      container.querySelector('#input-default').checked = profile.is_default === 1;
      container.querySelector('#input-active').checked = profile.active === 1;
      // Arquivo é opcional ao editar
      container.querySelector('#input-file').required = false;
    } else {
      container.querySelector('#input-platform').disabled = false;
      container.querySelector('#input-file').required = true;
    }

    modal.style.display = 'flex';
  }

  function closeModal() {
    modal.style.display = 'none';
    editingId = null;
    form.reset();
  }

  btnAdd.addEventListener('click', () => openModal());
  btnRefresh.addEventListener('click', loadProfiles);
  btnCancel.addEventListener('click', closeModal);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', container.querySelector('#input-name').value);
    formData.append('platform', container.querySelector('#input-platform').value);
    formData.append('userAgent', container.querySelector('#input-useragent').value);
    formData.append('isDefault', container.querySelector('#input-default').checked);
    formData.append('active', container.querySelector('#input-active').checked);

    const fileInput = container.querySelector('#input-file');
    if (fileInput.files.length > 0) {
      formData.append('cookieFile', fileInput.files[0]);
    }

    try {
      container.querySelector('#btn-submit').disabled = true;
      container.querySelector('#btn-submit').textContent = '⏳ Salvando...';

      if (editingId) {
        await api(`/api/cookies/${editingId}`, { method: 'PUT', body: formData });
      } else {
        await api('/api/cookies', { method: 'POST', body: formData });
      }

      closeModal();
      await loadProfiles();
    } catch (err) {
      alert(`Erro ao salvar: ${err.message}`);
      console.error('[cookies] Erro ao salvar:', err);
    } finally {
      container.querySelector('#btn-submit').disabled = false;
      container.querySelector('#btn-submit').textContent = 'Salvar';
    }
  });

  // Fechar modal ao clicar fora
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  await loadProfiles();
}

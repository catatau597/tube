export async function renderTitleFormat(container, api) {
  let config = await loadConfig(api);

  container.innerHTML = `
    <div class="card">
      <h2>Formato de Título</h2>
      <p>Configure como os títulos das playlists serão exibidos.</p>
    </div>

    <div class="card">
      <h3>Componentes e Ordem</h3>
      <p>Arraste os itens para reordenar. Ative ou desative os componentes que aparecerão no título final.</p>
      
      <div id="components-list" class="components-list"></div>
      
      <div style="margin-top: 1.5rem">
        <label class="toggle-switch">
          <input type="checkbox" id="use-brackets" ${config.useBrackets ? 'checked' : ''}>
          <span class="slider"></span>
        </label>
        <label for="use-brackets" style="margin-left: 0.5rem">Usar marcadores [ ]</label>
      </div>
    </div>

    <div class="card">
      <h3>Pré-visualização</h3>
      <div id="preview" class="preview-box"></div>
      <p style="opacity: 0.7; font-size: 0.9rem; margin-top: 0.5rem">
        Nota: A playlist do YouTube só aparecerá se a informação estiver disponível na API para o evento específico.
      </p>
    </div>

    <div class="card">
      <button id="save-btn" class="action-btn">Salvar Alterações</button>
    </div>
  `;

  renderComponentsList();
  updatePreview();

  document.getElementById('use-brackets').addEventListener('change', (e) => {
    config.useBrackets = e.target.checked;
    updatePreview();
  });

  document.getElementById('save-btn').addEventListener('click', async () => {
    await saveConfig(api);
  });

  function renderComponentsList() {
    const list = document.getElementById('components-list');
    list.innerHTML = config.components
      .map(
        (comp, idx) => `
        <div class="component-item" draggable="true" data-index="${idx}">
          <span class="drag-handle">☰</span>
          <label class="toggle-switch">
            <input type="checkbox" data-id="${comp.id}" ${comp.enabled ? 'checked' : ''}>
            <span class="slider"></span>
          </label>
          <span class="component-label">[${comp.label}]</span>
        </div>
      `,
      )
      .join('');

    // Toggle checkboxes
    list.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.addEventListener('change', (e) => {
        const comp = config.components.find((c) => c.id === e.target.dataset.id);
        if (comp) comp.enabled = e.target.checked;
        updatePreview();
      });
    });

    // Drag & Drop
    const items = list.querySelectorAll('.component-item');
    items.forEach((item) => {
      item.addEventListener('dragstart', handleDragStart);
      item.addEventListener('dragover', handleDragOver);
      item.addEventListener('drop', handleDrop);
      item.addEventListener('dragend', handleDragEnd);
    });
  }

  let draggedIndex = null;

  function handleDragStart(e) {
    draggedIndex = parseInt(e.target.dataset.index);
    e.target.style.opacity = '0.5';
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const dropIndex = parseInt(e.target.closest('.component-item').dataset.index);
    if (draggedIndex !== dropIndex) {
      const [dragged] = config.components.splice(draggedIndex, 1);
      config.components.splice(dropIndex, 0, dragged);
      renderComponentsList();
      updatePreview();
    }
  }

  function handleDragEnd(e) {
    e.target.style.opacity = '1';
    draggedIndex = null;
  }

  function updatePreview() {
    const parts = [];
    for (const comp of config.components) {
      if (!comp.enabled) continue;
      let value = '';
      switch (comp.id) {
        case 'status':
          value = 'AO VIVO';
          break;
        case 'channel':
          value = 'CazéTV';
          break;
        case 'event':
          value = 'Final da Copa';
          break;
        case 'datetime':
          value = '15/02 21:00';
          break;
      }
      if (value) {
        parts.push(config.useBrackets ? `[${value}]` : value);
      }
    }
    document.getElementById('preview').textContent = parts.join(' ');
  }

  async function loadConfig(api) {
    const response = await api('/api/title-format');
    return response.json();
  }

  async function saveConfig(api) {
    const btn = document.getElementById('save-btn');
    btn.disabled = true;
    btn.textContent = 'Salvando...';
    try {
      await api('/api/title-format', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      btn.textContent = '✔ Salvo!';
      setTimeout(() => {
        btn.textContent = 'Salvar Alterações';
        btn.disabled = false;
      }, 2000);
    } catch (error) {
      btn.textContent = '❌ Erro ao salvar';
      setTimeout(() => {
        btn.textContent = 'Salvar Alterações';
        btn.disabled = false;
      }, 3000);
    }
  }
}

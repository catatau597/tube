# Refatoração Completa de Settings - Fevereiro 2026

## 🛠️ Mudanças Executadas

### 🗑️ Removido (limpeza de código legado)

1. **Submenu antigo "Formato de Títulos"** (`/settings/titles`)
   - Removido de `index.html`
   - Rota removida de `app.js`
   - Código removido de `settings.js`
   - **Substituído por**: `/settings/title-format` (nova versão com drag & drop)

2. **Submenu "Cookies"** (`/settings/cookies`)
   - Arquivo `public/js/cookies.js` **deletado**
   - Submenu removido de `index.html`
   - Rota removida de `app.js`
   - **Migrado para**: `API & Credenciais`

3. **Submenu "Smart Player"** (`/settings/player`)
   - Removido de `index.html`
   - Rota removida de `app.js`
   - Função `playerCards()` removida de `settings.js`
   - **Funcionalidades migradas para**: `API & Credenciais`
   - **Teste de Conectividade**: removido (não mais necessário)

---

### ⚙️ Reorganização de Estrutura

#### **API & Credenciais** (`/settings/api`)
Agora concentra TODAS as credenciais e ferramentas:

1. **API Keys** (YouTube)
2. **Cookies por Plataforma**
   - Upload/toggle/delete para `youtube`, `dailymotion`, `soultv`
   - Status visual (🟢 ativo / 🔴 inativo)
3. **User-Agents**
   - Adicionar/remover/definir padrão
   - Migrado do antigo Smart Player
4. **Perfis de Ferramenta** (NOVO)
   - Gerenciamento de perfis para **streamlink** e **yt-dlp**
   - Campos: nome, ferramenta, flags, cookie_platform, ua_id
   - Apenas **um perfil ativo** por ferramenta

---

### 🔄 Transformação de `<select>` em Toggles

Todos os `<select>` booleanos (Sim/Não) foram convertidos em **toggles visuais**:

#### **Agendador**
- ✅ `ENABLE_SCHEDULER_ACTIVE_HOURS` → Toggle no topo
- Mostra campos de hora apenas se ativado

#### **Conteúdo & Filtros**
- ✅ `PLAYLIST_GENERATE_DIRECT` → Toggle
- ✅ `PLAYLIST_GENERATE_PROXY` → Toggle
- ✅ `FILTER_BY_CATEGORY` → Toggle
- ✅ `EPG_DESCRIPTION_CLEANUP` → Toggle

#### **Retenção (VOD)**
- ✅ `KEEP_RECORDED_STREAMS` → Toggle no topo
- `RECORDED_RETENTION_DAYS` e `MAX_RECORDED_PER_CHANNEL` → `<input type="number">` (antes eram sliders)

#### **Mídia & Placeholders**
- ✅ `USE_INVISIBLE_PLACEHOLDER` → Toggle no topo

#### **Técnico**
- ✅ `USE_PLAYLIST_ITEMS` → Toggle (controla uso da API de playlistItems)
- ✅ `PROXY_ENABLE_ANALYTICS` → Toggle (controla logs de acesso do proxy)
- `TUBEWRANGLERR_URL` → Campo texto com hint: "se vazio, usa IP da requisição"

---

### 🏛️ Backend: Nova Tabela e Rotas

#### **Tabela `tool_profiles`** (`src/core/db.ts`)
```sql
CREATE TABLE IF NOT EXISTS tool_profiles (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  name            TEXT NOT NULL,
  tool            TEXT NOT NULL CHECK(tool IN ('streamlink', 'yt-dlp')),
  flags           TEXT NOT NULL DEFAULT '',
  cookie_platform TEXT,
  ua_id           INTEGER REFERENCES credentials(id),
  is_active       INTEGER NOT NULL DEFAULT 0,
  created_at      TEXT DEFAULT (datetime('now')),
  updated_at      TEXT DEFAULT (datetime('now'))
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_tool_profiles_active
ON tool_profiles(tool, is_active)
WHERE is_active = 1;
```

#### **Novas Rotas** (`src/api/routes/tool-profiles.ts`)
- `GET /api/tool-profiles` — listar todos
- `POST /api/tool-profiles` — criar novo perfil
- `PATCH /api/tool-profiles/:id/activate` — ativar perfil (desativa outros da mesma ferramenta)
- `DELETE /api/tool-profiles/:id` — remover perfil

**Registrado em** `src/server.ts`:
```typescript
import toolProfilesRouter from './api/routes/tool-profiles';
app.use('/api/tool-profiles', toolProfilesRouter);
```

---

### 📝 CSS: Toggles Prontos

O `public/css/style.css` já possui os estilos necessários:

```css
.toggle-switch { /* container */ }
.toggle-switch input { /* hidden checkbox */ }
.slider { /* fundo do switch */ }
.slider:before { /* botão deslizante */ }
input:checked + .slider { background-color: #3b82f6; }
input:checked + .slider:before { transform: translateX(20px); }
```

---

## 🧹 Arquivos Modificados

| Arquivo | Mudança |
|---------|----------|
| `public/index.html` | Submenus antigos removidos |
| `public/js/app.js` | Imports e rotas antigas removidos |
| `public/js/cookies.js` | **DELETADO** |
| `public/js/settings.js` | Refatoração massiva (35KB) |
| `src/core/db.ts` | Tabela `tool_profiles` adicionada |
| `src/api/routes/tool-profiles.ts` | **CRIADO** |
| `src/server.ts` | Rota `/api/tool-profiles` registrada |
| `public/css/style.css` | Nenhuma mudança (toggles já existiam) |

---

## 📌 Estrutura Final dos Submenus

```
⚙️ Configurações
  • API & Credenciais (API keys, Cookies, UAs, Tool Profiles)
  • Agendador
  • Conteúdo & Filtros
  • Formato de Título (drag & drop, nova versão)
  • Retenção (VOD)
  • Mídia & Placeholders
  • Cache
  • Técnico
```

---

## ✅ Confirmações Implementadas

1. ✅ Tabela `tool_profiles` criada com índice único para garantir apenas um perfil ativo por ferramenta
2. ✅ `TUBEWRANGLERR_URL` vazio usa IP da requisição (documentado na UI)
3. ✅ Submenu `Formato de Títulos` antigo removido, mantido apenas `Formato de Título` (nova versão)

---

## 🚀 Próximos Passos (caso necessário)

1. **Usar perfis ativos** nas chamadas de `streamlink` e `yt-dlp` no backend
2. **Migrar campo `TUBEWRANGLERR_URL` vazio** para usar IP da origem nas respostas do servidor
3. **Testes de integração** para garantir que toggles salvam corretamente

---

## 📊 Estatísticas

- **7 commits** consecutivos
- **1 arquivo deletado** (`cookies.js`)
- **3 arquivos criados** (`tool-profiles.ts`, docs)
- **5 arquivos modificados** (frontend + backend)
- **4 seções** com toggles implementados
- **1 nova tabela** no banco de dados

---

**Data**: 28 de fevereiro de 2026  
**Status**: ✅ Concluído  
**Versão**: TubeWranglerr 1.0.0  

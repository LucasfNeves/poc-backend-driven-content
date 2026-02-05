# Backend Driven Content

API REST para gerenciamento de componentes UI com suporte a WebSocket para live preview.

## 📋 Índice

- [Sobre](#sobre)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [API Endpoints](#api-endpoints)
- [Validação de Componentes](#validação-de-componentes)
- [Exemplos de Componentes](#exemplos-de-componentes)
- [WebSocket](#websocket)
- [Seeds](#seeds)
- [Docker](#docker)
- [Estrutura do Projeto](#estrutura-do-projeto)

## 🎯 Sobre

Sistema de Backend Driven UI que permite criar, atualizar e gerenciar componentes de interface através de uma API REST, com validação rigorosa e notificações em tempo real via WebSocket.

**Principais características:**
- ✅ Validação rigorosa de schemas com Zod
- ✅ Compatibilidade garantida com Flutter
- ✅ Live preview via WebSocket
- ✅ Validação recursiva de componentes aninhados
- ✅ Type-safe com TypeScript

## 🛠 Tecnologias

- **Node.js** + **TypeScript**
- **Fastify** - Framework web
- **Prisma** - ORM
- **PostgreSQL** - Banco de dados
- **WebSocket** - Comunicação em tempo real
- **Zod** - Validação de schemas
- **Docker** - Containerização

## 📦 Instalação

```bash
# Clone o repositório
git clone <seu-repositorio>
cd poc-backend-driven-content

# Instale as dependências
npm install

# Configure o banco de dados
cp .env.example .env

# Execute as migrations
npx prisma migrate dev
```

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
PORT=3000
HOST=0.0.0.0
API_URL=""
```

## 🚀 Uso

### Desenvolvimento

```bash
npm run dev
# ou
make dev
```

### Produção

```bash
npm run build
npm start
```

## 📡 API Endpoints

### Listar todos os componentes

```http
GET /api/components
```

**Resposta:**
```json
[
  {
    "id": "uuid",
    "name": "welcome-text",
    "component": { ... },
    "version": 1,
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### Buscar componente por nome

```http
GET /api/components/:name
```

### Criar componente

```http
POST /api/components
Content-Type: application/json

{
  "name": "my-component",
  "component": { ... }
}
```

### Atualizar componente

```http
PUT /api/components/:name
Content-Type: application/json

{
  "component": { ... }
}
```

### Deletar componente

```http
DELETE /api/components/:id
```

## ✅ Validação de Componentes

A API valida rigorosamente todos os componentes para garantir compatibilidade com o Flutter.

### Validações Implementadas

| Validação | Descrição |
|-----------|-----------|
| **Propriedades obrigatórias** | Campos como `data` em `text` são obrigatórios |
| **Tipos corretos** | Números devem ser positivos onde aplicável |
| **Enums validados** | `fontWeight` aceita apenas `w100`-`w900` |
| **Sem propriedades extras** | `.strict()` rejeita campos não definidos |
| **Validação recursiva** | Componentes aninhados também são validados |

### Tipos de Componentes Suportados

- `text` - Texto com estilo
- `icon` - Ícones Material
- `image` - Imagens
- `iconButton` - Botão com ícone
- `appBar` - Barra de aplicativo
- `sizedBox` - Caixa com tamanho fixo
- `spacer` - Espaçador flexível
- `column` - Layout vertical
- `row` - Layout horizontal
- `container` - Container com decoração
- `padding` - Espaçamento interno
- `scaffold` - Estrutura de tela

## 📝 Exemplos de Componentes

### Text Component

**✅ Válido:**
```json
{
  "name": "welcome-text",
  "component": {
    "type": "text",
    "data": "Bem-vindo!",
    "style": {
      "fontSize": 24,
      "fontWeight": "w700",
      "color": 4294198070
    }
  }
}
```

**❌ Inválido:**
```json
{
  "name": "invalid-text",
  "component": {
    "type": "text",
    "data": "Test",
    "style": {
      "fontWeight": "bold"
    }
  }
}
```
❌ Erro: `Invalid enum value. Expected 'w100' | 'w200' | ... | 'w900', received 'bold'`

### Column Component

**✅ Válido:**
```json
{
  "name": "home-column",
  "component": {
    "type": "column",
    "mainAxisAlignment": "center",
    "crossAxisAlignment": "center",
    "spacing": 10,
    "children": [
      {
        "type": "text",
        "data": "Título",
        "style": {
          "fontSize": 32,
          "fontWeight": "w700"
        }
      },
      {
        "type": "text",
        "data": "Subtítulo",
        "style": {
          "fontSize": 16
        }
      }
    ]
  }
}
```

**❌ Inválido:**
```json
{
  "name": "invalid-column",
  "component": {
    "type": "column",
    "children": [
      {
        "type": "text",
        "style": {
          "fontSize": 16
        }
      }
    ]
  }
}
```
❌ Erro: `Required` (falta `data` obrigatório)

### Row Component

**✅ Válido:**
```json
{
  "name": "action-row",
  "component": {
    "type": "row",
    "mainAxisAlignment": "spaceBetween",
    "children": [
      {
        "type": "text",
        "data": "Left"
      },
      {
        "type": "text",
        "data": "Right"
      }
    ]
  }
}
```

**❌ Inválido:**
```json
{
  "name": "invalid-row",
  "component": {
    "type": "row",
    "mainAxisAlignment": "middle",
    "children": [
      {
        "type": "text",
        "data": "Test"
      }
    ]
  }
}
```
❌ Erro: `Invalid enum value. Expected 'start' | 'end' | 'center' | 'spaceBetween' | 'spaceAround' | 'spaceEvenly', received 'middle'`

### Container Component

**✅ Válido:**
```json
{
  "name": "card-container",
  "component": {
    "type": "container",
    "width": 200,
    "height": 100,
    "color": 4294967295,
    "child": {
      "type": "text",
      "data": "Inside Container"
    }
  }
}
```

**❌ Inválido:**
```json
{
  "name": "invalid-container",
  "component": {
    "type": "container",
    "width": -100,
    "child": {
      "type": "text",
      "data": "Test"
    }
  }
}
```
❌ Erro: `Width must be a positive number`

### Padding Component

**✅ Válido:**
```json
{
  "name": "padded-text",
  "component": {
    "type": "padding",
    "padding": {
      "top": 16,
      "left": 16,
      "right": 16,
      "bottom": 16
    },
    "child": {
      "type": "text",
      "data": "Hello World",
      "style": {
        "fontSize": 20,
        "fontWeight": "w700"
      }
    }
  }
}
```

**❌ Inválido:**
```json
{
  "name": "invalid-padding",
  "component": {
    "type": "padding",
    "padding": {
      "top": -10
    },
    "child": {
      "type": "text",
      "data": "Test"
    }
  }
}
```
❌ Erro: `Top padding must be 0 or greater`

### Scaffold Component

**✅ Válido:**
```json
{
  "name": "main-scaffold",
  "component": {
    "type": "scaffold",
    "backgroundColor": 4294967295,
    "appBar": {
      "type": "appBar",
      "title": {
        "type": "text",
        "data": "My App"
      }
    },
    "body": {
      "type": "text",
      "data": "Body content"
    }
  }
}
```

**❌ Inválido:**
```json
{
  "name": "invalid-scaffold",
  "component": {
    "type": "scaffold",
    "body": {
      "type": "text",
      "style": {
        "fontSize": 20
      }
    }
  }
}
```
❌ Erro: `Required` (falta `data` no text)

## 🔄 WebSocket

Conecte-se ao WebSocket para receber atualizações em tempo real:

```
ws://localhost:3000/ws/live-preview
```

### Eventos

| Evento | Descrição |
|--------|-----------|
| `component:created` | Componente criado |
| `component:updated` | Componente atualizado |
| `component:deleted` | Componente deletado |

### Exemplo (Flutter)

```dart
import 'package:web_socket_channel/web_socket_channel.dart';

final channel = WebSocketChannel.connect(
  Uri.parse('ws://SEU_IP:3000/ws/live-preview'),
);

channel.stream.listen((message) {
  final data = json.decode(message);
  if (data['type'] == 'component:updated') {
    // Recarregar componente
  }
});
```

## 🌱 Seeds

### Comandos

```bash
# Criar componentes
npm run seed:create
make seed-create

# Atualizar componentes
npm run seed:update
make seed-update

# Deletar componentes
npm run seed:delete
make seed-delete

# Resetar banco
make db-reset
```

### Adicionar Novo Componente

1. Crie `seeds/components/meu-componente.ts`:

```typescript
import { TextBuilder } from '@/domain/components/builders/TextBuilder';

export const meuComponente = new TextBuilder()
  .data('Meu texto')
  .fontSize(18)
  .build();
```

2. Exporte em `seeds/components/index.ts`:

```typescript
export { meuComponente } from './meu-componente';
```

3. Adicione em `seeds/seed.ts`:

```typescript
const componentsList: ComponentDefinition[] = [
  { name: 'meu-componente', component: components.meuComponente },
];
```

4. Execute:

```bash
npm run seed:create
```

## 🐳 Docker

### Comandos

```bash
# Subir containers
npm run docker:up
make up

# Parar containers
npm run docker:down
make down

# Acessar shell
npm run docker:exec
make exec

# Ver logs
make logs
```

### Docker Compose

```bash
docker compose -f docker/docker-compose.yml up -d
docker compose -f docker/docker-compose.yml down
```

## 📂 Estrutura do Projeto

```
.
├── src/
│   ├── domain/              # Lógica de negócio
│   │   ├── components/      # Builders e tipos
│   │   ├── entities/        # Entidades
│   │   └── interfaces/      # Contratos
│   ├── application/         # Casos de uso
│   │   ├── controller/      # Controllers
│   │   └── use-cases/       # Use cases
│   ├── infra/               # Infraestrutura
│   │   ├── database/        # Configuração DB
│   │   └── repositories/    # Repositórios
│   ├── shared/              # Código compartilhado
│   │   ├── schemas/         # Schemas Zod
│   │   └── helpers/         # Utilitários
│   └── server.ts            # Entrada
├── seeds/                   # Seeds
├── prisma/                  # Schema e migrations
└── docker/                  # Docker configs
```

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Servidor em modo watch
npm run build            # Build do projeto
npm start                # Servidor de produção

# Qualidade de código
npm run lint             # Verifica erros
npm run lint:fix         # Corrige erros
npm run format           # Formata código
npm run format:check     # Verifica formatação

# Seeds
npm run seed:create      # Cria componentes
npm run seed:update      # Atualiza componentes
npm run seed:delete      # Deleta componentes

# Docker
npm run docker:up        # Sobe containers
npm run docker:down      # Para containers
npm run docker:exec      # Acessa shell
```

## 📄 Licença

ISC

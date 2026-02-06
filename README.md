# Backend Driven Content

API REST para gerenciamento de componentes UI com suporte a WebSocket para live preview.

## Índice

- [Sobre](#sobre)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Uso](#uso)
- [API Endpoints](#api-endpoints)
- [Validação](#validação)
- [WebSocket](#websocket)
- [Seeds](#seeds)
- [Docker](#docker)

## Sobre

Sistema de Backend Driven UI que permite criar, atualizar e gerenciar componentes de interface através de uma API REST, com validação rigorosa e notificações em tempo real via WebSocket.

**Características:**
- Validação rigorosa de schemas com Zod
- Compatibilidade garantida com Flutter
- Live preview via WebSocket
- Validação recursiva de componentes aninhados
- Type-safe com TypeScript

## Tecnologias

- Node.js + TypeScript
- Fastify
- Prisma + PostgreSQL
- WebSocket
- Zod
- Docker

## Instalação

```bash
git clone <seu-repositorio>
cd poc-backend-driven-content
npm install
cp .env.example .env
npx prisma migrate dev
```

## Uso

**Desenvolvimento:**
```bash
npm run dev
```

**Produção:**
```bash
npm run build
npm start
```

## API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/components` | Lista todos os componentes |
| GET | `/api/components/:name` | Busca componente por nome |
| POST | `/api/components` | Cria novo componente |
| PUT | `/api/components/:name` | Atualiza componente |
| DELETE | `/api/components/:id` | Deleta componente |

### Exemplo de Requisição

```http
POST /api/components
Content-Type: application/json

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

## Validação

A API valida rigorosamente todos os componentes para garantir compatibilidade com o Flutter.

### Regras de Validação

- Propriedades obrigatórias (ex: `data` em `text`)
- Tipos corretos (números positivos onde aplicável)
- Enums validados (`fontWeight`: `w100`-`w900`)
- Sem propriedades extras (`.strict()`)
- Validação recursiva de componentes aninhados

### Componentes Suportados

- `text`, `icon`, `image`, `iconButton`
- `appBar`, `sizedBox`, `spacer`
- `column`, `row`, `container`, `padding`, `scaffold`

### Exemplo de Erro

```json
{
  "type": "text",
  "data": "Test",
  "style": {
    "fontWeight": "bold"
  }
}
```

Erro: `Invalid enum value. Expected 'w100' | 'w200' | ... | 'w900', received 'bold'`

## WebSocket

Conecte-se para receber atualizações em tempo real:

```
ws://localhost:3000/ws/live-preview
```

**Eventos:**
- `component:created`
- `component:updated`
- `component:deleted`

**Exemplo (Flutter):**
```dart
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

## Seeds

```bash
npm run seed:create    # Criar componentes
npm run seed:update    # Atualizar componentes
npm run seed:delete    # Deletar componentes
make db-reset          # Resetar banco
```

## Docker

```bash
npm run docker:up      # Subir containers
npm run docker:down    # Parar containers
make logs              # Ver logs
```

## Scripts

```bash
npm run dev            # Desenvolvimento
npm run build          # Build
npm start              # Produção
npm run lint           # Lint
npm run format         # Format
```

## Estrutura

```
src/
├── domain/            # Lógica de negócio
├── application/       # Casos de uso
├── infra/             # Infraestrutura
├── shared/            # Código compartilhado
└── server.ts          # Entrada
```

## Licença

ISC

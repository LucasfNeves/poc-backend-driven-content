# Backend Driven Content

API REST para gerenciamento de componentes UI com suporte a WebSocket para live preview.

## Índice

- [Sobre](#sobre)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Seeds de Componentes](#seeds-de-componentes)
- [API Endpoints](#api-endpoints)
- [WebSocket](#websocket)
- [Docker](#docker)
- [Testes](#testes)

## Sobre

Sistema de Backend Driven UI que permite criar, atualizar e gerenciar componentes de interface através de uma API REST, com notificações em tempo real via WebSocket para desenvolvimento.

## Tecnologias

- **Node.js** + **TypeScript**
- **Fastify** - Framework web
- **Prisma** - ORM
- **PostgreSQL** - Banco de dados
- **WebSocket** - Comunicação em tempo real
- **Zod** - Validação de schemas
- **Docker** - Containerização

## Instalação

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

## Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# Server
PORT=3000
HOST=0.0.0.0

# API de Produção (deixe vazio para desenvolvimento)
API_URL=""
```

## Uso

### Desenvolvimento

```bash
# Inicia o servidor em modo watch
npm run dev
# ou
make dev
```

### Produção

```bash
# Build
npm run build

# Start
npm start
```

## Seeds de Componentes

Os seeds permitem popular o banco de dados com componentes pré-definidos.

### Estrutura

```
seeds/
├── components/
│   ├── main-appbar.ts      # AppBar principal
│   ├── welcome-text.ts     # Texto de boas-vindas
│   ├── home-screen.ts      # Tela home completa
│   └── index.ts            # Exporta todos
└── seed.ts                 # Script principal
```

### Comandos

```bash
# Criar componentes (primeira vez)
npm run seed:create
make seed-create

# Atualizar componentes existentes
npm run seed:update
make seed-update

# Deletar todos componentes
npm run seed:delete
make seed-delete

# Resetar banco e criar componentes
make db-reset
```

### Adicionar Novo Componente

1. Crie o arquivo em `seeds/components/meu-componente.ts`:

```typescript
import { TextBuilder } from '@/domain/components/builders/TextBuilder';

export const meuComponente = new TextBuilder().data('Meu texto').fontSize(18).build();
```

2. Exporte em `seeds/components/index.ts`:

```typescript
export { meuComponente } from './meu-componente';
```

3. Adicione em `seeds/seed.ts`:

```typescript
const componentsList: ComponentDefinition[] = [
  // ... outros
  { name: 'meu-componente', component: components.meuComponente },
];
```

4. Execute:

```bash
npm run seed:create
```

## API Endpoints

### Componentes

#### Listar todos

```http
GET /api/components
```

#### Buscar por nome

```http
GET /api/components/:name
```

#### Criar

```http
POST /api/components
Content-Type: application/json

{
  "name": "my-component",
  "component": { ... }
}
```

#### Atualizar

```http
PUT /api/components/:name
Content-Type: application/json

{
  "component": { ... }
}
```

#### Deletar

```http
DELETE /api/components/:id
```

### Criando Componentes via JSON

Você pode criar componentes diretamente via API usando JSON:

#### Exemplo: Text Component

```json
{
  "name": "welcome-text",
  "component": {
    "type": "Text",
    "properties": {
      "data": "Bem-vindo!",
      "fontSize": 24,
      "fontWeight": "bold",
      "color": "#FF5722"
    }
  }
}
```

#### Exemplo: AppBar Component

```json
{
  "name": "main-appbar",
  "component": {
    "type": "AppBar",
    "properties": {
      "title": {
        "type": "Text",
        "properties": {
          "data": "Meu App",
          "fontSize": 20,
          "color": "#FFFFFF"
        }
      },
      "backgroundColor": "#2196F3",
      "elevation": 4
    }
  }
}
```

#### Exemplo: Column com múltiplos filhos

```json
{
  "name": "home-screen",
  "component": {
    "type": "Column",
    "properties": {
      "mainAxisAlignment": "center",
      "crossAxisAlignment": "center",
      "children": [
        {
          "type": "Text",
          "properties": {
            "data": "Título",
            "fontSize": 32,
            "fontWeight": "bold"
          }
        },
        {
          "type": "Text",
          "properties": {
            "data": "Subtítulo",
            "fontSize": 16,
            "color": "#757575"
          }
        }
      ]
    }
  }
}
```

#### Exemplo: Container com padding

```json
{
  "name": "card-component",
  "component": {
    "type": "Container",
    "properties": {
      "padding": {
        "type": "EdgeInsets",
        "properties": {
          "left": 16,
          "top": 16,
          "right": 16,
          "bottom": 16
        }
      },
      "decoration": {
        "type": "BoxDecoration",
        "properties": {
          "color": "#FFFFFF",
          "borderRadius": 8,
          "boxShadow": [
            {
              "color": "#00000029",
              "blurRadius": 4,
              "offset": { "dx": 0, "dy": 2 }
            }
          ]
        }
      },
      "child": {
        "type": "Text",
        "properties": {
          "data": "Conteúdo do Card"
        }
      }
    }
  }
}
```

## 🔄 WebSocket

Conecte-se ao WebSocket para receber atualizações em tempo real:

```
ws://localhost:3000/ws/live-preview
```

### Eventos

- `component:created` - Componente criado
- `component:updated` - Componente atualizado
- `component:deleted` - Componente deletado

### Exemplo (Flutter)

```dart
final channel = WebSocketChannel.connect(
  Uri.parse('ws://SEU_IP:3000/ws/live-preview'),
);

channel.stream.listen((message) {
  print('Atualização recebida: $message');
});
```

## 📱 Consumindo no Flutter

### 1. Buscar componente da API

```dart
import 'package:http/http.dart' as http;
import 'dart:convert';

Future<Map<String, dynamic>> fetchComponent(String name) async {
  final response = await http.get(
    Uri.parse('http://SEU_IP:3000/api/components/$name'),
  );

  if (response.statusCode == 200) {
    return json.decode(response.body);
  } else {
    throw Exception('Failed to load component');
  }
}
```

### 2. Renderizar componente dinamicamente

Usando o exemplo do **home-screen** (Column com múltiplos filhos):

```dart
import 'package:flutter/material.dart';

class DynamicComponentScreen extends StatefulWidget {
  @override
  _DynamicComponentScreenState createState() => _DynamicComponentScreenState();
}

class _DynamicComponentScreenState extends State<DynamicComponentScreen> {
  Map<String, dynamic>? componentData;
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    loadComponent();
  }

  Future<void> loadComponent() async {
    try {
      final data = await fetchComponent('home-screen');
      setState(() {
        componentData = data['component'];
        isLoading = false;
      });
    } catch (e) {
      print('Error: $e');
      setState(() => isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    if (isLoading) {
      return Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }

    return Scaffold(
      appBar: AppBar(title: Text('Backend Driven UI')),
      body: componentData != null
          ? buildComponent(componentData!)
          : Center(child: Text('No component found')),
    );
  }

  Widget buildComponent(Map<String, dynamic> component) {
    final type = component['type'];
    final properties = component['properties'] ?? {};

    switch (type) {
      case 'Column':
        return Column(
          mainAxisAlignment: _parseMainAxisAlignment(
            properties['mainAxisAlignment'],
          ),
          crossAxisAlignment: _parseCrossAxisAlignment(
            properties['crossAxisAlignment'],
          ),
          children: (properties['children'] as List? ?? [])
              .map((child) => buildComponent(child))
              .toList(),
        );

      case 'Text':
        return Text(
          properties['data'] ?? '',
          style: TextStyle(
            fontSize: properties['fontSize']?.toDouble() ?? 14.0,
            fontWeight: _parseFontWeight(properties['fontWeight']),
            color: _parseColor(properties['color']),
          ),
        );

      case 'Container':
        return Container(
          padding: _parseEdgeInsets(properties['padding']),
          decoration: _parseBoxDecoration(properties['decoration']),
          child: properties['child'] != null
              ? buildComponent(properties['child'])
              : null,
        );

      default:
        return Text('Unknown component: $type');
    }
  }

  MainAxisAlignment _parseMainAxisAlignment(String? value) {
    switch (value) {
      case 'center':
        return MainAxisAlignment.center;
      case 'start':
        return MainAxisAlignment.start;
      case 'end':
        return MainAxisAlignment.end;
      case 'spaceBetween':
        return MainAxisAlignment.spaceBetween;
      case 'spaceAround':
        return MainAxisAlignment.spaceAround;
      case 'spaceEvenly':
        return MainAxisAlignment.spaceEvenly;
      default:
        return MainAxisAlignment.start;
    }
  }

  CrossAxisAlignment _parseCrossAxisAlignment(String? value) {
    switch (value) {
      case 'center':
        return CrossAxisAlignment.center;
      case 'start':
        return CrossAxisAlignment.start;
      case 'end':
        return CrossAxisAlignment.end;
      case 'stretch':
        return CrossAxisAlignment.stretch;
      default:
        return CrossAxisAlignment.center;
    }
  }

  FontWeight _parseFontWeight(String? value) {
    switch (value) {
      case 'bold':
        return FontWeight.bold;
      case 'normal':
        return FontWeight.normal;
      case 'w100':
        return FontWeight.w100;
      case 'w200':
        return FontWeight.w200;
      case 'w300':
        return FontWeight.w300;
      case 'w400':
        return FontWeight.w400;
      case 'w500':
        return FontWeight.w500;
      case 'w600':
        return FontWeight.w600;
      case 'w700':
        return FontWeight.w700;
      case 'w800':
        return FontWeight.w800;
      case 'w900':
        return FontWeight.w900;
      default:
        return FontWeight.normal;
    }
  }

  Color _parseColor(String? value) {
    if (value == null) return Colors.black;
    return Color(int.parse(value.replaceFirst('#', '0xFF')));
  }

  EdgeInsets? _parseEdgeInsets(Map<String, dynamic>? padding) {
    if (padding == null) return null;
    final props = padding['properties'] ?? {};
    return EdgeInsets.only(
      left: props['left']?.toDouble() ?? 0,
      top: props['top']?.toDouble() ?? 0,
      right: props['right']?.toDouble() ?? 0,
      bottom: props['bottom']?.toDouble() ?? 0,
    );
  }

  BoxDecoration? _parseBoxDecoration(Map<String, dynamic>? decoration) {
    if (decoration == null) return null;
    final props = decoration['properties'] ?? {};
    return BoxDecoration(
      color: _parseColor(props['color']),
      borderRadius: props['borderRadius'] != null
          ? BorderRadius.circular(props['borderRadius'].toDouble())
          : null,
    );
  }
}
```

### 3. Resultado

O componente **home-screen** será renderizado como:

```dart
Column(
  mainAxisAlignment: MainAxisAlignment.center,
  crossAxisAlignment: CrossAxisAlignment.center,
  children: [
    Text(
      'Título',
      style: TextStyle(
        fontSize: 32,
        fontWeight: FontWeight.bold,
      ),
    ),
    Text(
      'Subtítulo',
      style: TextStyle(
        fontSize: 16,
        color: Color(0xFF757575),
      ),
    ),
  ],
)
```

### 4. Com WebSocket (Live Preview)

```dart
import 'package:web_socket_channel/web_socket_channel.dart';

class LivePreviewScreen extends StatefulWidget {
  @override
  _LivePreviewScreenState createState() => _LivePreviewScreenState();
}

class _LivePreviewScreenState extends State<LivePreviewScreen> {
  late WebSocketChannel channel;
  Map<String, dynamic>? componentData;

  @override
  void initState() {
    super.initState();
    connectWebSocket();
    loadComponent();
  }

  void connectWebSocket() {
    channel = WebSocketChannel.connect(
      Uri.parse('ws://SEU_IP:3000/ws/live-preview'),
    );

    channel.stream.listen((message) {
      final data = json.decode(message);
      if (data['type'] == 'component:updated') {
        loadComponent(); // Recarrega o componente
      }
    });
  }

  Future<void> loadComponent() async {
    final data = await fetchComponent('home-screen');
    setState(() {
      componentData = data['component'];
    });
  }

  @override
  void dispose() {
    channel.sink.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Live Preview')),
      body: componentData != null
          ? buildComponent(componentData!)
          : Center(child: CircularProgressIndicator()),
    );
  }

  // ... métodos buildComponent, parsers, etc
}
```

Agora quando você atualizar o componente via seed (`make seed-update`), o Flutter receberá a notificação e atualizará automaticamente!

## Docker

### Scripts disponíveis

```bash
# Subir containers
npm run docker:up
make up

# Parar containers
npm run docker:down
make down

# Acessar shell do container
npm run docker:exec
make exec

# Ver logs
make logs
```

### Docker Compose

```bash
# Subir todos os serviços
docker compose -f docker/docker-compose.yml up -d

# Parar todos os serviços
docker compose -f docker/docker-compose.yml down
```

## 🧪 Testes

**Em desenvolvimento**

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor em modo watch
npm run build            # Build do projeto
npm start                # Inicia servidor de produção

# Qualidade de código
npm run lint             # Verifica erros de lint
npm run lint:fix         # Corrige erros de lint
npm run format           # Formata código com Prettier
npm run format:check     # Verifica formatação

# Seeds
npm run seed:create      # Cria componentes
npm run seed:update      # Atualiza componentes
npm run seed:delete      # Deleta componentes

# Docker
npm run docker:up        # Sobe containers
npm run docker:down      # Para containers
npm run docker:exec      # Acessa shell do container
```

## 📂 Estrutura do Projeto

```
.
├── src/
│   ├── domain/              # Lógica de negócio
│   │   ├── components/      # Builders e tipos de componentes
│   │   └── interfaces/      # Interfaces e contratos
│   ├── infra/               # Infraestrutura
│   │   ├── database/        # Configuração do banco
│   │   └── repositories/    # Repositórios
│   ├── presentation/        # Camada de apresentação
│   │   ├── controllers/     # Controllers
│   │   └── routes/          # Rotas
│   ├── shared/              # Código compartilhado
│   │   └── helpers/         # Helpers e utilitários
│   └── server.ts            # Entrada da aplicação
├── seeds/                   # Seeds de componentes
├── prisma/                  # Schema e migrations
├── docker/                  # Configurações Docker
└── README.md
```

## Licença

ISC

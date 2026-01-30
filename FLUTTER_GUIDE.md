# 📱 Guia Flutter - Backend Driven UI

## 🚀 Como usar o custom-header no Flutter

### 1. Adicione as dependências no `pubspec.yaml`

```yaml
dependencies:
  flutter:
    sdk: flutter
  http: ^1.1.0
  web_socket_channel: ^2.4.0
```

### 2. Crie o componente no backend

```bash
# Inicie o servidor
npm run dev

# Crie os componentes
npm run seed:create
```

### 3. Código Flutter completo

```dart
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:web_socket_channel/web_socket_channel.dart';
import 'dart:convert';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Backend Driven UI',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: DynamicScreen(),
    );
  }
}

class DynamicScreen extends StatefulWidget {
  @override
  _DynamicScreenState createState() => _DynamicScreenState();
}

class _DynamicScreenState extends State<DynamicScreen> {
  Map<String, dynamic>? appBarData;
  bool isLoading = true;
  WebSocketChannel? channel;

  // ⚠️ ALTERE PARA SEU IP LOCAL
  static const String API_URL = 'http://192.168.1.100:3000';
  static const String WS_URL = 'ws://192.168.1.100:3000';

  @override
  void initState() {
    super.initState();
    loadComponent();
    connectWebSocket();
  }

  Future<void> loadComponent() async {
    try {
      final response = await http.get(
        Uri.parse('$API_URL/api/components/custom-header'),
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        setState(() {
          appBarData = data['component'];
          isLoading = false;
        });
      }
    } catch (e) {
      print('Error loading component: $e');
      setState(() => isLoading = false);
    }
  }

  void connectWebSocket() {
    try {
      channel = WebSocketChannel.connect(
        Uri.parse('$WS_URL/ws/live-preview'),
      );

      channel!.stream.listen((message) {
        print('📡 WebSocket message: $message');
        final data = json.decode(message);
        
        if (data['type'] == 'component:updated' && 
            data['name'] == 'custom-header') {
          print('🔄 Reloading custom-header...');
          loadComponent();
        }
      });
    } catch (e) {
      print('WebSocket error: $e');
    }
  }

  @override
  void dispose() {
    channel?.sink.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (isLoading) {
      return Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: appBarData != null ? buildAppBar(appBarData!) : null,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              '🎨 Backend Driven UI',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 16),
            Text(
              'Conectado ao WebSocket',
              style: TextStyle(color: Colors.green),
            ),
            SizedBox(height: 8),
            Text(
              'Atualize o componente com:',
              style: TextStyle(fontSize: 12, color: Colors.grey),
            ),
            Text(
              'npm run seed:update',
              style: TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.bold,
                fontFamily: 'monospace',
              ),
            ),
          ],
        ),
      ),
    );
  }

  PreferredSizeWidget buildAppBar(Map<String, dynamic> appBarData) {
    final properties = appBarData['properties'] ?? appBarData;
    
    return AppBar(
      backgroundColor: _parseColor(properties['backgroundColor']),
      foregroundColor: _parseColor(properties['foregroundColor']),
      elevation: properties['elevation']?.toDouble() ?? 4.0,
      centerTitle: properties['centerTitle'] ?? false,
      toolbarHeight: 56,
      title: properties['title'] != null
          ? buildText(properties['title'])
          : null,
      leading: properties['leading'] != null
          ? buildIconButton(properties['leading'])
          : null,
      actions: properties['actions'] != null
          ? (properties['actions'] as List)
              .map((action) => buildIconButton(action))
              .toList()
          : null,
    );
  }

  Widget buildText(Map<String, dynamic> textData) {
    final properties = textData['properties'] ?? textData;
    final style = properties['style'] ?? {};
    
    return Text(
      properties['data'] ?? '',
      style: TextStyle(
        fontSize: style['fontSize']?.toDouble() ?? 20.0,
        fontWeight: _parseFontWeight(style['fontWeight']),
        color: _parseColor(style['color']),
      ),
    );
  }

  Widget buildIconButton(Map<String, dynamic> iconButtonData) {
    final properties = iconButtonData['properties'] ?? iconButtonData;
    final iconData = properties['icon'];
    
    if (iconData == null) return SizedBox.shrink();
    
    return IconButton(
      icon: buildIcon(iconData),
      onPressed: () {
        print('Icon button pressed');
      },
    );
  }

  Widget buildIcon(Map<String, dynamic> iconData) {
    final properties = iconData['properties'] ?? iconData;
    final iconName = properties['icon'] ?? 'help';
    
    return Icon(
      _parseIcon(iconName),
      size: properties['size']?.toDouble() ?? 24.0,
      color: _parseColor(properties['color']),
    );
  }

  Color _parseColor(String? value) {
    if (value == null) return Colors.black;
    try {
      return Color(int.parse(value.replaceFirst('#', '0xFF')));
    } catch (e) {
      return Colors.black;
    }
  }

  FontWeight _parseFontWeight(String? value) {
    switch (value) {
      case 'bold':
        return FontWeight.bold;
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

  IconData _parseIcon(String iconName) {
    switch (iconName) {
      case 'menu':
        return Icons.menu;
      case 'search':
        return Icons.search;
      case 'settings':
        return Icons.settings;
      case 'person':
        return Icons.person;
      case 'home':
        return Icons.home;
      case 'favorite':
        return Icons.favorite;
      case 'shopping_cart':
        return Icons.shopping_cart;
      case 'notifications':
        return Icons.notifications;
      default:
        return Icons.help;
    }
  }
}
```

## 🔄 Testando Live Preview

### 1. Inicie o servidor backend
```bash
npm run dev
```

### 2. Execute o app Flutter
```bash
flutter run
```

### 3. Edite o componente
Edite `seeds/components/custom-header.ts`:

```typescript
export const customHeader: AppBarComponent = {
  type: 'appBar',
  backgroundColor: '#2196F3', // ← Mude para azul
  foregroundColor: '#FFFFFF',
  elevation: 4,
  centerTitle: true,
  title: {
    type: 'text',
    data: 'MOBi App', // ← Mude o título
    style: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
  },
  leading: {
    type: 'iconButton',
    icon: {
      type: 'icon',
      icon: 'menu',
      iconType: 'material',
      color: '#FFFFFF',
      size: 24,
    },
  },
};
```

### 4. Atualize via seed
```bash
npm run seed:update
```

### 5. Veja a mágica! ✨
O AppBar no Flutter será atualizado automaticamente!

## 📝 Estrutura do JSON retornado

```json
{
  "id": "uuid",
  "name": "custom-header",
  "component": {
    "type": "appBar",
    "backgroundColor": "#F3F3F3",
    "foregroundColor": "#000000",
    "elevation": 0,
    "centerTitle": true,
    "title": {
      "type": "text",
      "data": "MOBi",
      "style": {
        "fontSize": 24,
        "fontWeight": "bold",
        "color": "#000000"
      }
    },
    "leading": {
      "type": "iconButton",
      "icon": {
        "type": "icon",
        "icon": "menu",
        "iconType": "material",
        "color": "#000000",
        "size": 24
      }
    }
  }
}
```

## 🎯 Próximos passos

1. Adicione mais ícones no `_parseIcon()`
2. Implemente ações nos botões
3. Crie mais componentes (body, cards, etc)
4. Adicione navegação entre telas

## 🐛 Troubleshooting

### WebSocket não conecta
- Verifique se o IP está correto
- Certifique-se que está na mesma rede
- Verifique o firewall

### Componente não atualiza
- Verifique os logs do console Flutter
- Confirme que o nome do componente está correto
- Teste a API diretamente: `curl http://SEU_IP:3000/api/components/custom-header`

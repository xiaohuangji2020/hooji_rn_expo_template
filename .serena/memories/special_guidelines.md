# 特殊指南和设计模式

## Expo Router 文件路由

### 路由文件命名规则
- 所有路由文件必须使用小写
- 使用 `.tsx` 扩展名
- 特殊文件：
  - `_layout.tsx` - 布局文件
  - `index.tsx` - 默认路由
  - `+not-found.tsx` - 404 页面

### 路由组（Route Groups）
使用括号创建路由组，不影响 URL 结构：
```
app/
├── (tabs)/          # 路由组
│   ├── _layout.tsx
│   ├── home.tsx    # URL: /home
│   └── profile.tsx # URL: /profile
└── settings.tsx    # URL: /settings
```

### 导航方式

#### 使用 Link 组件
```typescript
import { Link } from 'expo-router';

<Link href="/camera/scan">扫描</Link>
```

#### 使用 router 对象
```typescript
import { router } from 'expo-router';

router.push('/camera/scan');
router.replace('/home');
router.back();
```

#### 类型安全的路由（Typed Routes）
项目启用了类型化路由，可以获得路由的类型检查：
```typescript
import { Href } from 'expo-router';

const href: Href = '/camera/scan'; // 类型安全
```

## React Navigation 集成

### Drawer 导航
项目使用 Drawer 导航作为主导航：

```typescript
// app/_layout.tsx
import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  return (
    <Drawer
      drawerContent={(props) => <DrawerMenu {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: '#fff' },
        headerTitleAlign: 'center',
      }}
    />
  );
}
```

### 自定义 Drawer 内容
使用 `DrawerMenu` 组件自定义抽屉内容：
```typescript
import { DrawerMenu } from '@/components/menu/DrawerMenu';
```

## 平台特定代码

### 平台特定文件
使用文件后缀创建平台特定实现：
```
components/map/
├── index.tsx          # 默认（iOS/Android）
└── index.web.tsx      # Web 平台
```

### 平台检查
```typescript
import { Platform } from 'react-native';

if (Platform.OS === 'ios') {
  // iOS 特定代码
} else if (Platform.OS === 'android') {
  // Android 特定代码
} else if (Platform.OS === 'web') {
  // Web 特定代码
}
```

### 平台选择
```typescript
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: Platform.select({
      ios: 20,
      android: 16,
      web: 24,
    }),
  },
});
```

## 样式设计模式

### StyleSheet.create
始终使用 `StyleSheet.create` 创建样式：
```typescript
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',    // 按字母顺序
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});
```

### 样式组合
```typescript
<View style={[styles.container, styles.centered]} />
```

### 条件样式
```typescript
<View style={[
  styles.container,
  isActive && styles.active,
  { opacity: disabled ? 0.5 : 1 }
]} />
```

## 组件设计模式

### 命名导出
```typescript
// ✅ 推荐
export function Button({ title, onPress }: ButtonProps) {
  return <Pressable onPress={onPress}>...</Pressable>;
}

// ❌ 避免
export default function Button() { ... }
```

### Props 类型定义
```typescript
interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export function Button({ title, onPress, disabled = false }: ButtonProps) {
  // ...
}
```

### 组件文件结构
```typescript
// 1. 导入
import { View, Text, StyleSheet } from 'react-native';

// 2. 类型定义
interface ComponentProps {
  // ...
}

// 3. 组件定义
export function Component({ prop1, prop2 }: ComponentProps) {
  // ...
}

// 4. 样式定义
const styles = StyleSheet.create({
  // ...
});
```

## 高德地图集成

### 配置
在 `app.json` 中配置 API 密钥：
```json
{
  "plugins": [
    [
      "expo-gaode-map-navigation",
      {
        "androidKey": "your-android-key",
        "iosKey": "your-ios-key"
      }
    ]
  ]
}
```

### 使用地图组件
```typescript
import { Map } from '@/components/map/Map';
import { MapSearch } from '@/components/map/MapSearch';
```

## 相机功能

### 权限配置
在 `app.json` 中配置权限：
```json
{
  "plugins": [
    [
      "expo-camera",
      {
        "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera",
        "microphonePermission": "Allow $(PRODUCT_NAME) to access your microphone"
      }
    ]
  ]
}
```

### 使用相机组件
```typescript
import { ScanCamera } from '@/components/camera/ScanCamera';
import { PhotoCamera } from '@/components/camera/PhotoCamera';
```

## 资源管理

### 图片导入
```typescript
// 本地图片
import logo from '@/assets/images/logo.png';
<Image source={logo} />

// 远程图片
<Image source={{ uri: 'https://example.com/image.png' }} />
```

### 使用 expo-image
```typescript
import { Image } from 'expo-image';

<Image
  source={require('@/assets/images/logo.png')}
  contentFit="cover"
  transition={1000}
/>
```

## 性能优化

### React Compiler
项目启用了实验性的 React Compiler，会自动优化组件：
- 自动 memoization
- 减少不必要的重渲染

### 使用 React.memo（如需要）
```typescript
export const Component = React.memo(function Component({ prop }: Props) {
  // ...
});
```

### 使用 useCallback 和 useMemo
```typescript
const handlePress = useCallback(() => {
  // ...
}, [dependencies]);

const computedValue = useMemo(() => {
  // ...
}, [dependencies]);
```

## 错误处理

### 错误边界
考虑添加错误边界来捕获组件错误：
```typescript
import { ErrorBoundary } from 'expo-router';

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <View>
      <Text>出错了：{error.message}</Text>
    </View>
  );
}
```

## 开发环境优化

### Android 镜像配置
项目使用自定义插件自动配置阿里云镜像：
```javascript
// scripts/with-android-mirrors.js
// 自动注入到 android/build.gradle
```

这加速了中国地区的依赖下载。

### 开发服务器
```bash
# 启动开发服务器
npm start

# 清除缓存启动
npx expo start --clear
```

## 注意事项

### New Architecture
项目启用了 React Native 新架构，某些旧的 API 可能不兼容：
- 避免使用已弃用的 API
- 优先使用新的 Fabric 组件
- 注意第三方库的兼容性

### React 19
项目使用 React 19，注意：
- 某些 API 可能有变化
- 确保第三方库兼容 React 19

### TypeScript Strict Mode
项目启用了严格模式，需要：
- 明确的类型定义
- 避免使用 `any`
- 处理可能的 `null` 和 `undefined`

# 代码风格和约定

## 文件命名规则

### 1. 小写（kebab-case/camelCase）
用于功能性文件：
- `api.ts`
- `utils.ts`
- `useAuth.ts`
- `with-android-mirrors.js`

### 2. PascalCase
用于 React 组件：
- `MyButton.tsx`
- `HomeView.tsx`
- `DrawerMenu.tsx`
- `ImageViewer.tsx`

### 3. 路由文件
必须使用小写：
- `app/index.tsx`
- `app/camera/scan.tsx`
- `app/map/search.tsx`

### 4. Index 文件
使用 `index.tsx` 作为重新导出中心

## 组件导出规则

**✅ 使用命名导出（推荐）：**
```typescript
export function Home() {
  return <View>...</View>;
}
```

**❌ 避免默认导出：**
```typescript
// 不推荐
export default function Home() {
  return <View>...</View>;
}
```

## TypeScript 配置

### Strict Mode
项目启用了 TypeScript 严格模式：
```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

### 路径别名
使用 `@/*` 作为根目录别名：
```typescript
import { Component } from "@/components/Component";
```

## ESLint 规则

### React Native 样式规则

1. **禁止未使用的样式**（error）
```typescript
// ❌ 错误：定义了但未使用的样式
const styles = StyleSheet.create({
  container: { flex: 1 },
  unused: { color: 'red' }, // 未使用
});
```

2. **StyleSheet 属性排序**（warn，字母顺序）
```typescript
// ✅ 正确：按字母顺序排列
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});
```

3. **内联样式和颜色字面量**（off）
- 允许使用内联样式
- 允许使用颜色字面量

### 样式格式规则

1. **键值对间距**
```typescript
// ✅ 正确
const obj = { key: value };

// ❌ 错误
const obj = {key:value};
```

2. **对象花括号间距**
```typescript
// ✅ 正确
const obj = { key: value };

// ❌ 错误
const obj = {key: value};
```

3. **逗号间距**
```typescript
// ✅ 正确
const arr = [1, 2, 3];

// ❌ 错误
const arr = [1,2,3];
```

## Prettier 配置

- **printWidth**: 160（每行最大字符数）
- 其他使用 Prettier 默认配置

## 组件组织规则

### 公共组件
放在 `components/` 目录，跨应用共享：
```
components/
├── buttons/
├── images/
├── camera/
├── map/
└── menu/
```

### 页面组件
放在 `app/` 目录，特定于屏幕：
```
app/
├── index.tsx
├── camera/
└── map/
```

### 命名规则
- 任何导出 JSX 的文件都应使用 PascalCase 命名
- 组件文件名应与组件名称匹配

## 代码质量工具

### 自动修复
大部分 ESLint 问题可以通过以下命令自动修复：
```bash
npm run lint:fix
```

### 格式化
使用 Prettier 格式化代码：
```bash
npx prettier --write .
```

## 特殊约定

### 平台特定文件
使用平台后缀创建平台特定实现：
```
components/map/
├── index.tsx          # 默认实现
└── index.web.tsx      # Web 平台特定实现
```

### 路由组
使用括号创建路由组（不影响 URL）：
```
app/
├── (scan)/           # 路由组
│   └── scan.tsx     # URL: /scan
└── camera/          # 普通目录
    └── photo.tsx    # URL: /camera/photo
```

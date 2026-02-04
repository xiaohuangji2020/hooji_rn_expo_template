# React Native 代码规范 - Lint 配置说明

本项目使用 ESLint 来保持代码风格一致。

## 🛠️ 已安装的工具

```json
{
  "devDependencies": {
    "eslint-plugin-react-native": "^5.0.0",
    "@stylistic/eslint-plugin": "^5.7.1"
  }
}
```

## 📋 启用的规则

### React Native 规则

- ✅ `react-native/no-unused-styles` (error) - 禁止未使用的样式定义
- ✅ `react-native/sort-styles` (warn) - StyleSheet 属性按字母排序

### 格式化规则

- ✅ `@stylistic/key-spacing` - 对象键值间距
- ✅ `@stylistic/object-curly-spacing` - 花括号间距
- ✅ `@stylistic/comma-spacing` - 逗号间距

## 📝 使用方法

### 检查代码

```bash
npm run lint
```

### 自动修复

大部分排序和格式问题可以自动修复：

```bash
npm run lint:fix
```

## 🎨 样式属性排序

StyleSheet 中的属性会按**字母顺序**自动排序：

```typescript
// ❌ 排序混乱
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
});

// ✅ 自动排序后（字母顺序）
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 20,
  },
});
```

## 💡 VS Code 集成（推荐）

### 1. 安装扩展

- **ESLint** (dbaeumer.vscode-eslint)

### 2. 配置自动修复

项目已配置 `.vscode/settings.json`，保存文件时会自动运行 `lint --fix`。

## 🔧 配置调整

如需调整规则，编辑 `eslint.config.js`：

```javascript
// 关闭样式排序
"react-native/sort-styles": "off",

// 改为错误级别
"react-native/sort-styles": ["error", "asc"],

// 启用内联样式检查
"react-native/no-inline-styles": "warn",

// 启用颜色字面量检查
"react-native/no-color-literals": "warn",
```

## ❓ 常见问题

### Q: 如何禁用某个文件的排序？

**A**: 在文件顶部添加：

```typescript
/* eslint-disable react-native/sort-styles */
```

### Q: 自动修复会破坏我的代码吗？

**A**: 不会。只会调整属性顺序，不会改变代码逻辑。建议：
1. 提交当前代码到 Git
2. 运行 `npm run lint:fix`
3. 检查 diff，确认无误后提交

### Q: 可以按照属性类型分组吗（定位、布局、文字等）？

**A**: `react-native/sort-styles` 只支持字母排序，不支持语义分组。如需按类型分组，需要手动组织代码。

---

## 📚 相关资源

- [eslint-plugin-react-native 文档](https://github.com/intellicode/eslint-plugin-react-native)
- [React Native StyleSheet API](https://reactnative.dev/docs/stylesheet)
- [ESLint 配置指南](https://eslint.org/docs/latest/use/configure/)

---

_配置文件: `eslint.config.js`_

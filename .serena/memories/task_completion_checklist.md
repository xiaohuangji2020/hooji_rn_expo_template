# 任务完成后的检查清单

当完成一个开发任务后，应该执行以下步骤以确保代码质量：

## 1. 代码检查（Linting）

### 运行 ESLint 检查
```bash
npm run lint
```

**检查内容：**
- StyleSheet 属性是否按字母顺序排列
- 是否有未使用的样式定义
- 代码格式是否符合规范
- 是否遵循 React Native 最佳实践

### 自动修复问题
```bash
npm run lint:fix
```

**可自动修复的问题：**
- StyleSheet 属性排序
- 对象花括号间距
- 键值对间距
- 逗号间距
- 其他格式问题

## 2. 代码格式化

### 使用 Prettier 格式化
```bash
npx prettier --write .
```

**格式化规则：**
- 每行最大 160 字符
- 统一的缩进和空格
- 统一的引号风格

## 3. TypeScript 类型检查

### 运行类型检查
```bash
npx tsc --noEmit
```

**检查内容：**
- 类型错误
- 类型不匹配
- 缺失的类型定义

## 4. 测试（如果有）

目前项目没有配置测试框架，但如果将来添加了测试，应该运行：
```bash
npm test
```

## 5. 构建验证

### 验证 TypeScript 编译
```bash
npx tsc --noEmit
```

### 验证原生构建（可选）
如果修改了原生配置或添加了新插件：
```bash
npx expo prebuild --clean
```

## 6. Git 提交前检查

### 查看修改的文件
```bash
git status
```

### 查看具体修改内容
```bash
git diff
```

### 确保没有意外的修改
- 检查是否有不应该提交的文件
- 确认所有修改都是有意为之
- 检查是否有调试代码需要删除

## 7. 提交规范

### 提交信息格式
使用清晰、描述性的提交信息：
```bash
git commit -m "feat: 添加地图搜索功能"
git commit -m "fix: 修复相机权限问题"
git commit -m "refactor: 重构按钮组件"
git commit -m "style: 格式化代码"
git commit -m "docs: 更新 README"
```

## 快速检查命令

### 一键运行所有检查
```bash
npm run lint:fix && npx prettier --write . && npx tsc --noEmit
```

这个命令会：
1. 自动修复 lint 问题
2. 格式化代码
3. 运行 TypeScript 类型检查

## 常见问题处理

### 如果 lint 失败
1. 先运行 `npm run lint:fix` 自动修复
2. 手动修复剩余的问题
3. 再次运行 `npm run lint` 确认

### 如果类型检查失败
1. 检查错误信息
2. 修复类型问题
3. 确保所有导入都有正确的类型定义

### 如果格式化后代码变化很大
1. 检查 `.prettierrc` 配置是否正确
2. 确认 printWidth 设置为 160
3. 提交前再次检查修改内容

## 注意事项

### 不要提交的文件
- `android/` 和 `ios/` 目录（应该在 .gitignore 中）
- `node_modules/`
- `.expo/`
- `.DS_Store`
- 临时文件和日志文件

### 原生代码修改
如果修改了以下内容，需要重新运行 `npx expo prebuild`：
- `app.json` 中的 plugins 配置
- 添加了新的原生依赖
- 修改了原生权限配置

### 依赖更新
如果更新了依赖，确保：
1. 运行 `npm install`
2. 测试应用是否正常运行
3. 如果是原生依赖，运行 `npx expo prebuild --clean`

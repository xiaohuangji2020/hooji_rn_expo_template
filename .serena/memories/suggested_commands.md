# 常用命令

## 开发命令

### 启动开发服务器
```bash
npm start
# 或
npx expo start
```

### 在不同平台运行

#### Android
```bash
npm run android
# 或
npx expo run:android
```
**要求：**
- Android Studio
- Android SDK Platform 34+
- Android 模拟器或真机

#### iOS（仅 Mac）
```bash
npm run ios
# 或
npx expo run:ios
```
**要求：**
- Xcode
- CocoaPods
- iOS 模拟器或真机

#### Web
```bash
npm run web
# 或
npx expo start --web
```

## 代码质量命令

### Linting（代码检查）
```bash
# 检查代码规范
npm run lint

# 自动修复可修复的问题
npm run lint:fix
```

**Lint 检查内容：**
- StyleSheet 属性排序（字母顺序）
- 未使用的样式定义
- 代码格式问题（配合 Prettier）
- React Native 最佳实践

### 格式化代码
```bash
# 使用 Prettier 格式化所有文件
npx prettier --write .

# 格式化特定文件
npx prettier --write "app/**/*.tsx"
```

## 原生目录管理

### 生成/重新生成原生目录
```bash
# 生成 android/ 和 ios/ 目录
npx expo prebuild

# 清理并重新生成
npm run clean
# 或
npx expo prebuild --clean
```

**何时需要运行 prebuild：**
- 添加新的原生插件后
- 修改 `app.json` 中的 plugins 配置后
- 首次克隆项目后
- 原生代码出现问题需要重置时

### 重置项目
```bash
npm run reset-project
```

## 生产构建（本地）

### Android APK
```bash
eas build --platform android --local --profile production
```

### iOS IPA
```bash
eas build --platform ios --local --profile production
```

**要求：**
- 安装 EAS CLI：`npm install -g eas-cli`
- 配置 EAS 账户

## Android 模拟器管理

### 列出可用模拟器
```bash
emulator -list-avds
```

### 启动模拟器
```bash
emulator -avd <emulator_name>
```

**示例：**
```bash
emulator -avd Pixel_5_API_34
```

## Git 工作流

### 常用 Git 命令
```bash
# 查看状态
git status

# 添加文件
git add <file>

# 提交
git commit -m "message"

# 推送
git push

# 拉取
git pull

# 查看分支
git branch

# 切换分支
git checkout <branch>

# 创建并切换分支
git checkout -b <new-branch>
```

### 查看日志
```bash
# 查看提交历史
git log

# 查看简洁日志
git log --oneline

# 查看最近 5 条提交
git log -5
```

## 依赖管理

### 安装依赖
```bash
npm install
```

### 添加新依赖
```bash
# 生产依赖
npm install <package-name>

# 开发依赖
npm install --save-dev <package-name>
```

### 更新依赖
```bash
# 更新所有依赖
npm update

# 更新特定依赖
npm update <package-name>
```

## 清理命令

### 清理缓存
```bash
# 清理 Expo 缓存
npx expo start --clear

# 清理 npm 缓存
npm cache clean --force

# 清理 node_modules 并重新安装
rm -rf node_modules
npm install
```

### 清理原生构建
```bash
# Android
cd android && ./gradlew clean && cd ..

# iOS（Mac only）
cd ios && xcodebuild clean && cd ..
```

## 调试命令

### 查看日志
```bash
# Android 日志
adb logcat

# iOS 日志（Mac only）
xcrun simctl spawn booted log stream --predicate 'processImagePath endswith "hooji_rn_expo_template"'
```

### 设备管理
```bash
# 列出连接的 Android 设备
adb devices

# 列出 iOS 模拟器（Mac only）
xcrun simctl list devices
```

## macOS 特定命令

由于项目在 Darwin（macOS）系统上开发，以下是一些常用的 macOS 命令：

### 文件操作
```bash
# 列出文件
ls -la

# 查找文件
find . -name "*.tsx"

# 搜索文件内容
grep -r "search_term" .

# 查看文件内容
cat file.txt
head -n 20 file.txt
tail -n 20 file.txt
```

### 目录操作
```bash
# 切换目录
cd /path/to/directory

# 创建目录
mkdir directory_name

# 删除目录
rm -rf directory_name
```

### 进程管理
```bash
# 查看进程
ps aux | grep node

# 杀死进程
kill -9 <pid>

# 查看端口占用
lsof -i :8081
```

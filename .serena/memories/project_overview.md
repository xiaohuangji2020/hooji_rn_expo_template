# 项目概述

## 项目名称
hooji_rn_expo_template

## 项目目的
这是一个 Expo React Native 项目模板，使用文件路由（expo-router）和 TypeScript。项目针对中国开发环境进行了优化（使用阿里云镜像），并集成了高德地图和相机功能。

## 核心技术栈

### 主要框架
- **Expo SDK**: ~54.0.32
- **React Native**: 0.81.5
- **React**: 19.1.0
- **TypeScript**: ~5.9.2（strict mode 启用）

### 路由和导航
- **Expo Router**: ~6.0.22（文件路由系统）
- **React Navigation**: 
  - @react-navigation/drawer: ^7.7.13（抽屉导航）
  - @react-navigation/bottom-tabs: ^7.4.0
  - @react-navigation/native: ^7.1.8

### 特色功能
- **高德地图**: expo-gaode-map-navigation (^2.0.0) 和 expo-gaode-map-search (^1.3.8)
- **相机**: expo-camera (~17.0.10)
- **图片选择**: expo-image-picker (~17.0.10)
- **图片显示**: expo-image (~3.0.11)

### 动画和手势
- **react-native-reanimated**: ~4.1.1
- **react-native-gesture-handler**: ~2.28.0
- **react-native-worklets**: 0.5.1

### 开发工具
- **ESLint**: ^9.25.0（配合 expo、prettier、react-native 插件）
- **Prettier**: ^3.8.1（printWidth: 160）
- **@stylistic/eslint-plugin**: ^5.7.1（样式格式化）

## 特殊配置

### New Architecture
项目启用了 React Native 的新架构：
```json
"newArchEnabled": true
```

### React Compiler（实验性）
启用了实验性的 React Compiler：
```json
"experiments": {
  "reactCompiler": true
}
```

### Typed Routes
启用了 Expo Router 的类型化路由：
```json
"experiments": {
  "typedRoutes": true
}
```

### 中国开发优化
- 使用自定义 Expo 配置插件（`scripts/with-android-mirrors.js`）
- 自动注入阿里云 Maven 镜像到 `android/build.gradle`
- 加速中国地区的依赖下载

## 平台支持
- ✅ Android（需要 Android Studio 和 SDK Platform 34+）
- ✅ iOS（需要 Xcode 和 CocoaPods，仅 Mac）
- ✅ Web

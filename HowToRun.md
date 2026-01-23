
---

## 第一阶段：环境准备（全套底层环境）

虽然是expo项目，但是因为要使用本地打包。所以其实和cli安装的差不多。一样需要使用本地打包，所以本地环境一个也跑不了
**不要看中文版的react native的expo安装方法，那个太古老了。看英文原版的**

### 1. 基础工具

* **Node.js (LTS版本):** 建议 v20 或 v22。
* **Git:** 用于版本管理。
* **Watchman (仅限 Mac):** 用于监视文件变化，提升编译速度。

### 2. Android 开发环境

* **JDK 17:** React Native 0.73+ 的标准要求（2026 年主流）。
* **Android Studio:** * 安装后进入 **SDK Manager**，下载 `Android SDK Platform 34` (或更高) 以及 `Android SDK Build-Tools`。
* 配置环境变量：将 `ANDROID_HOME` 指向 SDK 路径。



### 3. iOS 开发环境 (必须在 Mac 上)

* **Xcode:** 从 App Store 下载最新版。
* **Command Line Tools:** 运行 `xcode-select --install`。
* **CocoaPods:** iOS 的包管理器。

### 4. Expo 命令行工具

```bash
# 安装 EAS CLI (用于触发本地构建)
npm install -g eas-cli

```

---

## 第二阶段：初始化项目与国内环境优化

由于你们没有公司级的海外加速环境，**“换源”**是关键。

### 1. 创建项目(创建可以跳过啦)

开启你的个人代理，执行：

```bash
npx create-expo-app@latest my-project
cd my-project

```

### 2. 配置国内镜像源 (解决打包慢)（有好的梯子也可以不改）

这是最重要的一步，防止 Gradle 在打包时卡死。

* **npm 换源：** `npm config set registry https://registry.npmmirror.com`
* **查看npm 源：** `npm config get registry >> https://registry.npmjs.org/`（这个是原本的）
* **Android 换源：** 在项目根目录创建或修改 `env` 或脚本，但最直接的方法是在生成的 `android/build.gradle` 中添加阿里云镜像（见下文第三阶段）。

---

## 第三阶段：Expo 本地工作流（核心步骤）

为了不依赖云打包，你们需要使用 **Dev Client** 模式。

### 1. 生成原生目录 (Prebuild)

在项目根目录运行：

```bash
npx expo prebuild

```

> **注意：** 这一步会根据 `app.json` 生成 `android` 和 `ios` 文件夹。如果你加入了新的原生插件，就需要重新运行它。

### 2. 修改 Android 镜像（在 prebuild 之后）
##### 2.1 手动方法
打开 `android/build.gradle`，在 `allprojects > repositories` 中加入：

```gradle
maven { url 'https://maven.aliyun.com/repository/google' }
maven { url 'https://maven.aliyun.com/repository/jcenter' }
maven { url 'https://maven.aliyun.com/repository/public' }

```
##### 2.2 自动方法
使用 `./scripts/withAndroidMirrors.js`，会自动在上面的文件添加内容，调用方在下面(plugins中的)（已配置好）
```json
{
  "expo": {
    "name": "feng_admin_app",
    "slug": "feng_admin_app",
    "version": "1.0.0",
    "plugins": [
      "./scripts/withAndroidMirrors.js"
    ]
  }
}
```

---

## 第四阶段：本地打包与运行

### 1. 开发阶段（类似 Expo Go 的体验）

运行以下命令，这会在你本地编译并在手机/模拟器上安装一个“开发版 App”：

```bash
# 本地编译并运行到 Android 手机
npx expo run:android

# 本地编译并运行到 iOS 模拟器/手机
npx expo run:ios

```

只要不增加新的原生插件，你们平时改 JS 代码只需保持这个进程开启，就能享受 **秒级热更新**。

### 2. 生产环境打包 (打出 APK/IPA)

使用 EAS 的本地构建参数 `--local`：

* **首次配置 EAS：** `eas build:configure`（选全是）。
* **本地打 Android APK (Release)：**
```bash
eas build --platform android --local --profile production

```


* **本地打 iOS IPA (Release)：**
```bash
eas build --platform ios --local --profile production

```



> **提示：** `--local` 参数会强制命令在你的电脑上调用 Android Studio 或 Xcode 的编译器，**不上传代码到 Expo 云端**。

---

## 团队协作建议

1. **Git 忽略原生目录：** 建议将 `android/` 和 `ios/` 放入 `.gitignore`。
* **理由：** 通过 `app.json` 保持配置一致，每个人在自己本地运行 `npx expo prebuild` 生成自己的原生目录。这样可以避免 Git 冲突，特别是 Podfile.lock 的冲突。


2. **插件管理：** 如果需要集成“微信登录”，只需在 `app.json` 的 `plugins` 字段添加对应插件。
3. **证书管理：** 生产环境打包需要的 `.jks` (Android) 或 `P12` (iOS) 文件，建议保存在公司内部的安全位置。

---

## 软件安装清单速查表

| 软件 | 作用 | 备注 |
| --- | --- | --- |
| **Node.js 20+** | 运行环境 | 必备 |
| **JDK 17** | Android 编译 | 必须配置环境变量 |
| **Android Studio** | Android SDK 管理 | 必须安装 Command-line Tools |
| **Xcode** | iOS 编译 | 仅 Mac |
| **CocoaPods** | iOS 依赖管理 | `sudo gem install cocoapods` |
| **EAS CLI** | 触发本地打包 | `npm install -g eas-cli` |

**下一步建议：**
由于国内集成**微信、支付宝**等 SDK 在 Expo 中需要特定的 `Config Plugins`。**你需要我为你提供一份常用国内 SDK 在 Expo 中的集成模版代码吗？**

温馨提示：如要解锁所有应用的完整功能，请开启 [Gemini 应用活动记录](https://myactivity.google.com/product/gemini)。



## 其他
### 💡 进阶技巧：不用打开 Android Studio 也能开模拟器
每次为了开模拟器都要启动沉重的 Android Studio 很痛苦。你可以通过 命令行 直接唤醒它：

先看你的模拟器叫什么名字： 打开终端（Terminal），输入：

```Bash
emulator -list-avds
```
（你会看到类似 Medium_Phone_API_36.1 这样的名字）

直接启动它： 输入：
```Bash
emulator -avd Medium_Phone_API_36.1
```

# 项目结构

## 顶层目录结构

```
hooji_rn_expo_template/
├── app/                    # 文件路由目录（Expo Router）
├── components/             # 可复用组件
├── constants/              # 常量和共享值
├── assets/                 # 静态资源（图片、字体）
├── scripts/                # 构建脚本
├── docs/                   # 文档
├── android/                # Android 原生代码（通过 prebuild 生成）
├── ios/                    # iOS 原生代码（通过 prebuild 生成）
├── node_modules/           # 依赖包
├── .expo/                  # Expo 缓存
├── .serena/                # Serena 配置
├── .vscode/                # VS Code 配置
└── .git/                   # Git 仓库
```

## app/ 目录（路由）

文件路由结构：
```
app/
├── _layout.tsx             # 根布局（Drawer 导航）
├── index.tsx               # 首页
├── +not-found.tsx          # 404 页面
├── camera/                 # 相机功能路由组
│   ├── photo.tsx          # 拍照页面
│   └── scan.tsx           # 扫描页面
└── map/                    # 地图功能路由组
    └── search.tsx         # 地图搜索页面
```

**路由规则：**
- 使用括号 `(groupName)` 创建路由组（不影响 URL 结构）
- `_layout.tsx` 定义布局
- `index.tsx` 是默认路由
- `+not-found.tsx` 是 404 页面

## components/ 目录

组件按功能分类：
```
components/
├── buttons/                # 按钮组件
│   └── Button.tsx
├── images/                 # 图片组件
│   └── ImageViewer.tsx
├── camera/                 # 相机相关组件
│   ├── index.tsx
│   ├── ScanCamera.tsx
│   └── PhotoCamera.tsx
├── map/                    # 地图相关组件
│   ├── index.tsx
│   ├── index.web.tsx      # Web 平台特定实现
│   ├── Map.tsx
│   ├── MapSearch.tsx
│   └── NavMap.tsx
└── menu/                   # 菜单组件
    ├── index.tsx
    ├── DrawerMenu.tsx     # 抽屉菜单
    └── Menu.tsx
```

## constants/ 目录

存放常量和配置：
```
constants/
├── css/                    # 样式常量
│   └── Typography.ts      # 排版常量
└── menu/                   # 菜单配置
```

## scripts/ 目录

构建和工具脚本：
```
scripts/
├── with-android-mirrors.js  # Android 镜像配置插件
└── reset-project.js         # 项目重置脚本
```

## 路径别名

项目配置了路径别名 `@/*` 指向根目录：

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

**使用示例：**
```typescript
import { DrawerMenu } from "@/components/menu/DrawerMenu";
import { Typography } from "@/constants/css/Typography";
import { Button } from "@/components/buttons/Button";
```

## 原生目录（android/ 和 ios/）

**重要说明：**
- 这些目录通过 `npx expo prebuild` 生成
- 应该在 `.gitignore` 中忽略
- 每个开发者本地生成，避免合并冲突
- 添加新的原生插件或修改 `app.json` 后需要重新运行 `prebuild`

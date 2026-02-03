# Markdown Monaco Editor

一个专注于代码展示体验的 Markdown 查看器，集成 Monaco Editor（VS Code 编辑器引擎）提供专业级代码高亮。

## 项目定位

这不是一个通用的 Markdown 编辑器，而是一个 **专注于代码展示体验** 的工具。通过集成 Monaco Editor，它提供了远超普通 Markdown 渲染器的代码阅读体验，同时保持轻量级和易用性。

## 核心特色

- 📁 **文件上传** - 支持上传 `.md`、`.markdown`、`.mdx`、`.txt` 格式文件
- 🎨 **IDE 级代码高亮** - 使用 Monaco Editor 渲染代码块，提供行号、代码折叠等功能
- 🌙 **主题切换** - 深色/浅色主题实时切换，Monaco Editor 主题联动
- 🖱️ **全屏拖拽** - 支持从任意位置拖拽文件到应用
- ⚡ **高性能渲染** - React 19 编译器优化 + 智能组件缓存
- 🔤 **20+ 语言支持** - TypeScript、Python、Go、Java、C++、SQL 等

## 技术栈

- **React 19** - 现代化的 UI 框架
- **TypeScript** - 类型安全的开发体验
- **Vite** - 快速的构建工具
- **Monaco Editor** - 专业级代码编辑器
- **Streamdown** - Markdown 渲染引擎
- **Tailwind CSS** - 实用优先的 CSS 框架

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 预览构建结果

```bash
pnpm preview
```

## 使用方式

1. 打开应用后，可以看到默认的 Markdown 示例
2. 点击"上传 Markdown 文件"按钮选择文件，或直接拖拽文件到页面
3. 代码块会自动使用 Monaco Editor 渲染，提供语法高亮
4. 点击右上角按钮切换浅色/深色主题

## 项目结构

```
src/
├── components/
│   └── markdown/
│       ├── CodeBlockRenderer.tsx    # 代码块渲染器
│       ├── FileUploader.tsx          # 文件上传组件
│       └── MarkdownViewer.tsx        # Markdown 查看器
├── contexts/
│   ├── MonacoContext.tsx             # Monaco 编辑器上下文
│   └── ThemeContext.tsx              # 主题上下文
├── hooks/
│   └── useSystemTheme.ts             # 系统主题检测
├── types/
│   └── markdown.ts                   # TypeScript 类型定义
├── utils/
│   └── languageDetection.ts          # 语言检测工具
├── App.tsx                           # 主应用组件
└── main.tsx                          # 应用入口
```

## 代码块支持的语言

- TypeScript / JavaScript
- Python
- Go
- CSS / SCSS
- JSON
- HTML
- SQL
- 以及 Monaco Editor 支持的其他语言

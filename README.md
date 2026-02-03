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

## 与其他项目的区别

### vs. 普通 Markdown 渲染器（marked、markdown-it）

| 特性 | 本项目 | 普通渲染器 |
|------|--------|----------|
| 代码块渲染 | Monaco Editor（IDE 级） | HTML `<pre><code>` |
| 语法高亮 | 完整的 IDE 级别 | 基础的 Prism/Highlight.js |
| 交互性 | 代码块可交互（行号、折叠） | 只读展示 |
| 文件大小 | 较大（Monaco 库） | 很小 |
| 使用场景 | 代码文档、技术博客 | 简单内容展示 |

### vs. 在线 Markdown 编辑器（Notion、Obsidian）

| 特性 | 本项目 | 在线编辑器 |
|------|--------|----------|
| 定位 | 查看器 | 编辑器 |
| 功能 | 专注代码高亮 | 全功能编辑 |
| 部署 | 轻量级 Web 应用 | 复杂的云服务 |
| 学习成本 | 低 | 高 |
| 定制性 | 高（开源） | 低（闭源） |

### vs. 代码高亮库（Highlight.js、Prism）

| 特性 | 本项目 | 高亮库 |
|------|--------|--------|
| 功能 | 完整的 Markdown 查看器 | 仅代码高亮 |
| 代码块体验 | IDE 级别（行号、折叠等） | 基础高亮 |
| 交互性 | 丰富 | 无 |
| 集成难度 | 开箱即用 | 需要自己集成 |

## 技术亮点

### 1. 自定义代码块渲染器
通过 Streamdown 的 `components` 配置，完全控制代码块渲染方式，而不被 Markdown 库限制：

```typescript
<Streamdown
  components={{
    code: CodeBlockRenderer,  // 自定义渲染逻辑
  }}
>
  {content}
</Streamdown>
```

### 2. 行内代码 vs 代码块智能区分
通过 AST 节点位置判断，行内代码用轻量级渲染，代码块用 Monaco Editor，性能最优：

```typescript
const isInline = node?.position?.start.line === node?.position?.end.line;
```

### 3. 主题系统设计
使用 CSS 变量 + React Context，实现全局主题切换和 Monaco Editor 主题联动，易于扩展新主题。

### 4. 全屏拖拽交互
全局事件监听支持从任意位置拖拽文件到应用，提供流畅的用户体验。

## 技术栈

- **React 19** - 现代化的 UI 框架，集成编译器优化
- **TypeScript** - 类型安全的开发体验
- **Vite** - 快速的构建工具
- **Monaco Editor** - 专业级代码编辑器（VS Code 引擎）
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

## 适用场景

✅ **适合用这个项目的场景：**
- 技术文档展示平台
- 代码片段分享工具
- 学习资源库
- 博客系统（重点展示代码）
- API 文档查看器
- 代码教程平台

❌ **不适合的场景：**
- 需要编辑功能的应用
- 简单的内容展示
- 对包体积要求极高的项目

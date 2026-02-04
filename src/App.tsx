import { useState, useEffect, useCallback } from 'react';
import { MarkdownViewer } from './components/markdown/MarkdownViewer';
import { FileUploader } from './components/markdown/FileUploader';
import { TextPasteInput } from './components/markdown/TextPasteInput';
import { InputModeSwitcher } from './components/markdown/InputModeSwitcher';
import { ThemeContext } from './contexts/ThemeContext';
import './App.css';

// 默认示例 Markdown 内容
const DEFAULT_MARKDOWN = `# Markdown Monaco Editor

一个专注于代码展示体验的 Markdown 查看器，集成 Monaco Editor（VS Code 编辑器引擎）提供专业级代码高亮。

## 项目定位

这不是一个通用的 Markdown 编辑器，而是一个 **专注于代码展示体验** 的工具。通过集成 Monaco Editor，它提供了远超普通 Markdown 渲染器的代码阅读体验，同时保持轻量级和易用性。

## 核心特色

- 📁 **文件上传** - 支持上传 \`.md\`、\`.markdown\`、\`.mdx\`、\`.txt\` 格式文件
- 🎨 **IDE 级代码高亮** - 使用 Monaco Editor 渲染代码块，提供行号、代码折叠等功能
- 🌙 **主题切换** - 深色/浅色主题实时切换，Monaco Editor 主题联动
- 🖱️ **全屏拖拽** - 支持从任意位置拖拽文件到应用
- ⚡ **高性能渲染** - React 19 编译器优化 + 智能组件缓存
- 🔤 **20+ 语言支持** - TypeScript、Python、Go、Java、C++、SQL 等

## 与其他项目的区别

### vs. 普通 Markdown 渲染器（marked、markdown-it）

| 特性 | 本项目 | 普通渲染器 |
|------|--------|----------|
| 代码块渲染 | Monaco Editor（IDE 级） | HTML \`<pre><code>\` |
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
通过 Streamdown 的 \`components\` 配置，完全控制代码块渲染方式，而不被 Markdown 库限制：

\`\`\`typescript
<Streamdown
  components={{
    code: CodeBlockRenderer,  // 自定义渲染逻辑
  }}
>
  {content}
</Streamdown>
\`\`\`

### 2. 行内代码 vs 代码块智能区分
通过 AST 节点位置判断，行内代码用轻量级渲染，代码块用 Monaco Editor，性能最优：

\`\`\`typescript
const isInline = node?.position?.start.line === node?.position?.end.line;
\`\`\`

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

\`\`\`bash
pnpm install
\`\`\`

### 开发模式

\`\`\`bash
pnpm dev
\`\`\`

### 构建生产版本

\`\`\`bash
pnpm build
\`\`\`

### 预览构建结果

\`\`\`bash
pnpm preview
\`\`\`

## 使用方式

1. 打开应用后，可以看到默认的 Markdown 示例
2. 点击"上传 Markdown 文件"按钮选择文件，或直接拖拽文件到页面
3. 代码块会自动使用 Monaco Editor 渲染，提供语法高亮
4. 点击右上角按钮切换浅色/深色主题

## 项目结构

\`\`\`
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
\`\`\`

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


## 代码示例

### TypeScript

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

function getUserById(id: number): User | undefined {
  const users: User[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
  ];

  return users.find(user => user.id === id);
}

const user = getUserById(1);
console.log(user?.name); // Output: Alice
\`\`\`

### JavaScript

\`\`\`javascript
// JavaScript 示例
const numbers = [1, 2, 3, 4, 5];

// 使用 map 进行数组转换
const doubled = numbers.map(n => n * 2);
console.log('Doubled:', doubled);

// 使用 filter 进行过滤
const evens = numbers.filter(n => n % 2 === 0);
console.log('Evens:', evens);

// 使用 reduce 进行累加
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log('Sum:', sum);
\`\`\`

### CSS

\`\`\`css
/* CSS 样式示例 */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1e1e1e;
  min-height: 100vh;
  padding: 20px;
}

.button {
  background: #007acc;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.button:hover {
  background: #0062a3;
}
\`\`\`

### JSON

\`\`\`json
{
  "name": "markdown-monaco-viewer",
  "version": "1.0.0",
  "description": "Markdown viewer with Monaco Editor code highlighting",
  "features": [
    "file upload",
    "syntax highlighting",
    "dark theme",
    "multiple language support"
  ],
  "dependencies": {
    "react": "^19.2.0",
    "modern-monaco": "^0.3.7",
    "streamdown": "^2.1.0"
  }
}
\`\`\`

### Python

\`\`\`python
# Python 示例 - 数据处理和类定义
from dataclasses import dataclass
from typing import List
import json

@dataclass
class User:
    """用户类"""
    id: int
    name: str
    email: str

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email
        }

class UserManager:
    """用户管理类"""

    def __init__(self):
        self.users: List[User] = []

    def add_user(self, user: User) -> None:
        """添加用户"""
        self.users.append(user)

    def find_by_id(self, user_id: int) -> User | None:
        """根据 ID 查找用户"""
        return next((u for u in self.users if u.id == user_id), None)

    def get_all(self) -> List[dict]:
        """获取所有用户"""
        return [user.to_dict() for user in self.users]

# 使用示例
manager = UserManager()
manager.add_user(User(1, "Alice", "alice@example.com"))
manager.add_user(User(2, "Bob", "bob@example.com"))

print(json.dumps(manager.get_all(), indent=2, ensure_ascii=False))
\`\`\`

### Go

\`\`\`go
// Go 示例 - 结构体和方法
package main

import (
	"encoding/json"
	"fmt"
)

// User 用户结构体
type User struct {
	ID    int    \`json:"id"\`
	Name  string \`json:"name"\`
	Email string \`json:"email"\`
}

// UserManager 用户管理器
type UserManager struct {
	users []User
}

// NewUserManager 创建新的用户管理器
func NewUserManager() *UserManager {
	return &UserManager{
		users: make([]User, 0),
	}
}

// AddUser 添加用户
func (um *UserManager) AddUser(user User) {
	um.users = append(um.users, user)
}

// FindByID 根据 ID 查找用户
func (um *UserManager) FindByID(id int) *User {
	for i := range um.users {
		if um.users[i].ID == id {
			return &um.users[i]
		}
	}
	return nil
}

// GetAll 获取所有用户
func (um *UserManager) GetAll() []User {
	return um.users
}

func main() {
	manager := NewUserManager()

	manager.AddUser(User{ID: 1, Name: "Alice", Email: "alice@example.com"})
	manager.AddUser(User{ID: 2, Name: "Bob", Email: "bob@example.com"})

	data, _ := json.MarshalIndent(manager.GetAll(), "", "  ")
	fmt.Println(string(data))
}
\`\`\`

## 行内代码

你也可以使用 \`行内代码\` 来强调 \`代码片段\`，让文字更加醒目。

## 列表示例

### 无序列表

- 第一项
- 第二项
  - 嵌套项 1
  - 嵌套项 2
- 第三项

### 有序列表

1. 第一步
2. 第二步
3. 第三步

## 上传文件试试吧！

点击上方按钮或直接拖拽 Markdown 文件到页面任意位置，体验 Monaco Editor 的强大功能！
`;

function App() {
  const [markdownContent, setMarkdownContent] = useState(DEFAULT_MARKDOWN);
  const [isDragging, setIsDragging] = useState(false);
  const [inputMode, setInputMode] = useState<'file' | 'text'>('file');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // ✅ 默认使用深色主题
    return 'dark';
  });
  const monacoTheme = theme === 'dark' ? 'dark-plus' : 'github-light';

  // 更新 document 的 data-theme 属性
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // 切换主题
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const handleFileLoad = useCallback((content: string) => {
    setMarkdownContent(content);
  }, []);

  // 处理文件
  const processFile = useCallback(
    (file: File) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target?.result as string;
        handleFileLoad(content);
      };

      reader.onerror = () => {
        console.error('Error reading file:', file.name);
      };

      reader.readAsText(file);
    },
    [handleFileLoad]
  );

  // 检查拖拽的是否为真实文件
  const checkIsFileDrag = useCallback((dataTransfer: DataTransfer | null): boolean => {
    if (!dataTransfer) return false;

    // 检查 types 数组,看是否包含 'Files' 类型
    const hasFiles = dataTransfer.types.includes('Files');
    const hasFilesMime = Array.from(dataTransfer.types).some(type =>
      type.toLowerCase() === 'files'
    );

    console.log('🔍 Drag type detection:', {
      types: Array.from(dataTransfer.types),
      hasFiles,
      hasFilesMime,
      isFileDrag: hasFiles || hasFilesMime,
    });

    return hasFiles || hasFilesMime;
  }, []);

  // 全屏拖拽事件处理
  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      // 检查是否为真实文件拖拽
      const isFile = checkIsFileDrag(e.dataTransfer);

      console.log(`🎯 DRAG OVER - Type: ${isFile ? 'FILE' : 'TEXT/PATH'}`);

      e.preventDefault();
      e.stopPropagation();

      // 只有真实文件拖拽才显示蒙层
      if (isFile) {
        setIsDragging(true);
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.relatedTarget === null) {
        setIsDragging(false);
      }
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      // 只处理真实文件拖拽
      const isFile = checkIsFileDrag(e.dataTransfer);
      if (!isFile) {
        console.log('⚠️ Not a file drag (likely VSCode), ignoring drop');
        return;
      }

      const files = e.dataTransfer?.files;
      if (files && files.length > 0) {
        const file = files[0];
        const validExtensions = ['.md', '.markdown', '.mdx', '.txt'];
        const hasValidExtension = validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext));

        if (hasValidExtension || file.type === 'text/markdown' || file.type === 'text/plain') {
          processFile(file);
        } else {
          console.warn('Invalid file type. Please upload a Markdown file.');
        }
      }
    };

    // 添加全局事件监听
    document.addEventListener('dragover', handleDragOver);
    document.addEventListener('dragleave', handleDragLeave);
    document.addEventListener('drop', handleDrop);

    return () => {
      document.removeEventListener('dragover', handleDragOver);
      document.removeEventListener('dragleave', handleDragLeave);
      document.removeEventListener('drop', handleDrop);
    };
  }, [processFile, checkIsFileDrag]);

  return (
    <ThemeContext.Provider value={{ theme, monacoTheme, toggleTheme }}>
      <div className="app-container">
        {isDragging && (
          <div
            className="fullscreen-drag-overlay"
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (e.relatedTarget === null) {
                setIsDragging(false);
              }
            }}
            onDrop={(e) => {
              console.log('🎯 Overlay DROP triggered');
              e.preventDefault();
              e.stopPropagation();
              setIsDragging(false);

              const files = e.dataTransfer?.files;
              if (files && files.length > 0) {
                const file = files[0];
                const validExtensions = ['.md', '.markdown', '.mdx', '.txt'];
                const hasValidExtension = validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext));

                if (hasValidExtension || file.type === 'text/markdown' || file.type === 'text/plain') {
                  console.log('✅ Processing file from overlay drop');
                  processFile(file);
                } else {
                  console.warn('Invalid file type:', file.name);
                }
              }
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '4px dashed var(--accent-color)',
            }}
          >
            <div
              style={{
                backgroundColor: 'var(--bg-primary)',
                padding: '40px 60px',
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                textAlign: 'center',
                border: '2px solid var(--accent-color)',
              }}
            >
              <div
                style={{
                  fontSize: '48px',
                  marginBottom: '16px',
                }}
              >
                📁
              </div>
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                }}
              >
                释放文件以上传
              </div>
              <div
                style={{
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                }}
              >
                支持 .md, .markdown, .mdx, .txt 格式
              </div>
            </div>
          </div>
        )}

        {/* 固定定位的主题切换按钮 - 使用 Tailwind CSS v4 */}
        <button
          onClick={toggleTheme}
          className="fixed top-5 right-5 z-1000 px-4 py-2.5 border rounded-lg cursor-pointer text-sm flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-px"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            borderColor: 'var(--border-color)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
          }}
        >
          {theme === 'dark' ? '☀️ 浅色' : '🌙 深色'}
        </button>

        <InputModeSwitcher currentMode={inputMode} onModeChange={setInputMode} />

        {inputMode === 'file' ? (
          <FileUploader onFileLoad={handleFileLoad} isFullPageDragging={isDragging} />
        ) : (
          <TextPasteInput onTextLoad={handleFileLoad} />
        )}

        <main className="markdown-wrapper">
          <MarkdownViewer content={markdownContent} />
        </main>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;

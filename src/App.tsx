import { useState, useEffect, useCallback } from 'react';
import { MarkdownViewer } from './components/markdown/MarkdownViewer';
import { FileUploader } from './components/markdown/FileUploader';
import { ThemeContext } from './contexts/ThemeContext';
import './App.css';

// 默认示例 Markdown 内容
const DEFAULT_MARKDOWN = `# Welcome to Markdown Monaco Editor

这是一个支持 **代码高亮** 的 Markdown 编辑器，所有代码块都使用 Monaco Editor 渲染。

## 功能特性

- 📁 支持上传 Markdown 文件
- 🎨 使用 Monaco Editor 进行代码高亮
- 🔤 支持多种编程语言
- 🌙 自动适配系统主题
- 🖱️ 全屏拖拽上传

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

        <header className="app-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1>Markdown Monaco Editor</h1>
            <p className="subtitle">支持 Monaco Editor 代码高亮的 Markdown 查看器 · 支持全屏拖拽上传</p>
          </div>
        </header>

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

        <FileUploader onFileLoad={handleFileLoad} isFullPageDragging={isDragging} />

        <main className="markdown-wrapper">
          <MarkdownViewer content={markdownContent} />
        </main>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;

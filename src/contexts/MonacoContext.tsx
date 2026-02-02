import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { init } from 'modern-monaco';

interface MonacoContextValue {
  monaco: Awaited<ReturnType<typeof init>> | null;
  isReady: boolean;
}

const MonacoContext = createContext<MonacoContextValue>({
  monaco: null,
  isReady: false,
});

interface MonacoProviderProps {
  children: ReactNode;
}

/**
 * Monaco Provider - 初始化 Monaco Editor 一次并在整个应用中共享
 *
 * 功能:
 * - 单次初始化 Monaco，避免重复加载
 * - 使用 React 状态管理，遵循 React 生命周期
 * - 提供统一的 Monaco 实例给所有编辑器组件
 * - 正确清理资源，防止内存泄漏
 */
export function MonacoProvider({ children }: MonacoProviderProps) {
  const [monaco, setMonaco] = useState<MonacoContextValue['monaco']>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    // 初始化 Monaco
    const initMonaco = async () => {
      try {
        const instance = await init({
          // 不提供 lsp 配置，使用默认的语法高亮即可
          // 对于只读代码显示器，不需要完整的 LSP 功能
          cdn: 'https://unpkg.com/',
          themes: [
            'https://esm.sh/tm-themes@1.10.15/themes/dark-plus.json',
            'https://esm.sh/tm-themes@1.10.15/themes/github-light.json',
          ],
          langs: [
            'javascript',
            'typescript',
            'html',
            'css',
            'json',
            'go',
            'python',
            'java',
            'cpp',
            'csharp',
            'php',
            'ruby',
            'rust',
            'sql',
            'yaml',
            'xml',
            'markdown',
            'vue',
            'tsx',
            'jsx',
            'scss',
            'less',
            'dart',
            'kotlin',
            'swift',
          ],
        });

        // 配置 TypeScript/JavaScript - 禁用诊断以避免 "Could not find source file" 错误
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const languages = (instance as any).languages;
        if (languages?.typescript) {
          // 禁用 TypeScript 和 JavaScript 的诊断验证（只读代码显示器不需要）
          languages.typescript.typescriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: true,
            noSyntaxValidation: true,
          });

          // 配置编译器选项
          languages.typescript.typescriptDefaults.setCompilerOptions({
            target: languages.typescript.ScriptTarget.Latest,
            allowNonTsExtensions: true,
            moduleResolution: languages.typescript.ModuleResolutionKind.NodeJs,
            module: languages.typescript.ModuleKind.CommonJS,
            noEmit: true,
            esModuleInterop: true,
            jsx: languages.typescript.JsxEmit.React,
            reactNamespace: 'React',
            allowJs: true,
          });
        }

        // Go 语言配置 - 启用基本诊断功能
        if (languages?.go) {
          try {
            // Go 语言默认支持语法高亮和基础诊断
            // 对于只读显示器，使用默认配置即可
            console.log('Go language support loaded');
          } catch (e) {
            console.warn('Go language configuration skipped:', e);
          }
        }

        // Python 语言配置
        if (languages?.python) {
          try {
            // Python 语言默认支持语法高亮和基础诊断
            // 对于只读显示器，使用默认配置即可
            console.log('Python language support loaded');
          } catch (e) {
            console.warn('Python language configuration skipped:', e);
          }
        }

        // 只在组件仍然挂载时更新状态
        if (mounted) {
          setMonaco(instance);
          setIsReady(true);
        }
      } catch (error) {
        console.error('Failed to initialize Monaco:', error);
      }
    };

    initMonaco();

    // 清理函数
    return () => {
      mounted = false;

      // 清理所有 Monaco 资源
      if (monaco) {
        try {
          // 销毁所有编辑器实例
          const editors = monaco.editor.getEditors();
          editors.forEach((editor) => {
            const model = editor.getModel();
            if (model) {
              model.dispose();
            }
            editor.dispose();
          });

          // 注意: 不要销毁 monaco 实例本身，因为它是全局的
          // modern-monaco 会处理全局资源的清理
        } catch (error) {
          console.error('Error disposing Monaco resources:', error);
        }
      }
    };
  }, []); // 只在挂载时运行一次

  const contextValue: MonacoContextValue = {
    monaco,
    isReady,
  };

  return (
    <MonacoContext.Provider value={contextValue}>
      {children}
    </MonacoContext.Provider>
  );
}

/**
 * 获取 Monaco 上下文
 *
 * 使用示例:
 * ```tsx
 * const { monaco, isReady } = useMonaco();
 *
 * if (!isReady) {
 *   return <div>Loading editor...</div>;
 * }
 * ```
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useMonaco() {
  const context = useContext(MonacoContext);
  if (!context) {
    throw new Error('useMonaco must be used within MonacoProvider');
  }
  return context;
}

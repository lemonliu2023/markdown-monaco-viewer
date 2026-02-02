import { memo } from 'react';
import { MonacoEditor } from '../../MonacoEditor';
import { extractLanguage, normalizeLanguage } from '../../utils/languageDetection';
import { useTheme } from '../../contexts/ThemeContext';
import type { CodeBlockProps } from '../../types/markdown';

/**
 * 自定义代码块渲染器
 * - 行内代码使用 <code> 标签
 * - 代码块使用 MonacoEditor 渲染
 */
const CodeBlockRendererImpl = ({ node, className, children }: CodeBlockProps) => {
  const { monacoTheme } = useTheme();

  // 判断是行内代码还是代码块
  const isInline = node?.position?.start.line === node?.position?.end.line;

  // 行内代码使用原生渲染 - 使用 Tailwind 类
  if (isInline) {
    return (
      <code
        className="px-1.5 py-0.5 rounded font-mono text-sm"
        style={{
          backgroundColor: 'var(--code-bg)',
          color: 'var(--inline-code-color)',
        }}
      >
        {children}
      </code>
    );
  }

  // 提取代码内容和语言
  const code = typeof children === 'string' ? children : String(children);
  const rawLanguage = extractLanguage(className);
  const language = normalizeLanguage(rawLanguage);

  // 使用 MonacoEditor 渲染代码块 - 使用 Tailwind 类
  return (
    <div
      className="mt-4 mb-4 border rounded-lg"
      style={{
        borderColor: 'var(--border-color)',
      }}
    >
      <MonacoEditor value={code} language={language} theme={monacoTheme} />
    </div>
  );
};

// 使用 React.memo 优化性能
export const CodeBlockRenderer = memo(
  CodeBlockRendererImpl,
  (prev, next) =>
    prev.className === next.className && prev.children === next.children,
);

import { memo } from 'react';
import { Streamdown } from 'streamdown';
import { CodeBlockRenderer } from './CodeBlockRenderer';
import type { MarkdownViewerProps } from '../../types/markdown';

/**
 * Markdown 查看器组件
 * 使用 Streamdown 渲染，代码块通过自定义组件使用 MonacoEditor
 */
const MarkdownViewerImpl = ({ content, className = '' }: MarkdownViewerProps) => {
  return (
    <div className={`markdown-content ${className}`}>
      <Streamdown
        components={{
          code: CodeBlockRenderer, // 关键：使用自定义代码块渲染器
        }}
        mode="static" // 静态模式，不需要流式渲染
      >
        {content}
      </Streamdown>
    </div>
  );
};

export const MarkdownViewer = memo(
  MarkdownViewerImpl,
  (prev, next) => prev.content === next.content,
);

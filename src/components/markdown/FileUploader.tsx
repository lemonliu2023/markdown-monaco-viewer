import { memo, useCallback, useState } from 'react';
import type { FileUploaderProps } from '../../types/markdown';

/**
 * 文件上传组件
 * 支持拖拽上传和点击上传 .md, .markdown, .mdx, .txt 文件
 */
const FileUploaderImpl = ({ onFileLoad, accept = '.md,.markdown,.mdx,.txt', isFullPageDragging }: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);

  // 如果全屏拖拽激活，禁用局部拖拽
  const localIsDragging = isDragging && !isFullPageDragging;

  const processFile = useCallback(
    (file: File) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target?.result as string;
        onFileLoad(content);
      };

      reader.onerror = () => {
        console.error('Error reading file:', file.name);
      };

      reader.readAsText(file);
    },
    [onFileLoad]
  );

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
      processFile(file);
    },
    [processFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        // 检查文件类型
        const validExtensions = ['.md', '.markdown', '.mdx', '.txt'];
        const hasValidExtension = validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext));

        if (hasValidExtension || file.type === 'text/markdown' || file.type === 'text/plain') {
          processFile(file);
        } else {
          console.warn('Invalid file type. Please upload a Markdown file.');
        }
      }
    },
    [processFile]
  );

  return (
    <div
      onDragOver={isFullPageDragging ? undefined : handleDragOver}
      onDragLeave={isFullPageDragging ? undefined : handleDragLeave}
      onDrop={isFullPageDragging ? undefined : handleDrop}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '16px',
        backgroundColor: localIsDragging ? 'var(--bg-hover)' : 'var(--bg-tertiary)',
        borderRadius: '8px',
        border: localIsDragging ? '2px dashed var(--accent-color)' : '1px solid var(--border-color)',
        marginBottom: '20px',
        transition: 'all 0.2s',
      }}
    >
      <label style={{ cursor: 'pointer' }}>
        <span
          style={{
            padding: '8px 16px',
            backgroundColor: '#007acc',
            color: 'white',
            borderRadius: '4px',
            display: 'inline-block',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0062a3')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#007acc')}
        >
          上传 Markdown 文件
        </span>
        <input type="file" accept={accept} onChange={handleFileChange} style={{ display: 'none' }} />
      </label>
      <span style={{ color: '#9ca3af', fontSize: '14px' }}>
        {isDragging ? '释放文件以上传' : '支持拖拽或点击上传 · .md, .markdown, .mdx, .txt'}
      </span>
    </div>
  );
};

export const FileUploader = memo(FileUploaderImpl);

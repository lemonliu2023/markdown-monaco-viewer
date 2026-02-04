import { memo, useCallback, useState, useRef, useEffect } from 'react';

interface TextPasteInputProps {
  onTextLoad: (content: string) => void;
}

/**
 * 文本输入组件
 * 支持直接粘贴或输入 Markdown 文本
 */
const TextPasteInputImpl = ({ onTextLoad }: TextPasteInputProps) => {
  const [text, setText] = useState('');
  const [charCount, setCharCount] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 自动调整 textarea 高度
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 400)}px`;
    }
  }, [text]);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    setCharCount(newText.length);
  }, []);

  const handlePreview = useCallback(() => {
    if (text.trim()) {
      onTextLoad(text);
    }
  }, [text, onTextLoad]);

  const handleClear = useCallback(() => {
    setText('');
    setCharCount(0);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handlePaste = useCallback(async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
      setCharCount(clipboardText.length);
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // Ctrl/Cmd + Enter 快速预览
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handlePreview();
      }
    },
    [handlePreview]
  );

  return (
    <div
      style={{
        padding: '16px',
        backgroundColor: 'var(--bg-tertiary)',
        borderRadius: '8px',
        border: '1px solid var(--border-color)',
        marginBottom: '20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px',
        }}
      >
        <span
          style={{
            color: 'var(--text-secondary)',
            fontSize: '14px',
          }}
        >
          直接输入或粘贴 Markdown 文本
        </span>
        <span
          style={{
            color: 'var(--text-secondary)',
            fontSize: '12px',
            fontFamily: 'monospace',
          }}
        >
          {charCount.toLocaleString()} 字符
        </span>
      </div>

      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
        placeholder="在此输入或粘贴 Markdown 内容...&#10;&#10;支持：&#10;• 代码块语法高亮&#10;• 标题、列表、表格&#10;• 行内代码等标准 Markdown 语法&#10;&#10;快捷键：Ctrl/Cmd + Enter 快速预览"
        style={{
          width: '100%',
          minHeight: '120px',
          maxHeight: '400px',
          padding: '12px',
          backgroundColor: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-color)',
          borderRadius: '6px',
          fontSize: '14px',
          lineHeight: '1.6',
          fontFamily: 'var(--font-code, monospace)',
          resize: 'none',
          outline: 'none',
          transition: 'border-color 0.2s',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent-color)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-color)';
        }}
      />

      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginTop: '12px',
        }}
      >
        <button
          onClick={handlePreview}
          disabled={!text.trim()}
          style={{
            padding: '8px 16px',
            backgroundColor: text.trim() ? '#007acc' : 'var(--bg-hover)',
            color: text.trim() ? 'white' : 'var(--text-secondary)',
            border: 'none',
            borderRadius: '4px',
            cursor: text.trim() ? 'pointer' : 'not-allowed',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => {
            if (text.trim()) {
              e.currentTarget.style.backgroundColor = '#0062a3';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = text.trim() ? '#007acc' : 'var(--bg-hover)';
          }}
        >
          预览
        </button>

        <button
          onClick={handlePaste}
          style={{
            padding: '8px 16px',
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
            e.currentTarget.style.borderColor = 'var(--accent-color)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
            e.currentTarget.style.borderColor = 'var(--border-color)';
          }}
        >
          从剪贴板粘贴
        </button>

        <button
          onClick={handleClear}
          disabled={!text}
          style={{
            padding: '8px 16px',
            backgroundColor: 'transparent',
            color: text ? 'var(--text-secondary)' : 'var(--text-disabled)',
            border: text ? '1px solid var(--border-color)' : '1px solid transparent',
            borderRadius: '4px',
            cursor: text ? 'pointer' : 'not-allowed',
            fontSize: '14px',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            if (text) {
              e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = text ? 'var(--text-secondary)' : 'var(--text-disabled)';
          }}
        >
          清空
        </button>
      </div>
    </div>
  );
};

export const TextPasteInput = memo(TextPasteInputImpl);

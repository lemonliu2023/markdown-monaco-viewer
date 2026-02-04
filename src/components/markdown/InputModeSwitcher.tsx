import { memo } from 'react';

type InputMode = 'file' | 'text';

interface InputModeSwitcherProps {
  currentMode: InputMode;
  onModeChange: (mode: InputMode) => void;
}

/**
 * 输入模式切换组件
 * 在文件上传和文本输入之间切换
 */
const InputModeSwitcherImpl = ({ currentMode, onModeChange }: InputModeSwitcherProps) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '16px',
        padding: '4px',
        backgroundColor: 'var(--bg-tertiary)',
        borderRadius: '8px',
        border: '1px solid var(--border-color)',
      }}
    >
      <button
        onClick={() => onModeChange('file')}
        style={{
          flex: 1,
          padding: '10px 20px',
          backgroundColor: currentMode === 'file' ? 'var(--bg-secondary)' : 'transparent',
          color: currentMode === 'file' ? 'var(--text-primary)' : 'var(--text-secondary)',
          border: currentMode === 'file' ? '1px solid var(--border-color)' : '1px solid transparent',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: currentMode === 'file' ? '600' : '400',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
        onMouseEnter={(e) => {
          if (currentMode !== 'file') {
            e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }
        }}
        onMouseLeave={(e) => {
          if (currentMode !== 'file') {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }
        }}
      >
        <span style={{ fontSize: '16px' }}>📁</span>
        文件上传
      </button>

      <button
        onClick={() => onModeChange('text')}
        style={{
          flex: 1,
          padding: '10px 20px',
          backgroundColor: currentMode === 'text' ? 'var(--bg-secondary)' : 'transparent',
          color: currentMode === 'text' ? 'var(--text-primary)' : 'var(--text-secondary)',
          border: currentMode === 'text' ? '1px solid var(--border-color)' : '1px solid transparent',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: currentMode === 'text' ? '600' : '400',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
        onMouseEnter={(e) => {
          if (currentMode !== 'text') {
            e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }
        }}
        onMouseLeave={(e) => {
          if (currentMode !== 'text') {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }
        }}
      >
        <span style={{ fontSize: '16px' }}>📝</span>
        文本输入
      </button>
    </div>
  );
};

export const InputModeSwitcher = memo(InputModeSwitcherImpl);
export type { InputMode };

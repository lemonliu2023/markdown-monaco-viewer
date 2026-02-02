import { useEffect, useRef, useMemo } from 'react';
import { useMonaco } from './contexts/MonacoContext';

interface MonacoEditorProps {
  value?: string;
  language?: string;
  theme?: string;
}

// 计算代码高度的函数
function calculateHeight(code: string): number {
  const lines = code.split('\n').length;
  const lineHeight = 20; // 与编辑器设置一致
  const padding = 16; // top: 8 + bottom: 8
  const minHeight = 100;

  return Math.max(minHeight, lines * lineHeight + padding);
}

export function MonacoEditor({
  value = '',
  language = 'javascript',
  theme = 'dark-plus', // ✅ 默认使用深色主题
}: MonacoEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<unknown>(null);
  const { monaco, isReady } = useMonaco();

  // 使用 useMemo 计算高度
  const height = useMemo(() => calculateHeight(value), [value]);

  // 等待 Monaco 准备好
  useEffect(() => {
    if (!containerRef.current || !isReady || !monaco) return;

    // 不指定 URI，让 Monaco 自动生成
    // 这样可以避免 TypeScript 验证错误
    const model = monaco.editor.createModel(value, language);

    // 创建编辑器
    const editor = monaco.editor.create(containerRef.current, {
      model,
      theme,
      automaticLayout: true,
      scrollBeyondLastLine: false,
      minimap: { enabled: false },
      fontSize: 13,
      lineHeight: 20,
      padding: { top: 8, bottom: 8 },
      readOnly: true,
      domReadOnly: true,
      disableLayerHinting: true,
      // scrollBeyondLastLine: false,
      scrollbar: {
        vertical: 'hidden', // 隐藏垂直滚动条
        horizontal: 'hidden', // 隐藏水平滚动条
        handleMouseWheel: false, // 不处理鼠标滚轮
      },
    });

    editorRef.current = editor;

    return () => {
      // 清理函数
      if (editor) {
        const currentModel = editor.getModel();
        if (currentModel) {
          currentModel.dispose();
        }
        editor.dispose();
      }
      editorRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, monaco]); // 只在 Monaco 准备好后运行一次

  // ✅ 新增: 更新主题
  useEffect(() => {
    if (editorRef.current && monaco) {
      monaco.editor.setTheme(theme);
    }
  }, [theme, monaco]);

  // ✅ 新增: 更新代码内容和语言
  useEffect(() => {
    if (!editorRef.current || !monaco) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const editor = editorRef.current as any;
    const model = editor.getModel();

    if (model) {
      // 更新内容
      if (model.getValue() !== value) {
        model.setValue(value);
      }
      // 更新语言
      if (model.getLanguageId() !== language) {
        monaco.editor.setModelLanguage(model, language);
      }
    }
  }, [value, language, monaco]);

  return (
    <div
      ref={containerRef}
      className="transition-all duration-200"
      style={{
        height: `${height}px`,
      }}
    />
  );
}

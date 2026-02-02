export interface CodeBlockProps {
  node?: {
    position?: {
      start: { line: number; column: number };
      end: { line: number; column: number };
    };
  };
  className?: string;
  children?: React.ReactNode;
}

export interface MonacoCodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

export interface FileUploaderProps {
  onFileLoad: (content: string) => void;
  accept?: string;
  isFullPageDragging?: boolean;
}

export interface MarkdownViewerProps {
  content: string;
  className?: string;
}

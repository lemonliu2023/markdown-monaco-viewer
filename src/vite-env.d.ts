/// <reference types="vite/client" />

interface MonacoEditorCustomElement {
  language?: string;
  theme?: string;
  padding?: string;
  fontSize?: string;
  fontFamily?: string;
  fontLigatures?: boolean;
  multiCursorModifier?: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'monaco-editor': MonacoEditorCustomElement & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export {};

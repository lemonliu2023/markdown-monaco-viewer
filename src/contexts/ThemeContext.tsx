import { createContext, useContext } from 'react';
import type { Theme } from '../hooks/useSystemTheme';

export const ThemeContext = createContext<{
  theme: Theme;
  monacoTheme: string;
  toggleTheme: () => void;
} | null>(null);

/**
 * 获取当前主题上下文
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

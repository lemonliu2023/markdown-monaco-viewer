import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

/**
 * 检测系统主题偏好
 */
export function useSystemTheme(): Theme {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark';

    // ✅ 默认使用深色主题，而不是检测系统主题
    return 'dark';
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');


    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    // 监听系统主题变化
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return theme;
}

/**
 * 获取主题对应的 Monaco 主题名称
 */
export function getMonacoTheme(theme: Theme): string {
  return theme === 'dark' ? 'dark-plus' : 'github-light';
}

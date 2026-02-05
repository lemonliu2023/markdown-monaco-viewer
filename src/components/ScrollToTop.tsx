import { useState, useEffect } from 'react';

interface ScrollToTopProps {
  /** 滚动多少像素后显示按钮 */
  threshold?: number;
  /** 按钮样式类名 */
  className?: string;
}

/**
 * 滚动到顶部按钮组件
 * 用户滚动超过阈值时显示,点击平滑滚动到页面顶部
 */
export const ScrollToTop = ({ threshold = 300, className = '' }: ScrollToTopProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      // 使用节流优化性能
      if (timeoutId) return;

      timeoutId = setTimeout(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        setIsVisible(scrollTop > threshold);
        timeoutId = null;
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 初始检查
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`scroll-to-top ${className}`}
      aria-label="滚动到顶部"
      title="回到顶部"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
};

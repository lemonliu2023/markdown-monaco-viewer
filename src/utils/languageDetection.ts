// MonacoEditor 支持的语言
const SUPPORTED_LANGUAGES = [
  'javascript',
  'typescript',
  'html',
  'css',
  'json',
  'go',
  'python',
  'java',
  'cpp',
  'csharp',
  'php',
  'ruby',
  'rust',
  'sql',
  'yaml',
  'xml',
  'markdown',
  'vue',
  'tsx',
  'jsx',
  'scss',
  'less',
  'dart',
  'kotlin',
  'swift',
] as const;

type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

// 语言别名映射
const LANGUAGE_ALIASES: Record<string, SupportedLanguage> = {
  // JavaScript
  js: 'javascript',
  jsx: 'javascript',
  mjs: 'javascript',
  cjs: 'javascript',

  // TypeScript
  ts: 'typescript',
  tsx: 'typescript',

  // Python
  py: 'python',
  py3: 'python',

  // C/C++
  c: 'cpp',
  'c++': 'cpp',
  cc: 'cpp',
  h: 'cpp',
  'h++': 'cpp',
  hh: 'cpp',

  // C#
  cs: 'csharp',

  // Shell
  shell: 'javascript',
  shellscript: 'javascript',
  sh: 'javascript',
  bash: 'javascript',

  // Vue
  'vue-html': 'vue',

  // YAML
  yml: 'yaml',

  // Markdown
  md: 'markdown',
  mdx: 'markdown',

  // 默认回退
  text: 'javascript',
  plaintext: 'javascript',
};

/**
 * 将语言标识规范化为 MonacoEditor 支持的语言
 */
export function normalizeLanguage(lang: string): SupportedLanguage {
  const normalized = lang.toLowerCase().trim();

  if (SUPPORTED_LANGUAGES.includes(normalized as SupportedLanguage)) {
    return normalized as SupportedLanguage;
  }

  return LANGUAGE_ALIASES[normalized] || 'javascript';
}

/**
 * 从 className 中提取语言标识
 * Streamdown 使用 "language-xxx" 格式
 */
export function extractLanguage(className?: string): string {
  if (!className) return 'javascript';

  // 解析 "language-xxx" 格式
  const match = className.match(/language-(\w+)/);
  return match ? match[1] : 'javascript';
}

/**
 * 获取所有支持的语言列表
 */
export function getSupportedLanguages(): readonly string[] {
  return SUPPORTED_LANGUAGES;
}

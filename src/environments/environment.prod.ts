export const environment = {
  production: true,
  API_URL:
    typeof window !== 'undefined' ? (window as any).__env?.API_URL || '' : '',
  GEMINI_API_KEY:
    typeof window !== 'undefined'
      ? (window as any).__env?.GEMINI_API_KEY || ''
      : '',
};

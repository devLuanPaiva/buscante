export const environment = {
  production: false,
  API_URL: (window as any).__env?.API_URL || '',
  GEMINI_API_KEY: (window as any).__env?.GEMINI_API_KEY || '',
};

echo "window.__env = {" > public/env.js
echo "  API_URL: '${API_URL}'," >> public/env.js
echo "  GEMINI_API_KEY: '${GEMINI_API_KEY}'" >> public/env.js
echo "};" >> public/env.js

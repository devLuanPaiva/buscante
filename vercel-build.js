const fs = require('fs');
const envFile = `export const environment = {
    production: true,
    API_URL: '${process.env.API_URL}',
    GEMINI_API_KEY: '${process.env.GEMINI_API_KEY}',
};
`;
fs.writeFileSync('./src/environments/environment.prod.ts', envFile);
console.log('✅ Successfully generated environment.prod.ts');

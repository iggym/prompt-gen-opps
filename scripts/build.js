import { access } from 'node:fs/promises';

await Promise.all(['index.html', 'src/app.js', 'src/promptEngine.js', 'src/promptData.js', 'src/styles.css'].map((file) => access(file)));
console.log('Static GitHub Pages build check passed.');

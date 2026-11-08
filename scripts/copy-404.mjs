// GitHub Pages serves 404.html for unknown paths. Copying index.html there lets the single-page app
// handle direct visits/refreshes of pages like /decorations.
import { copyFileSync } from 'node:fs';
copyFileSync('dist/index.html', 'dist/404.html');
console.log('Created dist/404.html (single-page-app fallback)');

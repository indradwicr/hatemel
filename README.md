# CodeFlow Studio v2

A free, mobile-first, local-first HTML/CSS/JS workspace.

## Run locally
For best results serve this folder through a local web server (or GitHub Pages). Opening `index.html` directly also works for basic editing, but PWA installation requires HTTPS or localhost.

## Deploy with GitHub Pages (free)
1. Create a public GitHub repository.
2. Upload all files in this folder to the repository root.
3. Go to Settings → Pages.
4. Choose Deploy from a branch, `main`, `/ (root)`.
5. Open the published URL on your phone and use Share → Add to Home Screen.

## Included
- Responsive desktop and mobile dashboard
- Projects, favorites, search, duplicate, rename, delete
- HTML, CSS, JS editing with CodeMirror syntax highlighting
- Fallback editor if CodeMirror CDN is unavailable
- Live sandboxed preview
- Desktop / tablet / mobile preview widths
- Autosave to localStorage
- Starter templates
- ZIP export per project and full workspace backup
- ZIP import (root-level HTML/CSS/JS files) and JSON backup import
- Light and dark theme
- PWA manifest and offline app-shell caching

## Free dependencies
CodeMirror 5 and JSZip are loaded from cdnjs (MIT licenses). An internet connection is needed on first load for syntax highlighting and ZIP features. Basic editing and preview still work if the CDN is unavailable.

## Data & privacy
Projects are stored in this browser on this device. There is no account, backend, analytics, or cloud sync. Export backups regularly before clearing browser data.

## Current limitations
- ZIP importer reads root-level HTML/CSS/JS files; it does not yet preserve nested folders or binary assets.
- Preview runs in a sandboxed iframe; some browser APIs and external resources may be restricted.
- SSH/SFTP, Git integration, collaborative editing and AI code generation are not included.

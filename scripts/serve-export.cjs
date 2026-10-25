// Next output: export needs a static server with clean-URL resolution.
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const root = path.resolve(__dirname, '../out');
const portFlag = process.argv.findIndex(arg => arg === '--port' || arg === '-p');
const port = Number(portFlag >= 0 ? process.argv[portFlag + 1] : process.env.PORT || 3000);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json', '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.ico': 'image/x-icon', '.pdf': 'application/pdf', '.woff2': 'font/woff2', '.woff': 'font/woff', '.otf': 'font/otf', '.mp4': 'video/mp4' };
http.createServer(async (req, res) => {
 try {
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const base = path.resolve(root, '.' + pathname);
  if (base !== root && !base.startsWith(root + path.sep)) { res.writeHead(403); res.end(); return; }
  for (const filename of [base, base + '.html', path.join(base, 'index.html')]) {
   const stat = await fs.stat(filename).catch(() => null);
   if (!stat?.isFile()) continue;
   res.writeHead(200, { 'Content-Type': types[path.extname(filename)] || 'application/octet-stream', 'Content-Length': stat.size, 'Cache-Control': 'no-cache' });
   res.end(req.method === 'HEAD' ? undefined : await fs.readFile(filename)); return;
  }
  const body = await fs.readFile(path.join(root, '404.html'));
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }); res.end(req.method === 'HEAD' ? undefined : body);
 } catch { res.writeHead(400); res.end('Bad request'); }
}).listen(port, () => console.log(`Portfolio static export: http://localhost:${port}`));

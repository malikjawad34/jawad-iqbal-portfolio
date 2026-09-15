import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('out');
const port = Number(process.env.PORT || 3000);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2',
};
http
  .createServer(async (req, res) => {
    try {
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        res.writeHead(405, { Allow: 'GET, HEAD' });
        res.end();
        return;
      }
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      let target = path.resolve(root, '.' + pathname);
      if (target !== root && !target.startsWith(root + path.sep)) {
        res.writeHead(403);
        res.end();
        return;
      }
      let status = 200;
      try {
        if ((await stat(target)).isDirectory()) target = path.join(target, 'index.html');
        await stat(target);
      } catch {
        status = 404;
        target = path.join(root, '404.html');
      }
      const content = await readFile(target);
      res.writeHead(status, {
        'Content-Type': mime[path.extname(target)] || 'application/octet-stream',
        'Content-Length': content.length,
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      });
      res.end(req.method === 'HEAD' ? undefined : content);
    } catch {
      res.writeHead(400);
      res.end('Bad request');
    }
  })
  .listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}`));

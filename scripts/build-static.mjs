/**
 * Builds a plain-HTML version of the site into `out/`.
 *
 * Next.js cannot include server route handlers in a static export, so the two
 * API routes are moved aside for the duration of the build and restored
 * afterwards. The exported site opens straight from the filesystem or from any
 * static host (Netlify, Cloudflare Pages, S3, Apache, nginx…).
 *
 * Usage: npm run build:static
 */
import { rename, rm, access } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const apiDir = path.join(root, 'src', 'app', 'api');
const parked = path.join(root, '.api-parked');

const exists = async (p) => !!(await access(p).then(() => true).catch(() => false));

const run = (cmd, args, env) =>
  new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { cwd: root, stdio: 'inherit', shell: process.platform === 'win32', env });
    child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exited with ${code}`))));
  });

let moved = false;
try {
  if (await exists(apiDir)) {
    await rm(parked, { recursive: true, force: true });
    await rename(apiDir, parked);
    moved = true;
  }
  await rm(path.join(root, 'out'), { recursive: true, force: true });
  await run('npx', ['next', 'build'], {
    ...process.env,
    STATIC_EXPORT: '1',
    NEXT_PUBLIC_STATIC_PREVIEW: '1',
  });
  console.log('\nStatic site written to ./out — open out/index.html in a browser.');
} finally {
  if (moved) {
    await rm(apiDir, { recursive: true, force: true });
    await rename(parked, apiDir);
  }
}

import { spawn } from 'node:child_process';
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TARGET_URL = process.env.URL || 'https://jawad-engineer.vercel.app/';
const OUTPUT_FILE = path.resolve('public', 'jawad-iqbal-portfolio-15s.mp4');
const FPS = 30;
const DURATION_SEC = 15;
const TOTAL_FRAMES = FPS * DURATION_SEC; // 450 frames
const WIDTH = 1920;
const HEIGHT = 1080;

function smoothstep(min, max, value) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

function getScrollOffset(t, maxScroll) {
  // Waypoints: [timeInSeconds, targetScrollFraction]
  const waypoints = [
    { t: 0.0, frac: 0.0 },       // Hero static
    { t: 2.0, frac: 0.0 },       // Hold Hero
    { t: 6.0, frac: 0.35 },      // Smooth glide to Featured Projects
    { t: 7.2, frac: 0.45 },      // Gentle glide through Architecture & Badges
    { t: 10.5, frac: 0.78 },     // Smooth glide through Capabilities & Philosophy
    { t: 13.0, frac: 1.0 },      // Arrive at Contact CTA & Footer
    { t: 15.0, frac: 1.0 },      // Hold on Contact CTA & Footer
  ];

  for (let i = 0; i < waypoints.length - 1; i++) {
    const w1 = waypoints[i];
    const w2 = waypoints[i + 1];
    if (t >= w1.t && t <= w2.t) {
      const ease = smoothstep(w1.t, w2.t, t);
      const frac = w1.frac + ease * (w2.frac - w1.frac);
      return Math.round(frac * maxScroll);
    }
  }
  return maxScroll;
}

async function run() {
  console.log(`[1/4] Launching headless Chrome from: ${CHROME_PATH}`);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      `--window-size=${WIDTH},${HEIGHT}`,
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 });

  console.log(`[2/4] Navigating to: ${TARGET_URL}`);
  await page.goto(TARGET_URL, { waitUntil: 'networkidle2', timeout: 30000 });

  // Hide scrollbar & cursor for ultra-clean cinematic recording
  await page.addStyleTag({
    content: `
      ::-webkit-scrollbar { display: none !important; }
      * { scrollbar-width: none !important; cursor: none !important; }
    `,
  });

  // Pre-scroll once to trigger any lazy-loaded images or animations, then scroll back to top
  await page.evaluate(async () => {
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 600));
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 800));

  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const maxScroll = Math.max(0, pageHeight - HEIGHT);
  console.log(`[3/4] Page ready. Total height: ${pageHeight}px, Max scroll: ${maxScroll}px`);
  console.log(`      Rendering ${TOTAL_FRAMES} frames (${DURATION_SEC}s @ ${FPS}fps)...`);

  // Ensure output directory exists
  const outDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Spawn FFmpeg to encode MJPEG pipe into H.264 MP4
  const ffmpeg = spawn('ffmpeg', [
    '-y',
    '-f', 'image2pipe',
    '-vcodec', 'mjpeg',
    '-r', String(FPS),
    '-i', '-',
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-preset', 'medium',
    '-crf', '19',
    '-movflags', '+faststart', // Enables progressive web playback
    OUTPUT_FILE,
  ]);

  let ffmpegError = '';
  ffmpeg.stderr.on('data', (d) => {
    ffmpegError += d.toString();
  });

  const ffmpegPromise = new Promise((resolve, reject) => {
    ffmpeg.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`FFmpeg exited with code ${code}: ${ffmpegError}`));
    });
  });

  const startTime = Date.now();
  let lastLogSec = -1;

  for (let frame = 0; frame < TOTAL_FRAMES; frame++) {
    const t = frame / FPS;
    const targetY = getScrollOffset(t, maxScroll);

    await page.evaluate((y) => window.scrollTo(0, y), targetY);

    const jpegBuffer = await page.screenshot({
      type: 'jpeg',
      quality: 88,
    });

    ffmpeg.stdin.write(jpegBuffer);

    const currentSec = Math.floor(t);
    if (currentSec !== lastLogSec) {
      lastLogSec = currentSec;
      const pct = Math.round((frame / TOTAL_FRAMES) * 100);
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(0);
      console.log(`      [Progress] ${currentSec}s / ${DURATION_SEC}s (${pct}%) — ${elapsed}s elapsed`);
    }
  }

  ffmpeg.stdin.end();
  console.log('[4/4] Finalizing video encoding...');
  await ffmpegPromise;
  await browser.close();

  const stats = fs.statSync(OUTPUT_FILE);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`\n🎉 Success! Video saved to:`);
  console.log(`   ${OUTPUT_FILE}`);
  console.log(`   Size: ${sizeMB} MB | Specs: ${WIDTH}x${HEIGHT} @ ${FPS}fps | Duration: ${DURATION_SEC}s\n`);
}

run().catch((err) => {
  console.error('Fatal error recording portfolio:', err);
  process.exit(1);
});

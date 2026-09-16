import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function processImage(inputJpg, outputPng, threshold = 28) {
  console.log(`Processing ${inputJpg} -> ${outputPng}`);
  // Convert jpg to raw RGB ppm
  const ppmBuffer = execSync(`convert ${inputJpg} ppm:-`, { maxBuffer: 50 * 1024 * 1024 });

  // Parse PPM header
  let headerEnd = 0;
  let newlineCount = 0;
  let str = '';
  for (let i = 0; i < 120; i++) {
    const ch = String.fromCharCode(ppmBuffer[i]);
    str += ch;
    if (ch === '\n') {
      newlineCount++;
      if (newlineCount === 3) {
        headerEnd = i + 1;
        break;
      }
    }
  }
  const lines = str.trim().split('\n');
  const [width, height] = lines[1].split(' ').map(Number);
  console.log(`Dimensions: ${width}x${height}`);

  const rgbData = ppmBuffer.subarray(headerEnd);
  const totalPixels = width * height;
  const alpha = new Uint8Array(totalPixels);
  alpha.fill(255); // Default opaque

  const visited = new Uint8Array(totalPixels);
  const queue = new Int32Array(totalPixels);
  let qHead = 0;
  let qTail = 0;

  function isBackground(x, y) {
    const idx = (y * width + x) * 3;
    const r = rgbData[idx];
    const g = rgbData[idx + 1];
    const b = rgbData[idx + 2];
    return Math.max(r, g, b) <= threshold;
  }

  // Seed flood-fill from border pixels
  for (let x = 0; x < width; x++) {
    if (isBackground(x, 0)) {
      const idx = x;
      visited[idx] = 1;
      queue[qTail++] = idx;
    }
    if (isBackground(x, height - 1)) {
      const idx = (height - 1) * width + x;
      if (!visited[idx]) {
        visited[idx] = 1;
        queue[qTail++] = idx;
      }
    }
  }
  for (let y = 0; y < height; y++) {
    if (isBackground(0, y)) {
      const idx = y * width;
      if (!visited[idx]) {
        visited[idx] = 1;
        queue[qTail++] = idx;
      }
    }
    if (isBackground(width - 1, y)) {
      const idx = y * width + (width - 1);
      if (!visited[idx]) {
        visited[idx] = 1;
        queue[qTail++] = idx;
      }
    }
  }

  // BFS flood-fill
  while (qHead < qTail) {
    const curr = queue[qHead++];
    alpha[curr] = 0;
    const cx = curr % width;
    const cy = Math.floor(curr / width);

    const neighbors = [
      [cx + 1, cy],
      [cx - 1, cy],
      [cx, cy + 1],
      [cx, cy - 1],
    ];
    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nidx = ny * width + nx;
        if (!visited[nidx] && isBackground(nx, ny)) {
          visited[nidx] = 1;
          queue[qTail++] = nidx;
        }
      }
    }
  }

  // Edge antialiasing / feathering
  const finalAlpha = new Uint8Array(alpha);
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x;
      if (alpha[idx] > 0) {
        let transNeighbors = 0;
        if (alpha[idx - 1] === 0) transNeighbors++;
        if (alpha[idx + 1] === 0) transNeighbors++;
        if (alpha[idx - width] === 0) transNeighbors++;
        if (alpha[idx + width] === 0) transNeighbors++;

        if (transNeighbors > 0) {
          const rgbIdx = idx * 3;
          const r = rgbData[rgbIdx];
          const g = rgbData[rgbIdx + 1];
          const b = rgbData[rgbIdx + 2];
          const maxVal = Math.max(r, g, b);
          const ratio = Math.max(0, Math.min(1, (maxVal - threshold) / 35));
          finalAlpha[idx] = Math.round(ratio * 255);
        }
      }
    }
  }

  // Build RGBA buffer
  const rgbaBuffer = Buffer.alloc(totalPixels * 4);
  for (let i = 0; i < totalPixels; i++) {
    rgbaBuffer[i * 4] = rgbData[i * 3];
    rgbaBuffer[i * 4 + 1] = rgbData[i * 3 + 1];
    rgbaBuffer[i * 4 + 2] = rgbData[i * 3 + 2];
    rgbaBuffer[i * 4 + 3] = finalAlpha[i];
  }

  // Output to PNG with alpha
  execSync(`convert -size ${width}x${height} -depth 8 rgba:- ${outputPng}`, {
    input: rgbaBuffer,
    maxBuffer: 50 * 1024 * 1024,
  });

  console.log(`Success: ${outputPng}`);
}

const ingredients = [
  { name: 'mushroom', threshold: 30 },
  { name: 'basil', threshold: 25 },
  { name: 'tomato', threshold: 25 },
  { name: 'olive', threshold: 25 },
  { name: 'pepperoni', threshold: 28 },
];

for (const item of ingredients) {
  const input = `public/assets/ingredients/${item.name}.jpg`;
  const output = `public/assets/ingredients/${item.name}.png`;
  if (fs.existsSync(input)) {
    processImage(input, output, item.threshold);
  }
}

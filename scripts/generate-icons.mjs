import sharp from 'sharp'
import pngToIco from 'png-to-ico'
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const NAVY = { r: 15, g: 27, b: 45, alpha: 1 } // #0F1B2D
const pub = new URL('../public/', import.meta.url).pathname
const master = join(pub, 'icon-master.png')

// Trim the white border to isolate the navy emblem square, then flatten on navy.
async function base(size) {
  const trimmed = await sharp(master)
    .trim({ threshold: 20 })
    .toBuffer()
  return sharp(trimmed)
    .resize(size, size, { fit: 'cover' })
    .flatten({ background: NAVY })
    .png()
    .toBuffer()
}

const pngTargets = [
  ['favicon-16x16.png', 16],
  ['favicon-32x32.png', 32],
  ['apple-touch-icon.png', 180],
  ['android-chrome-192x192.png', 192],
  ['android-chrome-512x512.png', 512],
]

for (const [name, size] of pngTargets) {
  const buf = await base(size)
  await writeFile(join(pub, name), buf)
  console.log('wrote', name, size)
}

// favicon.ico (16, 32, 48)
const icoBuffers = await Promise.all([16, 32, 48].map((s) => base(s)))
const ico = await pngToIco(icoBuffers)
await writeFile(join(pub, 'favicon.ico'), ico)
console.log('wrote favicon.ico')

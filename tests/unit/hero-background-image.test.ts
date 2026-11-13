import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect, it } from 'vitest'
import { HeroBackgroundImage } from '@/components/hero-background-image'

it('limits optimized image source and preload to the desktop media query', () => {
  const html = renderToStaticMarkup(createElement(HeroBackgroundImage, {
    desktopOnly: true, fill: true, priority: true, sizes: '100vw',
    className: 'hidden md:block object-cover', style: { objectPosition: 'center calc(50% + 40px)' },
  }))
  const preload = html.match(/<link[^>]+>/g) ?? []
  expect(preload).toHaveLength(1)
  expect(preload[0]).toContain('media="(min-width: 768px)"')
  expect(preload[0]).toContain('imageSrcSet="/_next/image?')
  const img = html.match(/<img[^>]+>/)?.[0] ?? ''
  expect(img).toContain('src="data:image/gif;base64,')
  expect(img).not.toMatch(/srcSet|\/images\/hero-background/)
  expect(img).toContain('alt=""'); expect(img).toContain('aria-hidden="true"')
  expect(img).toContain('position:absolute'); expect(img).toContain('object-position:center calc(50% + 40px)')
  expect(html).toMatch(/<source media="\(min-width: 768px\)" srcSet="\/_next\/image\?/)
})

it('keeps normal optimized images on pages where the hero is visible on mobile', () => {
  const html = renderToStaticMarkup(createElement(HeroBackgroundImage, { fill: true, priority: true }))
  expect(html).not.toContain('<picture>'); expect(html).not.toContain('data:image/gif')
  expect(html).toContain('srcSet="/_next/image?')
  expect(html).toContain('alt=""'); expect(html).toContain('aria-hidden="true"')
})

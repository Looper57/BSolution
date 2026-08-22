import Image, { type ImageProps } from 'next/image'

type HeroBackgroundImageProps = Omit<ImageProps, 'alt' | 'src'>

/**
 * The single decorative hero background asset, reused across the homepage
 * (all locales) and a few marketing pages. It carries no unique information
 * — the headline and copy convey the page's content — so it is always
 * empty-alt and hidden from assistive tech. Centralized here so that
 * decision can't silently drift per call site (2026-08-22 Ahrefs audit:
 * Ahrefs' image-alt check flags every one of the six render sites
 * individually even though each was already correctly decorative).
 */
export function HeroBackgroundImage(props: HeroBackgroundImageProps) {
  return <Image src="/images/hero-background.png" alt="" aria-hidden="true" {...props} />
}

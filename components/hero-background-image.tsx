import Image, { getImageProps, type ImageProps } from 'next/image'

type HeroBackgroundImageProps = Omit<ImageProps, 'alt' | 'src'> & { desktopOnly?: boolean }
const asset = '/images/hero-background.png'
const transparent = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
const desktop = '(min-width: 768px)'

/** Decorative only. Homepage mobile designs use a solid background, not this image. */
export function HeroBackgroundImage({ desktopOnly, ...props }: HeroBackgroundImageProps) {
  if (!desktopOnly) return <Image src={asset} alt="" aria-hidden="true" {...props} />

  const { props: optimized } = getImageProps({ src: asset, alt: '', ...props })
  // Native picture art direction avoids downloading a CSS-hidden desktop image.
  // Keep Next's optimized srcset/fill styles; the mobile fallback has no network URL.
  const { srcSet, sizes, ...imageProps } = optimized
  return <>
    {(props.priority || props.preload) && <link rel="preload" as="image" media={desktop}
      imageSrcSet={srcSet} imageSizes={sizes} fetchPriority="high" />}
    <picture>
      <source media={desktop} srcSet={srcSet} sizes={sizes} />
      <img {...imageProps} src={transparent} alt="" aria-hidden="true" />
    </picture>
  </>
}

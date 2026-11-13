# Mobile homepage image loading

All four homepage designs hide the decorative desktop hero image below 768px. Previously Next Image still emitted an unconditional image preload and network fallback. The English page's 1px sizes hint could reduce the selected resolution, but it did not eliminate that unnecessary mobile request; the other homepage languages advertised 100vw.

Use getImageProps to keep Next's optimized responsive URLs and fill styles, with native picture art direction and a data-only mobile fallback. A matching media-qualified preload applies on desktop only. Keep the existing asset, desktop crop, empty alt and aria-hidden semantics. Pages displaying this image on mobile keep normal Next Image rendering.

Two SSR cases verify desktop-only preload/source and the unchanged all-device branch. A native browser journey visits all four homepages at390px, checks the data fallback, no hero request and no horizontal overflow, then switches to1280px and checks the visible optimized image actually loads. Its JSON attachment is retained as a separate CI artifact. The regular SEO/browser gates remain required.

This verifies removal of an unnecessary transfer, not a measured field Core Web Vitals or ranking improvement. No copy, metadata, canonical, commercial term or route changes. An initial local CLI-test failure was an unavailable local IPC socket; after normal network permission was granted the complete suite passed, without changing the tests to avoid it.

Primary implementation reference: https://nextjs.org/docs/app/api-reference/components/image#getimageprops .

export interface ContactChallengeApi {
  render: (container: HTMLElement, options: {
    sitekey: string
    action: string
    callback: (token: string) => void
    'expired-callback': () => void
    'error-callback': () => void
  }) => string
  reset: (widgetId: string) => void
  remove: (widgetId: string) => void
}

declare global {
  interface Window { turnstile?: ContactChallengeApi }
}

export interface ContactChallenge {
  reset: () => void
  dispose: () => void
}

/** One widget belongs to one mounted form; the shared script may outlive it. */
export function mountContactChallenge(
  container: HTMLElement,
  siteKey: string,
  onToken: (token: string | null) => void,
  doc: Document = document,
  browser: Pick<Window, 'turnstile'> = window,
): ContactChallenge {
  let active = true
  let widget: string | null = null
  let api: ContactChallengeApi | undefined
  const update = (token: string | null) => { if (active) onToken(token) }
  const render = () => {
    if (!active || widget !== null || !browser.turnstile) return
    api = browser.turnstile
    try {
      widget = api.render(container, {
        sitekey: siteKey,
        action: 'contact',
        callback: update,
        'expired-callback': () => update(null),
        'error-callback': () => update(null),
      })
    } catch { update(null) }
  }
  const failed = () => update(null)
  let script = doc.getElementById('turnstile-script') as HTMLScriptElement | null
  const needsAppend = !script
  if (!script) {
    script = doc.createElement('script')
    script.id = 'turnstile-script'
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
  }
  script.addEventListener('load', render)
  script.addEventListener('error', failed)
  if (needsAppend) doc.head.appendChild(script)
  render()

  return {
    reset() {
      if (!active) return
      update(null)
      if (widget !== null) {
        try { api?.reset(widget) } catch { update(null) }
      }
    },
    dispose() {
      if (!active) return
      active = false
      script.removeEventListener('load', render)
      script.removeEventListener('error', failed)
      if (widget !== null) {
        try { api?.remove(widget) } catch { /* Detached widgets cannot supply a valid token. */ }
        widget = null
      }
    },
  }
}

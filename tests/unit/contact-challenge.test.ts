import { describe, expect, it, vi } from 'vitest'
import { mountContactChallenge, type ContactChallengeApi } from '@/lib/contact-challenge'

function fixture(ready = true) {
  const script = Object.assign(new EventTarget(), { id: '', src: '', async: false })
  let attached = false
  let options: Parameters<ContactChallengeApi['render']>[1] | undefined
  const api: ContactChallengeApi = {
    render: vi.fn((_container, value) => { options = value; return 'widget-1' }),
    reset: vi.fn(), remove: vi.fn(),
  }
  const browser: { turnstile?: ContactChallengeApi } = { turnstile: ready ? api : undefined }
  const append = vi.fn(() => { attached = true })
  const doc = {
    getElementById: () => attached ? script : null,
    createElement: () => script,
    head: { appendChild: append },
  } as unknown as Document
  const token = vi.fn()
  const mount = () => mountContactChallenge({} as HTMLElement, 'public-site-key', token, doc, browser)
  return { script, api, browser, append, token, mount, options: () => options! }
}

describe('mounted contact challenge ownership', () => {
  it('renders the contact action once when the provider is ready', () => {
    const f = fixture(); f.mount(); f.script.dispatchEvent(new Event('load'))
    expect(f.api.render).toHaveBeenCalledTimes(1)
    expect(f.options()).toMatchObject({ sitekey: 'public-site-key', action: 'contact' })
    expect(f.script.src).toBe('https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit')
  })
  it('reuses a pending script and renders only the new mounted form after navigation', () => {
    const f = fixture(false); const old = f.mount(); old.dispose(); f.mount()
    f.browser.turnstile = f.api; f.script.dispatchEvent(new Event('load'))
    expect(f.append).toHaveBeenCalledTimes(1)
    expect(f.api.render).toHaveBeenCalledTimes(1)
  })
  it('ignores a script load after the last form unmounts', () => {
    const f = fixture(false); f.mount().dispose(); f.browser.turnstile = f.api
    f.script.dispatchEvent(new Event('load')); expect(f.api.render).not.toHaveBeenCalled()
  })
  it('drops expired and failed tokens', () => {
    const f = fixture(); f.mount(); f.options().callback('token'); f.options()['expired-callback'](); f.options()['error-callback']()
    expect(f.token.mock.calls).toEqual([['token'], [null], [null]])
  })
  it('resets failed delivery for a fresh provider token', () => {
    const f = fixture(); const c = f.mount(); f.options().callback('spent'); c.reset()
    expect(f.token).toHaveBeenLastCalledWith(null)
    expect(f.api.reset).toHaveBeenCalledWith('widget-1')
    f.options().callback('fresh'); expect(f.token).toHaveBeenLastCalledWith('fresh')
  })
  it('removes only its widget once and ignores late callbacks and reset', () => {
    const f = fixture(); const c = f.mount(); const callback = f.options().callback
    c.dispose(); c.dispose(); c.reset(); callback('late')
    expect(f.api.remove).toHaveBeenCalledTimes(1)
    expect(f.api.reset).not.toHaveBeenCalled(); expect(f.token).not.toHaveBeenCalled()
  })
  it('mounts a fresh widget when returning from the success screen', () => {
    const f = fixture(); f.mount().dispose(); f.mount()
    expect(f.api.render).toHaveBeenCalledTimes(2); expect(f.append).toHaveBeenCalledTimes(1)
  })
  it('fails closed when rendering or resetting throws', () => {
    const f = fixture(); vi.mocked(f.api.render).mockImplementationOnce(() => { throw new Error('provider') })
    expect(() => f.mount()).not.toThrow(); expect(f.token).toHaveBeenLastCalledWith(null)
    const c = f.mount(); vi.mocked(f.api.reset).mockImplementation(() => { throw new Error('provider') })
    expect(() => c.reset()).not.toThrow(); expect(f.token).toHaveBeenLastCalledWith(null)
  })
})

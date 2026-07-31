"use client";

import { useEffect, useRef } from "react";

type TurnstileApi = {
  render: (
    element: HTMLElement,
    options: Record<string, unknown>
  ) => string;
  remove: (widgetId: string) => void;
};

type TurnstileWindow = Window & {
  turnstile?: TurnstileApi;
};

export function TurnstileField({
  onToken,
}: {
  onToken: (token: string | null) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!siteKey) return;
    const browser = window as TurnstileWindow;

    const render = () => {
      if (
        browser.turnstile &&
        containerRef.current &&
        !widgetIdRef.current
      ) {
        widgetIdRef.current = browser.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          action: "contact",
          callback: (token: string) => onToken(token),
          "expired-callback": () => onToken(null),
          "error-callback": () => onToken(null),
        });
      }
    };

    let script = document.getElementById(
      "turnstile-script"
    ) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.addEventListener("load", render, { once: true });
      document.head.appendChild(script);
    } else if (browser.turnstile) {
      render();
    } else {
      script.addEventListener("load", render, { once: true });
    }

    return () => {
      script?.removeEventListener("load", render);
      if (widgetIdRef.current && browser.turnstile) {
        browser.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = null;
    };
  }, [onToken]);

  if (!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) return null;
  return <div ref={containerRef} className="flex justify-center" />;
}

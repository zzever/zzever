// ==UserScript==
// @name         Anti-anuncios básico
// @namespace    safari.ads
// @version      1.0
// @description  Oculta banners, pop-ups y iframes publicitarios comunes
// @match        *://*/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
  const css = `
    iframe[src*="doubleclick.net"],
    iframe[src*="googlesyndication.com"],
    iframe[src*="googleadservices.com"],
    iframe[src*="adservice.google.com"],
    iframe[src*="adnxs.com"],
    iframe[src*="criteo.com"],
    iframe[src*="taboola.com"],
    iframe[src*="outbrain.com"],
    iframe[src*="smartadserver.com"],
    iframe[src*="pubmatic.com"],
    iframe[src*="rubiconproject.com"],
    iframe[src*="amazon-adsystem.com"],
    iframe[id*="google_ads"],
    iframe[id*="aswift"],
    ins.adsbygoogle,
    div[id^="google_ads"],
    div[id^="div-gpt-ad"],
    div[class*="advert"],
    div[class*="advertisement"],
    div[class*="ad-container"],
    div[class*="ad-wrapper"],
    aside[class*="ad"],
    [id*="banner-ad"],
    [class*="banner-ad"],
    [data-ad],
    [data-ad-slot],
    [aria-label*="Publicidad"],
    [aria-label*="Advertisement"] {
      display: none !important;
      visibility: hidden !important;
      height: 0 !important;
      width: 0 !important;
    }
  `;

  const estilo = document.createElement('style');
  estilo.textContent = css;
  document.documentElement.appendChild(estilo);

  // Elimina pop-ups y overlays que reaparecen
  const limpiar = () => {
    document.querySelectorAll(
      'div[class*="popup"], div[class*="modal"], div[id*="popup"], div[id*="modal"]'
    ).forEach(el => {
      const texto = (el.textContent || '').toLowerCase();
      if (
        texto.includes('publicidad') ||
        texto.includes('advertisement') ||
        texto.includes('ads') ||
        texto.includes('suscríbete')
      ) {
        el.remove();
      }
    });
  };

  new MutationObserver(limpiar).observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  limpiar();
})();

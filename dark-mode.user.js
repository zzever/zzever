// ==UserScript==
// @name         Dark Mode para Safari
// @namespace    darkmode.safari
// @version      1.0
// @description  Fuerza modo oscuro invirtiendo colores
// @match        *://*/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
  const invertir = 'invert(1) hue-rotate(180deg)';

  const css = `
    html {
      background: #fff !important;
      filter: ${invertir} !important;
    }

    img,
    video,
    canvas,
    svg image,
    [style*="background-image"] {
      filter: ${invertir} !important;
    }

    iframe {
      filter: ${invertir} !important;
    }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.documentElement.appendChild(style);
})();

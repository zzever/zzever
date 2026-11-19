// ==UserScript==
// @name         Limpiar enlaces de rastreo
// @match        *://*/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

const u = new URL(location.href);
const limpio = [...u.searchParams.keys()]
  .filter(k => /^(utm_|fbclid|gclid|igshid|si$)/i.test(k));

limpio.forEach(k => u.searchParams.delete(k));

if (limpio.length) {
  u.search = u.searchParams.toString();
  location.replace(u.href);
}

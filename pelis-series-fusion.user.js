// ==UserScript==
// @name         Pelis y series → Fusion
// @namespace    fusion.ios
// @version      1.0
// @description  Busca el título en Fusion desde IMDb, FilmAffinity y plataformas
// @match        *://*.imdb.com/title/*
// @match        *://*.filmaffinity.com/*/film*.html
// @match        *://*.netflix.com/*/watch/*
// @match        *://*.primevideo.com/detail/*
// @match        *://*.disneyplus.com/*/video/*
// @match        *://*.max.com/*/watch/*
// @match        *://*.filmin.es/pelicula/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
  const limpiar = (t) =>
    (t || '')
      .replace(/\s*[(|].*$/, '')          // quita "(2024)", "| Netflix", etc.
      .replace(/\s*[-–—]\s*(película|serie|official trailer).*$/i, '')
      .replace(/\s+/g, ' ')
      .trim();

  const titulo = limpiar(
    document.querySelector('h1')?.textContent ||
    document.title
  );

  if (!titulo) return;

  const esquema = 'fusion://search?q=';
  const destino = esquema + encodeURIComponent(titulo);

  window.location.replace(destino);
})();

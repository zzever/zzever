// ==UserScript==
// @name         TMDB → frameXTV Player
// @namespace    https://tampermonkey.net/
// @version      1.0.0
// @description  Inserta un reproductor frameXTV en páginas de películas y series de TMDB
// @match        https://www.themoviedb.org/movie/*
// @match        https://www.themoviedb.org/tv/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  const BUTTON_ID = 'framextv-open-button';
  const MODAL_ID = 'framextv-modal';
  const STYLE_ID = 'framextv-style';

  function getTmdbInfo() {
    const path = location.pathname;

    // Coincide con /movie/12345
    const movieMatch = path.match(/^\/movie\/(\d+)/);
    if (movieMatch) {
      return { type: 'movie', id: movieMatch[1] };
    }

    // Coincide con /tv/12345 o /tv/12345-nombre/seasons etc.
    const tvMatch = path.match(/^\/tv\/(\d+)(?:-[\w-]+)?(?:\/season\/(\d+)(?:\/episode\/(\d+))?)?/);
    if (tvMatch) {
      return {
        type: 'tv',
        id: tvMatch[1],
        season: tvMatch[2] || '1',    // Por defecto temporada 1 si no se especifica
        episode: tvMatch[3] || '1'   // Por defecto episodio 1 si no se especifica
      };
    }

    return null;
  }

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      #${BUTTON_ID} {
        appearance: none;
        border: 1px linear-gradient(135deg, #52525b, #71717a);
        border-radius: 12px;
        padding: 1px 16px;
        color: #fff;
        background: linear-gradient(135deg, #18181b, #27272a);
        font: 700 14px/1 system-ui, sans-serif;
        cursor: pointer;
        box-shadow: 0 8px 22px rgba(37,99,235,.28);
        transition: transform .18s ease, filter .18s ease;
        display: inline-flex;
        align-items: center;
        gap: 12px;
      }

      #${BUTTON_ID}:hover {
        transform: translateY(-2px);
        filter: brightness(1.32);
      }

      #${MODAL_ID} {
        position: fixed;
        z-index: 2147483647;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        background: rgba(0,0,0,.82);
        backdrop-filter: blur(8px);
      }

      #${MODAL_ID} .framextv-dialog {
        position: relative;
        width: min(1200px, 100%);
        aspect-ratio: 16 / 9;
        overflow: hidden;
        border-radius: 16px;
        background: #000;
        box-shadow: 0 24px 80px rgba(0,0,0,.65);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      #${MODAL_ID} iframe {
        display: block;
        width: 100%;
        height: 100%;
        border: 0;
      }

      #${MODAL_ID} .framextv-close {
        position: absolute;
        z-index: 10;
        top: 12px;
        right: 12px;
        width: 40px;
        height: 40px;
        border: 0;
        border-radius: 50%;
        color: #fff;
        background: rgba(0,0,0,.7);
        font-size: 28px;
        line-height: 1;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s;
      }

      #${MODAL_ID} .framextv-close:hover {
        background: rgba(255, 0, 0, 0.7);
      }
    `;

    document.head.appendChild(style);
  }

  function closePlayer() {
    document.getElementById(MODAL_ID)?.remove();
  }

  function openPlayer(info) {
    closePlayer();

    let embedUrl = `https://framextv.xyz/embed/${info.id}`;
    if (info.type === 'tv' && info.season && info.episode) {
      embedUrl = `https://framextv.xyz/embed/${info.id}/${info.season}/${info.episode}`;
    }

    const modal = document.createElement('div');
    modal.id = MODAL_ID;

    modal.innerHTML = `
      <div class="framextv-dialog" role="dialog" aria-modal="true" aria-label="Reproductor frameXTV">
        <button class="framextv-close" type="button" aria-label="Cerrar">×</button>
        <iframe
          src="${embedUrl}"
          allowfullscreen
          allow="autoplay; encrypted-media">
        </iframe>
      </div>
    `;

    modal.addEventListener('click', (event) => {
      if (event.target === modal) closePlayer();
    });

    modal.querySelector('.framextv-close').addEventListener('click', closePlayer);

    document.body.appendChild(modal);
  }

  function addButton() {
    if (document.getElementById(BUTTON_ID)) return;

    const info = getTmdbInfo();
    if (!info) return;

    const target =
      document.querySelector('.header_poster_wrapper') ||
      document.querySelector('.title') ||
      document.querySelector('h2') ||
      document.querySelector('h1');

    if (!target) return;

    const button = document.createElement('button');
    button.id = BUTTON_ID;
    button.type = 'button';
    button.textContent = info.type === 'tv' ? '▶ Ver stream' : '▶ Ver stream';
    button.addEventListener('click', () => {
      // Re-evaluar en el momento del click para capturar posibles cambios de temporada/episodio en la SPA
      const currentInfo = getTmdbInfo();
      openPlayer(currentInfo || info);
    });

    target.insertAdjacentElement('afterend', button);
  }

  function init() {
    injectStyle();
    addButton();

    // Observador para páginas de tipo SPA (Single Page Application) como TMDB
    let lastUrl = location.href;
    new MutationObserver(() => {
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        // Si cambia la URL, eliminamos el botón antiguo para que se regenere con los datos correctos
        document.getElementById(BUTTON_ID)?.remove();
      }
      addButton();
    }).observe(document.documentElement, {
      childList: true,
      subtree: true
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closePlayer();
    });
  }

  init();
})();

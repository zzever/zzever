// ==UserScript==
// @name         TMDB → VidCore Player
// @namespace    https://tampermonkey.net/
// @version      1.0.0
// @description  Inserta un reproductor VidCore en páginas de películas de TMDB
// @match        https://www.themoviedb.org/movie/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  const BUTTON_ID = 'vidcore-open-button';
  const MODAL_ID = 'vidcore-modal';
  const STYLE_ID = 'vidcore-style';

  function getTmdbMovieId() {
    const match = location.pathname.match(/^\/movie\/(\d+)/);
    return match ? match[1] : null;
  }

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      #${BUTTON_ID} {
        appearance: none;
        border: 1px solid rgba(255,255,255,.32);
        border-radius: 12px;
        padding: 11px 16px;
        color: #fff;
        background: linear-gradient(135deg, #6d28d9, #2563eb);
        font: 700 14px/1 system-ui, sans-serif;
        cursor: pointer;
        box-shadow: 0 8px 22px rgba(37,99,235,.28);
        transition: transform .18s ease, filter .18s ease;
      }

      #${BUTTON_ID}:hover {
        transform: translateY(-2px);
        filter: brightness(1.12);
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

      #${MODAL_ID} .vidcore-dialog {
        position: relative;
        width: min(1200px, 100%);
        aspect-ratio: 16 / 9;
        overflow: hidden;
        border-radius: 16px;
        background: #000;
        box-shadow: 0 24px 80px rgba(0,0,0,.65);
      }

      #${MODAL_ID} iframe {
        display: block;
        width: 100%;
        height: 100%;
        border: 0;
      }

      #${MODAL_ID} .vidcore-close {
        position: absolute;
        z-index: 1;
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
      }
    `;

    document.head.appendChild(style);
  }

  function closePlayer() {
    document.getElementById(MODAL_ID)?.remove();
  }

  function openPlayer(tmdbId) {
    closePlayer();

    const modal = document.createElement('div');
    modal.id = MODAL_ID;

    modal.innerHTML = `
      <div class="vidcore-dialog" role="dialog" aria-modal="true" aria-label="Reproductor">
        <button class="vidcore-close" type="button" aria-label="Cerrar">×</button>
        <iframe
          src="https://vidcore.org/embed/movie/${encodeURIComponent(tmdbId)}"
          width="100%"
          height="100%"
          frameborder="0"
          allowfullscreen
          allow="autoplay; encrypted-media">
        </iframe>
      </div>
    `;

    modal.addEventListener('click', (event) => {
      if (event.target === modal) closePlayer();
    });

    modal.querySelector('.vidcore-close').addEventListener('click', closePlayer);

    document.body.appendChild(modal);
  }

  function addButton() {
    if (document.getElementById(BUTTON_ID)) return;

    const tmdbId = getTmdbMovieId();
    if (!tmdbId) return;

    const target =
      document.querySelector('.header_poster_wrapper') ||
      document.querySelector('.title') ||
      document.querySelector('h2') ||
      document.querySelector('h1');

    if (!target) return;

    const button = document.createElement('button');
    button.id = BUTTON_ID;
    button.type = 'button';
    button.textContent = '▶ Abrir VidCore';
    button.addEventListener('click', () => openPlayer(tmdbId));

    target.insertAdjacentElement('afterend', button);
  }

  function init() {
    injectStyle();
    addButton();

    new MutationObserver(() => addButton()).observe(document.documentElement, {
      childList: true,
      subtree: true
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closePlayer();
    });
  }

  init();
})();

// ==UserScript==
// @name         YouTube → TubePiP
// @match        *://youtube.com/*
// @match        *://*.youtube.com/*
// @match        *://youtu.be/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

window.location.replace(
  'tubepip://' + location.href.replace(/^https?:\/\//, '')
);

// ==UserScript==
// @name         Wikipedia escritorio
// @match        *://*.m.wikipedia.org/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

location.replace(location.href.replace('.m.wikipedia.org', '.wikipedia.org'));

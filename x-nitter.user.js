// ==UserScript==
// @name         X → Nitter
// @match        *://x.com/*
// @match        *://twitter.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

location.replace('https://nitter.net' + location.pathname + location.search);

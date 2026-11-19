// ==UserScript==
// @name         Google Maps → Apple Maps
// @match        *://*.google.com/maps/*
// @match        *://maps.google.com/*
// @match        *://maps.app.goo.gl/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

location.replace('maps://' + location.href.replace(/^https?:\/\//, ''));

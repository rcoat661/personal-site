'use strict';

//This particular flavor also includes a tiny Promise shim for cross-browser compatibility
import FontFaceObserver from 'fontfaceobserver/fontfaceobserver.js';
let html = document.documentElement;

const proxiLight = new FontFaceObserver('proxima-nova', {
  weight: 400
});

const proxiRegular = new FontFaceObserver('proxima-nova', {
  weight: 400
});
const proxiBold = new FontFaceObserver('proxima-nova', {
  weight: 700
});
html.classList.add('fonts-loading');

/* Should reference any and all custom Font Families being used in our so we
 * don't hide any text during the intial page load.
 */
Promise.all([
  proxiLight.load(),
  proxiRegular.load(),
  proxiBold.load(),
]).then(() => {
  html.classList.remove('fonts-loading');
  html.classList.add('fonts-loaded');
  sessionStorage.fontsLoaded = true;

// Timeout fallback if something fails with the promises.
}, () => {
  html.classList.remove('fonts-loading');
  html.classList.add('fonts-failed');
});

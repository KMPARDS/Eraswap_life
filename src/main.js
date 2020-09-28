import App from './App.svelte';
import './ethers/instances';

const app = new App({
  target: document.body,
});

window.app = app;

// one app login
// window.onload = function(){
//   // !window.opener || window.opener.postMessage("loaded","*");
//
//   document.getElementById('start-loader').style.display = 'none';
//
// }

export default app;

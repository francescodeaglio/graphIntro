import logo from '../assets/distill-logo.svg';

export const footerTemplate = `
<style>

:host {
  color: rgba(255, 255, 255, 0.5);
  font-weight: 300;
  padding: 2rem 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background-color: hsl(0,98%,32%); /*hsl(200, 60%, 15%);*/
  text-align: left;
  contain: content;
}

.footer-container .logo svg {
  width: 24px;
  position: relative;
  top: 4px;
  margin-right: 2px;
}

.footer-container .logo svg path {
  fill: none;
  stroke: rgba(255, 255, 255, 0.8);
  stroke-width: 3px;
}

.footer-container .logo {
  font-size: 17px;
  font-weight: 200;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin-right: 6px;
}

.footer-container {
  grid-column: text;
}

.footer-container .nav {
  font-size: 0.9em;
  margin-top: 1.5em;
}

.footer-container .nav a {
  color: rgba(255, 255, 255, 0.8);
  margin-right: 6px;
  text-decoration: none;
}

</style>

<div class='footer-container'>

  This page is based on the amazing
  <a href="/" class="logo">
    ${logo}
    Distill
  </a> template. You can find it <a href="https://distill.pub/about/">here</a>

  <div class="nav">
  </div>

</div>

`;

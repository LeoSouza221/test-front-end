const headerTemplate = document.createElement('template');

headerTemplate.innerHTML = `
  <style>
    button {
      border: 1px solid #1867c0;
      border-radius: 0.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 36px;
      font-weight: 500;
      color: #333;
      background-color: #1867c0;
      padding: 0 1rem;
      cursor: pointer;
      text-transform: uppercase;
      text-decoration: none;
      text-indent: 0.09;
      letter-spacing: 0.09em;
      font-size: .875rem;
      transition: color 0.5s ease;
    }

    nav {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color:  #1867c0;
    }

    ul {
      padding: 0;
    }
    
    ul li {
      list-style: none;
      display: inline;
    }
    
    a {
      font-weight: 700;
      margin: 0 25px;
      color: #fff;
      text-decoration: none;
      transition: box-shadow 0.2s, padding-bottom 0.2s ease-in
    }
    
    a:hover {
      padding-bottom: 5px;
      box-shadow: inset 0 -2px 0 0 #fff;
    }

    #menu-desktop {
      display: flex; 
    }
    #menu-mobile {
      display: none; 
      position: relative;
    }

    @media (max-width: 768px) {
      ul li {
        width: 100%;
        padding: 4px 0;
      }

      a {
        width: 100%;
        display: block;
        font-size: 1rem;
        font-weight: normal;
        color: rgba(0,0,0,.87);
      }

      a:hover {
        box-shadow: none;
        padding-bottom: 0;
      }

      #menu-desktop {
        display: none; 
      }

      #menu-mobile {
        display: flex; 
        justify-content: end; c
      }

      #floating-menu {
        display: none;
        position: absolute;
        bottom: -180px;
        right: 12px;
        width: 180px;
        height: 165px;
        background-color: #fff;
        padding: 0.75rem;
        box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12);
        border-radius: 4px;
        z-index: 1;
      }

      .floating-menu-visible {
        display: block !important;
      }

      .menu-item {
        padding: 0.75rem;
      }

      .menu-item a {
        margin: 0;
      }

      .box-button {
        padding: 0.75rem;
      }
    }

  </style>

  <header>
    <nav id="menu-desktop">
      <ul>
        <li><a href="/pages/button-increase">Button</a></li>
        <li><a href="/pages/responsive-layout">Responsive Layout</a></li>
        <li><a href="/pages/api-request">Api Request</a></li>
        <li><a href="/pages/form">Form</a></li>
      </ul>
    </nav>
    <nav id="menu-mobile">
      <div class="box-button">
        <button onclick="changeMenuState()">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 28 24">
            <path fill="white" d="M2.61 0h22.431a2.61 2.61 0 1 1 0 5.22H2.61a2.61 2.61 0 1 1 0-5.22zm0 9.39h22.431a2.61 2.61 0 1 1 0 5.22H2.61a2.61 2.61 0 1 1 0-5.22zm0 9.391h22.431a2.61 2.61 0 1 1 0 5.22H2.61a2.61 2.61 0 1 1 0-5.22z"/>
          </svg>
        </button>
      </div>
      <div id="floating-menu">
        <div class="menu-item">
          <a href="/pages/button-increase">Button</a>
        </div>
        <div class="menu-item">
          <a href="/pages/responsive-layout">Responsive Layout</a>
        </div>
        <div class="menu-item">
          <a href="/pages/api-request">Api Request</a>
        </div>
        <div class="menu-item">
          <a href="/pages/form">Form</a>
        </div>
        </ul>
      </div>
    </nav>
  </header>
`;

class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });

    shadowRoot.appendChild(headerTemplate.content);
  }
}

customElements.define('header-component', Header);
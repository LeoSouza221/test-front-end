const headerTemplate = document.createElement('template');

headerTemplate.innerHTML = `
  <style>
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
  </style>
  <header>
    <nav>
      <ul>
        <li><a href="/pages/button-increase.html">Button</a></li>
        <li><a href="/pages/responsive-layout.html">Responsive Layout</a></li>
        <li><a href="/pages/api-request.html">Api Request</a></li>
        <li><a href="/pages/form.html">Form</a></li>
      </ul>
    </nav>
  </header>
`;

class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'closed' });

    shadowRoot.appendChild(headerTemplate.content);
  }
}

customElements.define('header-component', Header);
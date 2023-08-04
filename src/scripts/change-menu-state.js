let isMenuOpen = false


function changeMenuState() {
  const menu = document.querySelector("header-component").shadowRoot.getElementById('floating-menu')

  if (isMenuOpen) {
    menu.classList.remove("floating-menu-visible")
    isMenuOpen = false
  } else {
    menu.classList.add('floating-menu-visible')
    isMenuOpen = true
  }
} 
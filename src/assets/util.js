export default class Util {
  // Mark link as active 
  static updateActiveLink() {
    const links = document.querySelectorAll(`[href]`)
    if (links) links.forEach(link => link.getAttribute('href') === window.location.pathname ? link.classList.add('active') : link.classList.remove('active'))
  }
}

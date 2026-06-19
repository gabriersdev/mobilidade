export function updateActiveLink() {
  const links = document.querySelectorAll(`[href]`)
  if (links) links.forEach(link => link.getAttribute('href') === window.location.pathname ? link.classList.add('active') : link.classList.remove('active'))
}

export function isSameDomain(url) {
  if (url.startsWith('/')) return true;
  
  try {
    const currentOrigin = new URL(window.location.href).origin;
    const linkOrigin = new URL(url).origin;
    return currentOrigin === linkOrigin;
  } catch (error) {
    console.log('Um erro ocorreu: %s', error.message)
    return false;
  }
}

export function clearServiceWorker() {
  if ('serviceWorker' in navigator) {
    caches.keys().then(function (names) {
      for (let name of names) caches.delete(name).then();
    });
  }
}

export function getSearchParamId(location) {
  if (!location || !location.search) return null;
  const searchParams = new URLSearchParams(location.search);
  
  const ei = searchParams.get("ei");
  if (ei) {
    const match = ei.match(/\d+/g);
    if (match) return +match.join("");
  }
  
  const sei = searchParams.get("sei");
  if (sei) {
    const match = sei.match(/\d+/g);
    if (match) return `${match.join("")}S`;
  }
  
  return null;
}

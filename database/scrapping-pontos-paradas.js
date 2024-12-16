// Para MVT
JSON.stringify(Array.from(document.querySelectorAll('.stop-wrapper h3')).map((e) => e.outerText.trim()).map((point) => {
  let [address, name] = point.split(' | ');
  return { address, name };
}))

// Para MVT via aplicação
JSON.stringify(Array.from(document.querySelectorAll('.stop-item div.title')).map((e) => e.outerText.trim()).map((point) => {
  let [address, name] = point.split(' | ');
  return { address, name };
}))

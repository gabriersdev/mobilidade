// Ignore this
const data = {};
const keys = Object.keys(data);
const setCachesList = () => {};
// End of ignore code

// Content
if (keys.length === 0) {
  const mockKeys = [
    "mobilidade-app-V43",
    "dynamic-mobilidade-app-V43",
    "imagens-em-cache-v1",
    "api-responses-v2",
    "offline-pages-v1"
  ];
  setCachesList(mockKeys);

  data["mobilidade-app-V43"] = [
    window.location.origin + "/index.html",
    window.location.origin + "/css/app.css",
    window.location.origin + "/css/bootstrap-cerulean.css"
  ];
  data["dynamic-mobilidade-app-V43"] = [
    window.location.origin + "/assets/logo.png",
    window.location.origin + "/assets/icon.png"
  ];
  data["imagens-em-cache-v1"] = [
    window.location.origin + "/img/photo1.jpg",
    window.location.origin + "/img/photo2.jpg",
    window.location.origin + "/img/photo3.jpg",
    window.location.origin + "/img/photo4.jpg",
    window.location.origin + "/img/photo5.jpg",
  ];
  data["api-responses-v2"] = [
    "https://api.mobilidade.com.br/linhas",
    "https://api.mobilidade.com.br/horarios"
  ];
  data["offline-pages-v1"] = [
    window.location.origin + "/offline.html"
  ];
}

const reportMail = "devgabrielribeiro@gmail.com";
const contactLotus = "https://lts.app.br";
const currentTableFares = "https://github.com/gabriersdev/mobilidade/blob/main/public/docs/doc-aumento-metropolitano-2026.pdf";
const linesWithManualIntegration = [
  4991,
  4992
];

const navLinks = [
  {name: "Início", path: "./"},
  {name: "Linhas", path: "./lines"},
  {name: "Pesquisa", path: "./search", mobileOnly: true},
  {name: "Notícias", path: "./news"},
  {name: "Guia", path: "./guide"},
  {name: "Ao vivo", path: "./live", isLive: true},
  {name: "Cidade de Sabará", path: "./sabara", mobileOnly: true, showOnlyFooter: true},
  {name: "Companhias", path: "./company", mobileOnly: true, showOnlyFooter: true},
];

const footerLinks = [
  {name: "Desenvolvimento", path: "/development#topo"},
  {name: "Termos de serviços", path: "/terms-of-service#topo"},
  {name: "Privacidade", path: "/privacy#topo"},
  {name: "Manifesto", path: "/manifest#topo"},
]

const dateConfigs = {
  locale: "America/Sao_Paulo",
  lang: "pt-BR",
  UTC: -3,
  UTC2: -180,
  timeFormat: "HH:mm",
  timeFormatFriendly: "HH[h]mm"
}

const numberConfigs = {
  lang: "pt-BR"
}

const quickSearchLinks = [
  "Rodoviária de Sabará",
  "Terminal São Gabriel",
  "Estação José Cândido da Silveira",
  "Estação São Gabriel",
  "Rua dos Caetés",
  "Andradas",
  "Rodoviária de Belo Horizonte",
]

const labelMap = {
  "lines": "Linhas",
  "search": "Pesquisa",
  "terms-of-service": "Termos de Serviço",
  "privacy": "Privacidade",
  "company": "Companhia",
  "development": "Desenvolvimento",
  "news": "Notícias",
  "history": "Histórico",
  "guide": "Guia",
  "live": "Ao vivo",
  "sabara": "Sabará",
  "manifest": "Manifesto",
}

export {
  reportMail,
  contactLotus,
  currentTableFares,
  linesWithManualIntegration,
  navLinks,
  footerLinks,
  dateConfigs,
  numberConfigs,
  quickSearchLinks,
  labelMap
}

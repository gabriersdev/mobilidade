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
];

const footerLinks = [
  {name: "Desenvolvimento", path: "/development#topo"},
  {name: "Termos de serviços", path: "/terms-of-service#topo"},
  {name: "Privacidade", path: "/privacy#topo"},
  {name: "Manifesto", path: "/manifest#topo"},
]

export {
  reportMail,
  contactLotus,
  currentTableFares,
  linesWithManualIntegration,
  navLinks,
  footerLinks
}

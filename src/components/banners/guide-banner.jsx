import Banner from "../templates/banner/banner.jsx";

function GuideBanner() {
  return (
    <Banner data={{
      link: "/guide",
      bg: "bg-warning-subtle",
      border: "border-warning-subtle",
      bgBadge: "bg-warning",
      colorTextBadge: "text-light",
      colorEmphasis: "text-warning-emphasis",
      textBadge: "Confira",
      title: "Guia de Transporte Público",
      text: "Organizados por locais e pontos de parada, o guia ajuda te ajuda a verificar quais linhas param em determinado lugar atendidos pelas linhas da cidade."
    }}
    />
  )
}

export default GuideBanner;

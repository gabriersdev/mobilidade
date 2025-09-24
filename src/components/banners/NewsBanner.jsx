import Banner from "../../templates/banner/Banner.jsx";

function NewsBanner() {
  return (
    <Banner data={{
      link: "/news",
      bg: "bg-primary-subtle",
      border: "border-primary-subtle",
      bgBadge: "bg-primary",
      colorEmphasis: "text-primary-emphasis",
      textBadge: "Leia",
      title: "Notícias do Transporte Público",
      text: "Trazemos atualizações das linhas que monitoramos, mudanças de itinerário e eventos na cidade."
    }}
    />
  )
}

export default NewsBanner;

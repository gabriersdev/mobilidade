import Banner from "../../templates/banner/Banner.jsx";

function LiveBanner() {
  return (
    <Banner data={{
      link: "/live",
      bg: "bg-secondary-subtle",
      border: "border-secondary-subtle",
      bgBadge: "bg-secondary",
      colorEmphasis: "text-secondary-emphasis",
      textBadge: "Novidade",
      title: "Acompanhe ao vivo o seu ônibus!",
      text: "Usando previsões matemáticas e aprendizado de máquina, você obtém uma estimativa de chegada do seu ônibus a partir de um ponto de parada."
    }}
    />
  )
}

export default LiveBanner;

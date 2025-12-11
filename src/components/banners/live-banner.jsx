import Banner from "../templates/banner/banner.jsx";

function LiveBanner() {
  return (
    <Banner data={{
      link: "/live",
      bg: "bg-success-subtle",
      border: "",
      bgBadge: "bg-success",
      colorTextBadge: "text-white",
      colorEmphasis: "text-success-emphasis",
      textBadge: "Novidade",
      title: "Acompanhe ao vivo o seu ônibus!",
      text: "Usando previsões matemáticas e aprendizado de máquina, você obtém uma estimativa de chegada do seu ônibus a partir de um ponto de parada."
    }}
    />
  )
}

export default LiveBanner;

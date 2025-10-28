import Banner from "../../templates/banner/Banner.jsx";
import moment from 'moment';
import 'moment/locale/pt-br';
import {useRef} from "react";

moment.locale('pt-br');

function LiveBanner() {
  const now = useRef(moment());
  if (now.current.diff(moment("2025-11-14T23:59:59"), "seconds") > 0) return null;
  
  return (
    <Banner data={{
      link: "/live",
      bg: "bg-secondary-subtle",
      border: "",
      bgBadge: "bg-secondary",
      colorTextBadge: "text-dark",
      colorEmphasis: "text-secondary-emphasis",
      textBadge: "Novidade",
      title: "Acompanhe ao vivo o seu ônibus!",
      text: "Usando previsões matemáticas e aprendizado de máquina, você obtém uma estimativa de chegada do seu ônibus a partir de um ponto de parada."
    }}
    />
  )
}

export default LiveBanner;

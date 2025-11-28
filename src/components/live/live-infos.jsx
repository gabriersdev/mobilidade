import {Spinner} from "react-bootstrap";

import Alert from "../ui/alert/alert.jsx";
import AnimatedComponents from "../ui/animated-component/animated-components.jsx";

export function LoadingDeparturePoints() {
  return (
    <AnimatedComponents>
      <div className={"d-flex flex-wrap gap-2 align-items-center mt-3"}>
        <Spinner animation="grow" size={"sm"} variant={"primary"}/>
        <span>Carregando os pontos de parada...</span>
      </div>
    </AnimatedComponents>
  )
}

export function LiveGeneralError() {
  return (
    <Alert variant={"danger"}>
      Algo não saiu como deveria... Tente novamente.
    </Alert>
  )
}

export function AnyBusProximityError() {
  return (
    <Alert variant={"warning"}>
      Nenhum ônibus por perto...
    </Alert>
  )
}

export function SelectOneDeparturePoint() {
  return (
    <Alert variant={"warning"}>
      Defina um ponto de parada para acompanhar a aproximação de ônibus.
    </Alert>
  )
}

export function AlertInfoFeature() {
  return (
    <div className={"d-flex gap-3 mt-3 flex-column"}>
      <Alert variant={"info"} dismissible={true} margin={"m-0"}>
        Os resultados da pesquisa são atualizados a cada 30 segundos.
      </Alert>
    </div>
  )
}

export function AlertInfoConfigSomeDepartureStart() {
  return (
    <div className={"d-flex gap-3 mb-3 flex-column"}>
      <Alert variant={"warning"} dismissible={true} margin={"m-0"}>
        <div className={"d-flex flex-column gap-1"}>
          <p className={"m-0"}>A UI está configurada para exibir apenas horários de partida.</p>
          <p className={"m-0 text-sml"}>Você pode alterar isso nas configurações.</p>
        </div>
      </Alert>
    </div>
  )
}

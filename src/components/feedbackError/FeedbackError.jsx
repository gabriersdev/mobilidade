import PropTypes from "prop-types";
import {Alert} from "../alert/Alert";

const FeedbackError = ({code, text}) => {
  if (text.toLowerCase().trim() === 'network error') {
    return (
      <Alert variant={'danger'} margin={"mt-0"}>
        <span>Erro de conexão com a rede. Verifique se você está conectado à internet e tente novamente</span>
      </Alert>
    )
  } else if (code === 404) {
    return (
      <Alert variant={'danger'} margin={"mt-0"}>
        <span>Recurso não encontrado.</span>
      </Alert>
    )
  } else if (code === 500) {
    return (
      <Alert variant={'danger'} margin={"mt-0"}>
        <span>Erro interno do servidor. Tente novamente mais tarde.</span>
      </Alert>
    )
  } else if (code === 401) {
    return (
      <Alert variant={'danger'} margin={"mt-0"}>
        <span>Você não tem permissão para acessar este recurso.</span>
      </Alert>
    )
  } else {
    return (
      <Alert variant={'danger'} margin={"mt-0"}>
        <span>Erro {code || 'não mapeado'}. Contate o administrador ou tente novamente mais tarde.</span>
      </Alert>
    )
  }
}

FeedbackError.propTypes = {
  code: PropTypes.number.isRequired,
  text: PropTypes.string
}

export default FeedbackError;

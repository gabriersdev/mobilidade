import PropTypes from "prop-types";

import Alert from "../alert/Alert";
import Grid from "../grid/Grid";
import Card from "../card/Card";

// TODO - ideal seria ser apenas feedback e retornar os itens para outros tipos de alertas também
const FeedbackError = ({code, text, type}) => {
  const lowerCaseText = text ? text.toLowerCase().trim() : ''; // Lida com casos onde 'text' pode ser undefined/null

  if (lowerCaseText === 'network error' && !type) {
    return <Alert variant="danger" margin="mt-0">Erro de conexão com a rede. Verifique se você está conectado à
      internet e tente novamente</Alert>;
  } else if (lowerCaseText === 'network error' && type === 'card') {
    return (
      <Grid>
        <Card title="Erro de conexão" subtitle="Verifique sua internet ou contate o administrador">
          Não foi possível estabelecer conexão com o servidor. Pode ser um erro interno ou que você está sem internet.
        </Card>
      </Grid>
    );
  } else if (code === 404) {
    return <Alert variant="danger" margin="mt-0">Recurso não encontrado.</Alert>;
  } else if (code === 500) {
    return <Alert variant="danger" margin="mt-0">Erro interno do servidor. Tente novamente mais tarde.</Alert>;
  } else if (code === 401) {
    return <Alert variant="danger" margin="mt-0">Você não tem permissão para acessar este recurso.</Alert>;
  } else {
    return <Alert variant="danger" margin="mt-0">Erro {code || 'não mapeado'}. Contate o administrador ou tente
      novamente mais tarde.</Alert>;
  }
};

FeedbackError.propTypes = {
  code: PropTypes.number, // Torna o código opcional, já que o texto pode ser suficiente em alguns casos
  text: PropTypes.string,
  type: PropTypes.string,
};

export default FeedbackError;

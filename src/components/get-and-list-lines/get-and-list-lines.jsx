import PropTypes from "prop-types";
import Grid from "../ui/grid/grid.jsx";
import Card from "../ui/card/card.jsx";
import ListLines from "../line/list-lines.jsx";
import useLines from "../../hooks/useLines.js";

const GetAndListLines = ({ variant, content }) => {
  const { data: fetchedData, error, loading } = useLines(variant);
  const data = content || fetchedData;

  if (loading && !content) {
    return (
      <div style={{ marginTop: '1rem' }}>
        <Grid>
          <Card title="Carregando" subtitle="Aguarde...">
            Estamos conectando ao banco de dados. Esse processo geralmente é rápido. Por favor, aguarde alguns instantes.
          </Card>
          {Array.from({ length: 9 }, (_, i) => i).map((_, key) => (
            <Card key={key} variant={"placeholder"}></Card>
          ))}
        </Grid>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ marginTop: '1rem' }}>
        <Grid>
          <Card title="Erro" subtitle="Não foi possível carregar as linhas">
            Houve um erro ao carregar as linhas. Por favor, tente novamente mais tarde.
          </Card>
        </Grid>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div style={{ marginTop: '1rem' }}>
        <Grid>
          <Card title="Nenhuma linha encontrada" subtitle="Não há linhas cadastradas">
            Não encontramos nenhuma linha cadastrada. Por favor, tente novamente mais tarde.
          </Card>
        </Grid>
      </div>
    );
  }

  const sortFn = (a, b) => (variant === 'main' ? a.line_name.localeCompare(b.line_name) : a.line_number - b.line_number);
  const sortedData = [...data].sort(sortFn);
  
  const shuffleArray = (array) => {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  return <ListLines data={shuffleArray(sortedData)} variant={variant} />;
};

GetAndListLines.propTypes = {
  variant: PropTypes.string,
  content: PropTypes.array,
};

export default GetAndListLines;

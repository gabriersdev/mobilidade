import Title from '../ui/title/title.jsx';
import GetAndListLines from '../get-and-list-lines/get-and-list-lines.jsx';

const SimilarLinesSection = () => (
  <section id="linhas-similares" className="pt-3">
    <Title type="h3" classX="text-body-secondary">Linhas similares</Title>
    <GetAndListLines variant="similar-lines"/>
  </section>
);

export default SimilarLinesSection;

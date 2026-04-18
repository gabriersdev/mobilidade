import Title from '../ui/title/title.jsx';
import GetAndListLines from '../get-and-list-lines/get-and-list-lines.jsx';
import SeeMore from "@/components/ui/see-more/see-more.jsx";

const SimilarLinesSection = () => (
  <section id="linhas-similares" className="pt-3">
    <SeeMore mobileOnly={true}>
      <Title type="h3" classX="text-body-secondary">Linhas similares</Title>
      <GetAndListLines variant="similar-lines"/>
    </SeeMore>
  </section>
);

export default SimilarLinesSection;

import Title from "@/components/ui/title/title";
import {metropolitanLines, municipalLines} from "@/assets/line-changes-content";

const LineChanges = () => (
  <section id="line-changes" className="content-text">
    <Title type="h2" classX="text-primary-emphasis">Ampliação, Reativação, Alteração de Itinerário e Criação de Linhas</Title>
    
    <Title type="h3" classX="text-primary-emphasis opacity-75">Linhas Metropolitanas e Intermunicipais</Title>
    <ul className="list-group mb-5">
      {metropolitanLines.map((item, index) => (
        <li key={index} className="list-group-item text-balance py-3 text-body">
          {item}
        </li>
      ))}
    </ul>
    
    <Title type="h3" classX="text-primary-emphasis opacity-75">Linhas Municipais</Title>
    <ul className="list-group">
      {municipalLines.map((item, index) => (
        <li key={index} className="list-group-item text-balance py-3 text-body">
          {item}
        </li>
      ))}
    </ul>
  </section>
);

export default LineChanges;

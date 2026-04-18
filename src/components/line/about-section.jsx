import {useCallback} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import moment from 'moment';
import Util from '../../assets/Util.jsx';
import Title from '../ui/title/title.jsx';
import Grid from '../ui/grid/grid.jsx';
import LiveBanner from '../banners/live-banner.jsx';
import GuideBanner from '../banners/guide-banner.jsx';
import NewsBanner from '../banners/news-banner.jsx';
import SeeMore from "@/components/ui/see-more/see-more.jsx";
import {numberConfigs} from "@/assets/resources.js";

const AboutSection = ({line}) => {
  const defaultImage = "/images/banner.png";
  
  const renderText = useCallback((text) => {
    return text.split(/(\/)/).map((part, index) => {
      if (part === "/") return <span key={index} style={{fontSize: 'inherit', fontFamily: "'Arial', sans-serif"}}>/</span>;
      return part;
    });
  }, []);
  
  return (
    <section id="resume" className="pt-3">
      <Title type="h3" classX="text-body-secondary">Sobre esta linha</Title>
      <SeeMore height={225}>
        <div className="mt-3 position-relative">
          <img src={defaultImage} alt={`Imagem de veículo da linha ${line.line_number}. Banner do Mobilidade.`} width="100" height="500px" className="w-100 object-fit-cover rounded-3"/>
          <div className="p-3 position-absolute top-0 w-100 h-100 rounded-3" style={{background: "linear-gradient(to bottom,#00000025 1%, #00000060 75%)", backgroundColor: "#00000015"}}></div>
          <div className="position-absolute bottom-0 mb-4 ms-4 text-balance" style={{maxWidth: "calc(100% - 3rem)"}}>
            <div className="mb-3">
              <h2 className="text-white fs-1 fw-bold">{line.line_number}</h2>
            </div>
            <p className="m-0 text-white">{Util.resumeInfoLine({})}</p>
          </div>
        </div>
        <div className="mt-3 d-flex column-gap-3 row-gap-1 flex-wrap">
          <Link to={`/history/departure-times/${line.line_id}`} className="text-decoration-none">Histórico de horários</Link>
          <span className="text-body-tertiaryd-inline-flex align-items-center justify-content-center"><i style={{fontSize: "2px"}} className="bi bi-circle-fill"></i></span>
          <Link to={`/history/fares/${line.line_id}`} className="text-decoration-none">Histórico de tarifas</Link>
          <span className="text-body-tertiaryd-inline-flex align-items-center justify-content-center"><i style={{fontSize: "2px"}} className="bi bi-circle-fill"></i></span>
          <Link to={`/history/departure-points/${line.line_id}`} className="text-decoration-none">Histórico de pontos de paradas</Link>
        </div>
      </SeeMore>
      
      <div className="mt-5 d-flex flex-column gap-3">
        <Grid className="align-items-stretch overflow-x-scroll">
          <LiveBanner/>
          <GuideBanner/>
          <NewsBanner/>
        </Grid>
      </div>
      <div className="mt-5">
        <p className="mb-0 text-muted">
          <i className="bi bi-eye-fill"></i>{" "}
          <span>
            {(Util
              .greaterThan(line.count_access ?? 10, 10, 10))
              .toLocaleString(numberConfigs.lang)
            } visualizações</span>
        </p>
        <details className="text-muted d-inline-block mb-0">
          <summary className="">
            <div className="mt-1">
              <p className="text-sml line-clamp-1 p-0 m-0">
                Informações carregadas em {renderText(moment().format("DD/MM/YYYY"))} às {moment().format("HH[h]mm[m]")}.
              </p>
            </div>
          </summary>
          <p className="mb-0 text-body-tertiary  text-sml">
            {renderText(moment().format("DD/MM/YYYY HH:mm:ss"))} {"- Horário de Brasília"}
          </p>
        </details>
      </div>
    </section>
  );
};

AboutSection.propTypes = {
  line: PropTypes.object.isRequired,
};

export default AboutSection;

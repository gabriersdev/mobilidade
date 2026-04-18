import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

// TODO - aplicar aqui, tal qual as funções de @live-infos, a verificação se está carregando, se já tem resultado e tal
const BusTimesDisplay = ({busTimes}) => (
  <div className="d-flex gap-1 align-items-center flex-wrap text-sml">
    {busTimes.length > 0 ? (
      busTimes.map((busTime, index) => (
        <React.Fragment key={busTime.id}>
          <div>
            <Link className="text-body text-decoration-none" to={busTime.link}>
              <span>{busTime.label}</span>
            </Link>
          </div>
          {index < busTimes.length - 1 && (
            <span className="fs-inherit text-body-tertiary">|</span>
          )}
        </React.Fragment>
      ))
    ) : (
      <span className="text-muted">Nenhum ônibus por perto</span>
    )}
    
    {/*TODO - usar placeholder para mostrar carregamento enquando não tiver o retorno CONFIRMADO que não tem NADA chegando no ponto*/}
    {
      Array.from({length: 3}, (i) => i + 1).map((_, i) => (
        <div className={"d-flex flex-column placeholder-glow gap-1 mb-1"} key={i}>
          <div className={'placeholder fs-4'} style={{minWidth: 200}}></div>
        </div>
      ))
    }
  </div>
);

BusTimesDisplay.propTypes = {
  busTimes: PropTypes.array.isRequired,
};

export default BusTimesDisplay;

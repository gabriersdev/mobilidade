import LineInfo from "../line-info/line-info.jsx";
import Util from "../../assets/Util.jsx";
import PropTypes from "prop-types";

const LineIdentificationLastUpdate = ({datetimeLastModify}) => {
  return (
    <div className="d-flex align-items-center gap-3 flex-wrap order-2">
      {
        datetimeLastModify && (<div className={"d-flex align-items-center gap-3 flex-wrap"}>
          <LineInfo label={{ref: 'Última atualização', value: ""}}>
            <i className="bi bi-stopwatch"></i>
            <span className={"ms-1"}>Infos. atualizadas {Util.renderText(Util.diffToHuman(datetimeLastModify))}</span>
          </LineInfo>
        </div>)
      }
    </div>
  );
};

LineIdentificationLastUpdate.propTypes = {
  datetimeLastModify: PropTypes.oneOfType([Date, PropTypes.string, PropTypes.instanceOf(Date)])
}

export default LineIdentificationLastUpdate;

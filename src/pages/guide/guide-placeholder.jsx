import {Placeholder} from 'react-bootstrap';
import Util from "@/lib/Util.jsx";

const GuidePlaceholder = () => (
  <div className="row">
    <div className="col-lg-8">
      <Placeholder as="div" animation="glow" className={"w-100"}>
        <Placeholder xs={12} className={"py-5 rounded"}>
          {
            Util.createArray(10).map((_, i) => (
              <div className={"py-5 mt-5"} key={i}></div>
            ))
          }
        </Placeholder>
      </Placeholder>
    </div>
    
    <div className="col-lg-4 mt-3 mt-lg-0">
      <Placeholder as="div" animation="glow">
        <Placeholder xs={12} className={"py-5 rounded"}>
          {
            Util.createArray(3).map((_, i) => (
              <div className={"py-5 mt-5"} key={i}></div>
            ))
          }
        </Placeholder>
      </Placeholder>
    </div>
  </div>
);

export default GuidePlaceholder;

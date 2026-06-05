import {LineContext} from '@/components/line/line-context.jsx';
import AnimatedComponents from '@/components/ui/animated-component/animated-components.jsx';
import LineHeader from '@/components/line/line-header.jsx';
import DepartureTimesSection from '@/components/line/departure-times-section.jsx';
import DeparturePointsSection from '@/components/line/departure-points-section.jsx';
import RenderLiveMap from '@/components/line/render-live-map.jsx';
import RechargePointsSection from '@/components/line/recharge-points-section.jsx';
import SimilarLinesSection from '@/components/line/similar-lines-section.jsx';
import AboutSection from '@/components/line/about-section.jsx';

const LineDetails = ({line, paradasSection, data}) => (
  <AnimatedComponents>
    <div className="d-flex flex-column" style={{gap: '3rem'}}>
      <LineContext line={line}>
        <AnimatedComponents>
          <div className="d-flex flex-column" style={{gap: '3rem'}}>
            <LineHeader line={line}/>
            <DepartureTimesSection line={line}/>
            <DeparturePointsSection line={line} ref={paradasSection}/>
            <RenderLiveMap data={data}/>
            <RechargePointsSection line={line}/>
            <SimilarLinesSection/>
            <AboutSection line={line}/>
          </div>
        </AnimatedComponents>
      </LineContext>
    </div>
  </AnimatedComponents>
);

export default LineDetails;

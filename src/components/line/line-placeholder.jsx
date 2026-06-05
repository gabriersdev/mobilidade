import {Placeholder} from 'react-bootstrap';
import AnimatedComponents from '@/components/ui/animated-component/animated-components.jsx';

const LinePlaceholder = () => (
  <AnimatedComponents>
    <section className="d-flex flex-column gap-4 gap-sm-5">
      <div className="d-flex align-items-start justify-content-between gap-3">
        <Placeholder animation="glow" className="w-50">
          <Placeholder className="rounded w-100 py-4"/>
        </Placeholder>
        <Placeholder animation="glow" className="w-25">
          <Placeholder className="rounded w-100 py-5"/>
        </Placeholder>
      </div>
      <div className="d-flex flex-column gap-2 mt-3 mt-md-5">
        {[...Array(5)].map((_, index) => (
          <div key={index}>
            <Placeholder animation="glow">
              <Placeholder className={`rounded-1 w-${[15, 10, 25, 10, 25][index % 5]} py-3`}/>
            </Placeholder>
            <span> </span>
          </div>
        ))}
      </div>
      {Array.from({length: 5}).map((_, index) => (
        <div className="d-flex flex-column mt-3 mt-md-5" key={index}>
          <div className="d-flex align-items-center justify-content-between gap-3">
            <Placeholder animation="glow" className="w-25">
              <Placeholder className="rounded-1 w-100 py-4"/>
            </Placeholder>
            <Placeholder animation="glow" className="w-10">
              <Placeholder className="rounded-1 w-100 py-3"/>
            </Placeholder>
          </div>
          <Placeholder animation="glow" className="w-100 mt-4">
            <Placeholder className="rounded-1 w-100 py-5">
              <div className="py-5"></div>
              <div className="py-5"></div>
              <div className="py-5"></div>
            </Placeholder>
          </Placeholder>
        </div>
      ))}
    </section>
  </AnimatedComponents>
);

export default LinePlaceholder;

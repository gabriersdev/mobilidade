import PropTypes from 'prop-types';
import Grid from '@/components/ui/grid/grid.jsx';
import Alert from '@/components/ui/alert/alert.jsx';
import Weather from '@/components/weather/weather.jsx';
import LineIdentification from '@/components/line-identification/line-identification.jsx';
import ListLineWarnings from '@/components/list-line-warnings/list-line-warnings.jsx';
import ShowHolidayInfo from '@/components/line-info/show-holiday-info.jsx';
import SeeMore from "@/components/ui/see-more/see-more.jsx";
import LineFloatingInfo from "@/components/line/line-floating-info.jsx";

const LineHeader = ({line}) => (
  <section id="id">
    <LineIdentification/>
    <LineFloatingInfo line={line}/>
    <SeeMore height={225}>
      <Grid className="align-items-stretch mt-5 w-100">
        {line.observations && (
          <Alert variant="secondary" margin="m-0">
            <span>{line.observations}</span>
          </Alert>
        )}
        <Weather/>
        <ListLineWarnings line_id={line.line_id}/>
        <ShowHolidayInfo scope={line.scope}/>
      </Grid>
    </SeeMore>
  </section>
);

LineHeader.propTypes = {
  line: PropTypes.object.isRequired,
};

export default LineHeader;

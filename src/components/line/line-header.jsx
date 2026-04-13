import PropTypes from 'prop-types';
import Grid from '../ui/grid/grid.jsx';
import Alert from '../ui/alert/alert.jsx';
import Weather from '../weather/weather.jsx';
import LineIdentification from '../line-identification/line-identification.jsx';
import ListLineWarnings from '../list-line-warnings/list-line-warnings.jsx';
import ShowHolidayInfo from '../line-info/show-holiday-info.jsx';

const LineHeader = ({line}) => (
  <section id="id">
    <LineIdentification/>
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
  </section>
);

LineHeader.propTypes = {
  line: PropTypes.object.isRequired,
};

export default LineHeader;

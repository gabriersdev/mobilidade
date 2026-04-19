import PropTypes from 'prop-types';
import Title from '../ui/title/title.jsx';
import Util from '../../assets/Util.jsx';
import moment from 'moment';

const NewsHeader = ({title, publishDate, resume}) => (
  <hgroup className="d-flex flex-column gap-1">
    <Title type="h2" classX="text-balance text-body">
      {Util.renderText(title)}
    </Title>
    <p className="text-body-tertiary m-0 p-0">
      Sabará, {Util.renderText(moment(publishDate).format('DD/MM/YY'))} | {Util.renderText(resume)}
    </p>
  </hgroup>
);

NewsHeader.propTypes = {
  title: PropTypes.string.isRequired,
  publishDate: PropTypes.string.isRequired,
  resume: PropTypes.string.isRequired,
};

export default NewsHeader;

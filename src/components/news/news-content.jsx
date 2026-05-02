import PropTypes from 'prop-types';
import Util from '../../lib/Util.jsx';

const NewsContent = ({content}) => (
  <>
    {content.map((item, index) => (
      <p className="text-body-secondary m-0 p-0" key={index}>
        {Util.processContents(item.replace(/<\/*>/g, ''))}
      </p>
    ))}
  </>
);

NewsContent.propTypes = {
  content: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default NewsContent;

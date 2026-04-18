import PropTypes from 'prop-types';
import NewsHeader from './news-header.jsx';
import NewsContent from './news-content.jsx';
import LazyImage from '../ui/lazy-image/lazy-image.jsx';

const News = ({title, resume, content, img, id, publishDate}) => {
  return (
    <section className="d-flex flex-column gap-3 mt-3 mt-md-4" key={id}>
      <NewsHeader title={title} publishDate={publishDate} resume={resume}/>
      <div>
        {img && (
          <LazyImage
            src={img}
            className="h-50 object-fit-contain rounded-3 w-100"
            style={{width: '100%'}}
            alt={`Imagem da notícia ${title}`}
          />
        )}
      </div>
      <NewsContent content={content}/>
    </section>
  );
};

News.propTypes = {
  title: PropTypes.string,
  resume: PropTypes.string,
  content: PropTypes.arrayOf(PropTypes.string),
  img: PropTypes.string,
  id: PropTypes.number,
  publishDate: PropTypes.string.isRequired,
};

export default News;

import PropTypes from 'prop-types';

import GuideLetterSection from '@/components/guide-list-components/guide-letter-section.jsx';

const GuideList = ({data}) => {
  const uniqueLetters = Object.keys(data)
    .map(key => key[0])
    .filter((v, i, self) => self.indexOf(v) === i)
    .sort();
  
  if (uniqueLetters.length === 0) return <p>Nenhum resultado encontrado.</p>;
  
  return (
    <div className="d-flex flex-column gap-4 gap-sm-5 align-items-start">
      {uniqueLetters.map((letter, i) => {
        const addressesForLetter = Object.entries(data)
          .filter(([key]) => key[0] === letter)
          .reduce((acc, [key, value]) => {
              acc[key] = value;
              return acc;
            }, {}
          );
        
        return (
          <GuideLetterSection
            key={letter}
            letter={letter}
            addresses={addressesForLetter}
            nextLetter={uniqueLetters[i + 1]}
          />
        );
      })}
    </div>
  );
};

GuideList.propTypes = {
  data: PropTypes.object.isRequired,
};

export default GuideList;

import PropTypes from 'prop-types';
import {motion} from 'framer-motion';
import {Badge} from 'react-bootstrap';
import Card from '@/components/ui/card/card.jsx';
import Util from '@/lib/Util.jsx';
import Convert from '@/lib/Convert.js';
import GetCompanyIdentification from '@/components/line/get-company-identification.jsx';

const LineCard = ({line}) => {
  const subtitle =
    line.direction === 0
      ? `${line.departure_location} ⇄ ${line.destination_location}`
      : `${line.departure_location} ⇄ ${line.destination_location}`.trim();
  
  return (
    <motion.div
      initial={{opacity: 0, scale: 1, y: 10}}
      animate={{opacity: 1, scale: 1, y: 0}}
      exit={{opacity: 0, scale: 1, y: -10}}
      transition={{duration: 0.5}}
    >
      <Card
        title="Linha"
        link={`/lines/${line.line_id}`}
        badge={
          <div className="d-flex flex-wrap gap-1">
            <Badge className="bg-primary rounded-5 text-white" style={{letterSpacing: '0.5px'}}>
              N.º {line.line_number}
            </Badge>
            {parseFloat(line.fare) > 0 && (
              <Badge
                className="bg-primary-subtle rounded-5 text-primary-emphasis"
                style={{letterSpacing: '0.5px'}}
              >
                {Util.formatMoney(line.fare)}
              </Badge>
            )}
            {line.type && (
              <Badge
                className={`${Convert.colorIdentification(
                  (Convert.lineType(line.type) || '').split(' ')[0]
                )} rounded-5`}
                style={{letterSpacing: '0.5px'}}
              >
                {(Convert.lineType(line.type) || '').split(' ')[0]}
              </Badge>
            )}
            <GetCompanyIdentification line={line}/>
          </div>
        }
        subtitle={subtitle}
      >
        {Util.resumeInfoLine(line)}
      </Card>
    </motion.div>
  );
};

LineCard.propTypes = {
  line: PropTypes.object.isRequired,
};

export default LineCard;

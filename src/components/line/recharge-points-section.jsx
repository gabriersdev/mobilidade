import PropTypes from 'prop-types';
import Title from '../ui/title/title.jsx';
import ListRechargePoints from '../list-recharge-points/list-recharge-points.jsx';

const RechargePointsSection = ({line}) => (
  <section id="pontos-de-recarga" className="pt-3">
    <Title type="h3" classX="pb-2 text-body-secondary">Pontos de recarga</Title>
    <ListRechargePoints id_company={line.company_id} company_name={line.company_name}/>
  </section>
);

RechargePointsSection.propTypes = {
  line: PropTypes.object.isRequired,
};

export default RechargePointsSection;

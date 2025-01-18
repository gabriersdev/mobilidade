import PropTypes from 'prop-types';

const If = ({test, children}) => {
  const contentIf = children.filter(child => child.type.name !== 'Else');
  const contentElse = children.filter(child => child.type.name === 'Else');

  if (test) return contentIf;
  else if (contentElse.length > 0) return contentElse;
  return null;
}

const Else = ({children}) => children;

If.propTypes = {
  test: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
}

Else.propTypes = {
  children: PropTypes.node.isRequired
}

export {If, Else};

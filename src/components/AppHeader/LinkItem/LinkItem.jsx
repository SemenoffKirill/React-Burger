import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';

function LinkItem({ linkClass, icon, textClass, text, href }) {

  return (
    <NavLink className={linkClass} to={href}>
      {icon} <span className={textClass}>{text}</span>
    </NavLink>
  );
}

LinkItem.propTypes = {
  linkClass: PropTypes.func.isRequired,
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  textClass: PropTypes.string.isRequired
}

export default LinkItem;
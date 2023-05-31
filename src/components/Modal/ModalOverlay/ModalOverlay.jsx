import styles from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay({closePopup}) {
  return(
    <div className={styles.overlay} onClick={closePopup} ></div>
  )
}

ModalOverlay.propTypes = {
  closePopup: PropTypes.func.isRequired
}

export default ModalOverlay;

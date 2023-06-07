import React from 'react';
import {
  createPortal
} from 'react-dom';
import PropTypes from 'prop-types';
import {
  CloseIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './ModalOverlay/ModalOverlay';
import styles from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

export default function Modal({
  closeModal,
  children
}) {
  function handleEcsClose(e) {
    if (e.key === 'Escape') {
      closeModal(e);
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleEcsClose);

    return () => {
      document.removeEventListener('keydown', handleEcsClose);
    }
  });

  return createPortal(
    <ModalOverlay closeModal={closeModal}>
      <div
        className={`${styles.container} pt-10 pr-10 pb-10 pl-10`}
        onClick={e => e.stopPropagation()}
      >
        {children}

        <button className={`${styles.close} mt-15 mr-10`} >
          <CloseIcon type='primary' onClick={closeModal} />
        </button>
      </div>
    </ModalOverlay>,
    modalRoot
  )
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

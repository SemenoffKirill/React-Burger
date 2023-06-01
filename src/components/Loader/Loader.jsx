import styles from './Loader.module.css';
import PropTypes from 'prop-types';

export default function Loader({ loading, error, text }) {
  return (
    <>
      {loading && (
        <div className={styles.container}>
          <p className='text text_type_main-large'>Отправляем ваш заказ</p>
          <img
            src={`https://stellarburgers.nomoreparties.site/static/media/loading.89540200.svg`}
            alt="Загрузка"
            className={styles.loader}
          />
        </div>
      )}
      {error && (
        <p className={'text text_type_main-large ' + styles.text}>{text}</p>
      )}
    </>
  );
}

Loader.propTypes = {
  error: PropTypes.bool.isRequired,
  text: PropTypes.string
}
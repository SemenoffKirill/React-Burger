import { useState } from 'react';
import styles from './passForgot.module.css';
import {
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { forgotPasswordRequest } from '../../utils/Api';
import { setForgotPassword } from '../../services/actions/user';

export function ForgotPage() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFormSubmit = (e) => {
    e.preventDefault();
    forgotPasswordRequest(email);
    dispatch(setForgotPassword(true));
    navigate('/reset-password');
  };

  return (
    <div className={styles.container}>
      <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
      <form className={styles.form} onSubmit={onFormSubmit}>
        <EmailInput
          placeholder="Укажите Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="primary" size="medium">
          Восстановить
        </Button>
      </form>
      <div className={'mt-20 ' + styles.wrapper}>
        <p
          className={
            'text text_type_main-default text_color_inactive ' + styles.text
          }
        >
          Вспомнили пароль?
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}

import { useState } from 'react';
import styles from './login.module.css';
import {
  PasswordInput,
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { setLogin } from '../../services/actions/user';
import { useDispatch } from 'react-redux';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const userData = useSelector((state) => state.userInfo.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(setLogin(email, password));
    // alert( document.cookie )
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <h2 className="text text_type_main-medium mb-6">Вход</h2>
      <form className={styles.form} onSubmit={onFormSubmit}>
        <EmailInput
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <PasswordInput
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="primary" size="medium">
          Войти
        </Button>
      </form>
      <div className={'mt-20 ' + styles.wrapper}>
        <p
          className={
            'text text_type_main-default text_color_inactive ' + styles.text
          }
        >
          Вы новый пользователь?
          <Link to="/register" className={styles.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p
          className={
            'text text_type_main-default text_color_inactive ' + styles.text
          }
        >
          Забыли пароль?
          <Link to="/forgot-password" className={styles.link}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </div>
  );
}


import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Input,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './passForgot.module.css';
import { forgotPassword, SEND_EMAIL } from '../../services/actions/user';

export const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setEmail] = useState({ email: '' });

  const onChange = (e) => {
    setEmail({ email: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(form, navigate));
    dispatch({ type: SEND_EMAIL });
  };

  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} text text_type_main-medium pb-6`}>Восстановление пароля</h2>

      <form className={`${styles.form} pb-20`} onSubmit={onSubmit}>
        <div className='pb-6'>
          <Input
            type={'email'}
            placeholder={'Укажите e-mail'}
            onChange={onChange}
            value={form.email}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            required
          />
        </div>

        <Button htmlType='submit' type='primary' size='medium'>
          Восстановить
        </Button>
      </form>

      <p className='text text_type_main-default text_color_inactive pb-4'>
        Вспомнили пароль?
        <Link
          className={`${styles.link} pl-2`}
          to='/login'>
          Войти
        </Link>
      </p>
    </div>
  )
}
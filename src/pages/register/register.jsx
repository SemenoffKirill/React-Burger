import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Input,
  EmailInput,
  PasswordInput,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register.module.css';
import { registerNewUser } from '../../services/actions/user';

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setValue] = useState({ email: '', password: '', name: '' });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerNewUser(form, navigate));
  }

  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} text text_type_main-medium pb-6`}>Регистрация</h2>

      <form className={`${styles.form} pb-20`} onSubmit={onSubmit}>
        <div className='pb-6'>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={onChange}
            value={form.name}
            name={'name'}
            error={false}
            size={'default'}
          />
        </div>

        <div className='pb-6'>
          <EmailInput
            onChange={onChange}
            value={form.email}
            name={'email'}
            size='default' />
        </div>

        <div className='pb-6'>
          <PasswordInput
            onChange={onChange}
            value={form.password}
            name={'password'}
            size='default' />
        </div>

        <Button 
          htmlType='submit'
          type='primary'
          size='medium'
        >
          Зарегистрироваться
        </Button>
      </form>

      <p className='text text_type_main-default text_color_inactive pb-4'>
        Уже зарегистрированы?
        <Link
          className={`${styles.link} pl-2`}
          to='/login'>
          Войти
        </Link>
      </p>
    </div>
  )
}
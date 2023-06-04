import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.module.css';
import {
  logOut,
  IS_CHANGED,
  STOP_CHANGE,
  setChangedUser,
} from '../../services/actions/user';
import { getAuthData } from '../../services/reducers/rootReducer';

export const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userData, isChanged } = useSelector(getAuthData);
  const name = userData.user.name;
  const email = userData.user.email;

  const [change, setChange] = useState({ name: name, email: email, password: '' });

  const onChange = (e) => {
    dispatch({ type: IS_CHANGED });
    setChange({ ...change, [e.target.name]: e.target.value });
  };

  const onResetChanges = () => {
    setChange({ name: name, email: email, password: '' });
    dispatch({ type: STOP_CHANGE });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(setChangedUser(change));
    setChange({ ...change, password: '' });
    dispatch({ type: STOP_CHANGE });
  };

  const handleLogout = () => {
    dispatch(logOut(navigate));
  };

  return (
    <div className={`${styles.container} pt-30 pl-10`}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <NavLink
              to='/profile'
              className={({ isActive }) => `${styles.link} text text_type_main-medium text_color_inactive ${isActive ? styles.linkActive : ''}`}
            >
              Профиль
            </NavLink>
          </li>

          <li className={styles.item}>
            <NavLink
              to='/profile/orders'
              className={({ isActive }) => `${styles.link} text text_type_main-medium text_color_inactive ${isActive ? styles.linkActive : ''}`}
            >
              История заказов
            </NavLink>
          </li>

          <li className={styles.item}>
            <NavLink
              to='/'
              onClick={handleLogout}
              className={({ isActive }) => `${styles.link} text text_type_main-medium text_color_inactive ${isActive ? styles.linkActive : ''}`}
            >
              Выход
            </NavLink>
          </li>
        </ul>

        <p className={`${styles.text} text text_type_main-default text_color_inactive pt-20`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>

      <form className={`${styles.form} pl-15`} onSubmit={onSubmit}>
        <div className='pb-6'>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={onChange}
            icon={'EditIcon'}
            value={change.name}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>

        <div className='pb-6'>
          <Input
            type={'email'}
            placeholder={'Логин'}
            onChange={onChange}
            icon={'EditIcon'}
            value={change.email}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>

        <div className='pb-6'>
          <Input
            type={'password'}
            placeholder={'Пароль'}
            onChange={onChange}
            icon={'EditIcon'}
            value={change.password}
            name={'password'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>

        {isChanged && (
          <div>
            <Button
              htmlType='submit'
              type='primary'
              size='medium'
            >
              Сохранить
            </Button>

            <Button
              onClick={onResetChanges}
              htmlType='button'
              type='secondary'
              size='medium'
            >
              Отмена
            </Button>
          </div>
        )}
      </form>
    </div >
  )
}

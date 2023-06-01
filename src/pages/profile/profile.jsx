import styles from './profile.module.css';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout, sendUserInfo } from '../../services/actions/user';
import { getCookie } from '../../utils/cookie';
import { getUserInfo } from '../../services/actions/user';

export function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.userInfo.accessToken);
  const userData = useSelector((state) => state.userInfo.user.user);

  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [isInfoChanged, setIsInfoChanged] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);

  const onNameChange = (e) => {
    const value = e.target.value;
    setTimeout(() => nameRef.current.focus(), 0);
    setNameValue(value);
    value === userData.name ? setIsInfoChanged(false) : setIsInfoChanged(true);
  };

  const onEmailChange = (e) => {
    const value = e.target.value;
    setTimeout(() => emailRef.current.focus(), 0);
    setEmailValue(value);
    value === userData.email ? setIsInfoChanged(false) : setIsInfoChanged(true);
  };

  const onPassChange = (e) => {
    const value = e.target.value;
    setTimeout(() => passRef.current.focus(), 0);
    setPasswordValue(value);
    value === passwordValue ? setIsInfoChanged(false) : setIsInfoChanged(true);
  };

  useEffect(() => {
    if (userData) {
      setNameValue(userData.name);
      setEmailValue(userData.email);
      setPasswordValue(passwordValue);
    } else {
      dispatch(getUserInfo());
      navigate('/profile', { replace: true });
    }
  }, [dispatch, userData, navigate, passwordValue]);

  const handleLogout = () => {
    const refreshToken = getCookie('refreshToken');
    dispatch(setLogout(refreshToken));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(sendUserInfo(nameValue, emailValue, passwordValue, token));
    alert('User Data successfully changed'); // убрать
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setNameValue(userData.name);
    setEmailValue(userData.email);
    setPasswordValue('');
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navigation}>
        <div className={styles.links + ' mb-20'}>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${styles.profLink} text text_type_main-medium text_color_primary`
                : `${styles.profLink} text text_type_main-medium text_color_inactive`
            }
            to="/profile"
          >
            Профиль
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${styles.profLink} text text_type_main-medium text_color_primary`
                : `${styles.profLink} text text_type_main-medium text_color_inactive`
            }
            to="/profile/orders"
          >
            История заказов
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${styles.profLink} text text_type_main-medium text_color_primary`
                : `${styles.profLink} text text_type_main-medium text_color_inactive`
            }
            onClick={handleLogout}
            to="/login"
          >
            Выход
          </NavLink>
        </div>
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={onFormSubmit} name="profile">
          <Input
            type="text "
            name="name"
            placeholder="Имя"
            icon={'EditIcon'}
            value={nameValue}
            ref={nameRef}
            onChange={onNameChange}
          />
          <Input
            type="email"
            name="login"
            placeholder="Логин"
            icon={'EditIcon'}
            value={emailValue}
            ref={emailRef}
            onChange={onEmailChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Пароль"
            icon={'EditIcon'}
            value={passwordValue}
            ref={passRef}
            onChange={onPassChange}
          />
          {isInfoChanged && (
            <div className={styles.buttons}>
              <Button
                type="secondary"
                size="medium"
                htmlType="button"
                onClick={handleCancel}
              >
                Отмена
              </Button>
              <Button type="primary" size="medium" htmlType="button">
                Сохранить
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

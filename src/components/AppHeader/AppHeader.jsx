import { Logo } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/logo';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import LinkItem from './LinkItem/LinkItem.jsx';
import { Link, useMatch } from 'react-router-dom';
import styles from './AppHeader.module.css';

function AppHeader() {
  const linkStyle =
    'text text_type_main-default text_color_primary mt-4 mb-4 pt-4 pb-4 pr-5 pl-5 ';
  const unActiveStyle =
    'text text_type_main-default text_color_inactive mt-4 mb-4 pt-4 pb-4 pr-5 pl-5 ';

  const matchHome = useMatch('/');
  const matchList = useMatch('/feed');
  const matchProfile = useMatch('/profile');

  return (
    <header className={styles.header}>
      <nav className={styles.container}>
        <div className={styles.layout}>
          <LinkItem
            linkClass={({ isActive }) =>
              isActive
                ? `${linkStyle}${styles.link}`
                : `${unActiveStyle}${styles.link}`
            }
            textClass={'ml-2'}
            icon={
              <BurgerIcon type={Boolean(matchHome) ? 'primary' : 'secondary'} />
            }
            text={'Конструктор'}
            href={'/'}
          />
          <LinkItem
            linkClass={({ isActive }) =>
              isActive
                ? `${linkStyle}${styles.link}`
                : `${unActiveStyle}${styles.link}`
            }
            textClass={'ml-2'}
            icon={
              <ListIcon type={Boolean(matchList) ? 'primary' : 'secondary'} />
            }
            text={'Лента заказов'}
            href={'/feed'}
          />
        </div>
        <div className={styles.logo}>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <nav className={styles.layout}>
          <LinkItem
            linkClass={({ isActive }) =>
              isActive
                ? `${linkStyle}${styles.link}`
                : `${unActiveStyle}${styles.link}`
            }
            textClass={'ml-2'}
            icon={
              <ProfileIcon
                type={Boolean(matchProfile) ? 'primary' : 'secondary'}
              />
            }
            text={'Личный кабинет'}
            href={'/profile'}
          />
        </nav>
      </nav>
    </header>
  );
}

export default AppHeader;

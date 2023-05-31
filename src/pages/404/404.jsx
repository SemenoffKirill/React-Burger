import styles from './404.module.css';
import {
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";

export function PageNotfound() {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/')
  }

  return (
    <div className={styles.container}>
      <div className={"mt-20 mb-20 " + styles.wrapper}>
        <h2 className='text text_type_main-large mb-6'>404</h2>
        <p className={'text text_type_main-default text_color_primary ' + styles.text}>Страница не найдена</p>
      </div>
      <Button type='primary' onClick={onClick}>Вернуться</Button>
    </div>
  );
}
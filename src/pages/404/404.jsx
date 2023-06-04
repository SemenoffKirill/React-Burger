import { useNavigate } from "react-router-dom";
import {
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './404.module.css';
import notFound from '../../images/not-found.png';

export const NotFound404 = () => {
  const navigate = useNavigate();

  const onClick = () => navigate(-1);

  return (
    <div className={styles.container}>
      <img src={notFound} alt="404 страница не найдена" className={styles.image} />

      <p className="text text_type_main-large mb-6">
        Сраница не найдена!
      </p>

      <Button
        htmlType='button'
        type="primary"
        size="medium"
        onClick={onClick}>
        Назад
      </Button>
    </div >)
}
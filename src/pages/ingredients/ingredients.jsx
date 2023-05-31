import styles from './ingredients.module.css';
import IngredientDetails from "../../components/Modal/IngredientDetails/IngredientDetails";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

export const IngredientPage = () => {
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  let { id }  = useParams();

  const currentIngredient = ingredients.find((el) => el._id === id);

  return  (
    currentIngredient && (
      <div className={styles.wrapper}>
      <IngredientDetails currentIngredient={currentIngredient} />
      </div>
    )
  )
};

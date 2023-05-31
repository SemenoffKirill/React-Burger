import { Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { useDrag } from "react-dnd";
import styles from './Ingredient.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeIngredientModalStatus } from "../../../services/actions/modal";
import { currentIngredient } from "../../../services/actions/ingredients";
import { IngredientPropTypes } from "../../../utils/PropTypes";

function Ingredient({ ingredient }) {
  const { image, name, price, _id } = ingredient;
  const burgerData = useSelector(state => state.ingredients.ingredients);
  const selectedIngredients = useSelector(state => state.ingredients.selectedIngredients);
  const dispatch = useDispatch();
  // dnd drag hook
  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });
  // ingredient click listener
  const handleIngClick = (evt) => {
    const id = evt.currentTarget.id
    const current = burgerData.find(element => element._id === id)
    dispatch(currentIngredient(current));
    dispatch(changeIngredientModalStatus(true));
  };
  // counter func
  let counter = 0;
  selectedIngredients.forEach(ingredient => {
    ingredient.name === name && (ingredient.type === 'bun' ? counter += 2 : counter += 1);
  });


  return (
    // <Link className={styles.link} to={`/${_id}`} >
      <li id={_id} key={_id} className={`${styles.listItem} ${isDrag && styles.dragging}`} onClick={handleIngClick} ref={dragRef} >
        {counter > 0 && <Counter count={counter} size={'default'} />}
        <img src={image} alt={name} className={'mr-4 ml-4'} />
        <p className={'mt-1 mb-1 text text_type_digits-default text_color_primary ' + styles.paragraph}>
          <span className={'pr-2'}>{price}</span>
          <CurrencyIcon type='primary' />
        </p>
        <p className={'text text_type_main-default text_color_primary ' + styles.bunName}>
          {name}
        </p>
      </li>
    // </Link>
  );
}

Ingredient.propTypes = {
  ingredient: IngredientPropTypes
}

export default Ingredient;

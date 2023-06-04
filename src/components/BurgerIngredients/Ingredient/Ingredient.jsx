import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import styles from './Ingredient.module.css';
import {
  CurrencyIcon,
  Counter
} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientProps from '../../../utils/PropTypes';
import { getBurgerConstructor } from '../../../services/reducers/rootReducer';

export default function BurgerIngredientsItem({ ingredient }) {
  const location = useLocation();

  const { bun, fillings } = useSelector(getBurgerConstructor);

  const counter = React.useMemo(() => {
    if (bun && ingredient._id === bun._id) return 2

    else if (fillings.length > 0)
      return fillings.reduce((count, item) => {
        return item._id === ingredient._id ? count += 1 : count;
      }, 0)

    else return 0;
  }, [bun, fillings, ingredient]);

  const [{ opacity }, dragRef] = useDrag({
    type: 'ingredient',
    item: { ingredient },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  return (
    <Link
      to={`/ingredients/${ingredient._id}`}
      state={{ background: location }}
      className={`${styles.item} ml-3 mr-3 pb-8`}
      style={{ opacity }}
      ref={dragRef}
    >
      <img className={`${styles.image} pl-4 pr-4`} src={ingredient.image} alt={ingredient.name} />
      <div className={`${styles.price} pt-1 pb-1`}>
        <p className='text text_type_digits-default pr-2'>{ingredient.price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <p className={`${styles.name} text text_type_main-default`}>{ingredient.name}</p>
      {!!counter && <Counter count={counter} size='default' />}
    </Link>
  )
}

BurgerIngredientsItem.propTypes = {
  ingredient: ingredientProps.isRequired,
}

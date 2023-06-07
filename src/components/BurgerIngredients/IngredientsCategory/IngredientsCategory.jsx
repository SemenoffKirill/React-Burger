import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Item from '../Ingredient/Ingredient';
import styles from './IngredientsCategory.module.css';
import { getBurgerIngredients } from '../../../services/reducers/RootReducer';



export default function BurgerIngredientsCategory({ type }) {
  const { ingredients: data } = useSelector(getBurgerIngredients);

  const categories = {
    'bun': 'Булки',
    'sauce': 'Соусы',
    'main': 'Начинки',
  }

  const ingredients = data.filter((item) => item.type === type);

  return (
    <li id={type} className='pb-2'>
      <h2 className={`${styles.title} text text_type_main-medium pb-6`}>{categories[type]}</h2>
      <ul className={`${styles.list} pr-1`}>
        {ingredients.map((ingredient) => (
          <Item
            key={ingredient._id}
            ingredient={ingredient}
          />
        ))}
      </ul>
    </li>
  )
}

BurgerIngredientsCategory.propTypes = {
  type: PropTypes.string.isRequired,
}


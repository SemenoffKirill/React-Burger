import styles from './SelectedIngredient.module.css';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from "react-dnd";
import { useRef } from 'react';
import { DELETE_INGREDIENT } from '../../../services/actions/ingredients';
import { IngredientPropTypes } from '../../../utils/PropTypes';

function SelectedIngredient({ ingredient, index, moveIngredient }) {
  const dispatch = useDispatch();
  const { image, name, price } = ingredient;
  const selectedIngredients = useSelector(state => state.ingredients.selectedIngredients);

  const handleDeleteIngredient = (item) => {
    const selectedIndex = selectedIngredients.indexOf(item)
    const newIngredientsArray = selectedIngredients.slice();
    newIngredientsArray.splice(selectedIndex, 1);
    dispatch({
      type: DELETE_INGREDIENT,
      payload: newIngredientsArray
    });
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: 'selected',
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, dropRef] = useDrop({
    accept: 'selected',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover: (item, monitor) => {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveIngredient(dragIndex, hoverIndex, selectedIngredients);
      item.index = hoverIndex;
    }
  });

  const ref = useRef(null);
  const dragDropRef = dragRef(dropRef(ref));
  const opacity = isDragging ? 0 : 1;

  return (
    <li className={'mb-4 ml-4 mr-1 ' + styles.element} ref={dragDropRef} style={{ opacity }} data-handler-id={handlerId}>
      <DragIcon type="primary" />
      <ConstructorElement 
        text={name}
        thumbnail={image}
        price={price}
        handleClose={handleDeleteIngredient}
        index={index}
      />
    </li>
  )
};

SelectedIngredient.propTypes = {
  ingredient: IngredientPropTypes,
  index: PropTypes.number.isRequired,
  moveIngredient: PropTypes.func.isRequired
}

export { SelectedIngredient };  
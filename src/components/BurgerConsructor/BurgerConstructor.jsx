import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { useDrop } from 'react-dnd';
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
}
  from '@ya.praktikum/react-developer-burger-ui-components'
import ConstructorFilling from './SelectedIngredient/SelectedIngredient'
import styles from './BurgerConstructor.module.css';
import Modal from '../Modal/Modal';
import OrderDetails from '../Modal/OrderDetails/OrderDetails';
import {
  ADD_BUN,
  ADD_FILLING,
} from '../../services/actions/burger-constructor';
import {
  CLOSE_ORDER_DETAILS,
  getOrder,
} from '../../services/actions/order-details';
import { CLEAR_CONSTRUCTOR } from '../../services/actions/burger-constructor';
import { getBurgerConstructor, getOrderDetails, getAuthData } from '../../services/reducers/RootReducer';


export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector(getAuthData);

  const { bun, fillings, totalPrice } = useSelector(getBurgerConstructor);
  const { order } = useSelector(getOrderDetails);

  const getBurgerIDs = () => {
    const ids = fillings.map(filling => filling._id);
    ids.push(bun._id);
    return ids;
  };

  const openOrderDetails = (e) => {
    if (userData) {
      e.stopPropagation();
      dispatch(getOrder(getBurgerIDs()));
    } else {
      navigate('/login');
    }
  };

  const closeOrderDetails = () => {
    dispatch({
      type: CLOSE_ORDER_DETAILS,
    });

    dispatch({
      type: CLEAR_CONSTRUCTOR,
    });
  };

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      if (item.ingredient.type === 'bun') {
        dispatch({
          type: ADD_BUN,
          bun: item.ingredient,
        });
      } else {
        dispatch({
          type: ADD_FILLING,
          filling: { ...item.ingredient, id: uuid() },
        });
      }
    },
  });

  return (
    <section className={`${styles.section} pl-5 pt-25 pr-5`}>
      <div className={`${styles.container} pl-4`} ref={dropTarget}>
        <div className='pr-4 pb-4 pl-8'>
          {!bun.price
            ? (<div className='text text_type_main-medium pr-2'>
              <ConstructorElement
               type="top"
               isLocked={true}
               text={'Выберите булочку (верх)'}
               price={0}
              thumbnail={`https://stellarburgers.nomoreparties.site/static/media/loading.89540200.svg`}/>
            </div>)
            : (<ConstructorElement
              type='top'
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />)
          }
        </div>

        <ul className={`${styles.list}`}>
          {fillings.length === 0
            ? <p className='text text_type_main-medium pl-8 pt-4'>Начиночка</p>
            : fillings.map((filling, index) => {
              return filling
                ? (<ConstructorFilling
                  key={filling.id}
                  index={index}
                  ingredient={filling}
                />)
                : null;
            })}
        </ul>


        <div className='pt-4 pr-4 pl-8'>
        {!bun.price
            ? (<div className='text text_type_main-medium pr-2'>
              <ConstructorElement
               type="bottom"
               isLocked={true}
               text={'Выберите булочку (низ)'}
               price={0}
              thumbnail={`https://stellarburgers.nomoreparties.site/static/media/loading.89540200.svg`}/>
            </div>)
            : (<ConstructorElement
              type='bottom'
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />)
          }
        </div>

      </div>

      <div className={`${styles.order} pt-10 pr-4`}>
        <div className={`${styles.result} pr-10`}>
          <p className='text text_type_digits-medium pr-2'>{totalPrice}</p>
          <div className={`${styles.currencyIcon}`}>
            <CurrencyIcon type='primary' />
          </div>
        </div>

        <Button
          htmlType='button'
          type='primary'
          size='large'
          onClick={(e) => {
            openOrderDetails(e);
          }}
          disabled={!bun.price}
        >
          Оформить заказ
        </Button>
      </div>

      {!!order && (
        <Modal closeModal={closeOrderDetails}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  )
}

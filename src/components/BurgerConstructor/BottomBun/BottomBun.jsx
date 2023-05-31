import { useMemo } from "react";
import { useSelector } from "react-redux";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

export function BottomBun() {
  const selectedIngredients = useSelector(state => state.ingredients.selectedIngredients);
  const bun = useMemo(() => selectedIngredients.find((ingredient) => ingredient.type === 'bun'), [selectedIngredients]);

  return (
    <div className={' ml-4 mr-4 pl-8'}>
      {bun &&
        selectedIngredients.length > 0 ? <ConstructorElement
        type="bottom"
        isLocked={true}
        text={bun.name + ' (низ)'}
        thumbnail={bun.image}
        price={bun.price}
      /> : <ConstructorElement
        type="bottom"
        isLocked={true}
        text={'Выберите булочку (низ)'}
        price={0}
        thumbnail={`https://stellarburgers.nomoreparties.site/static/media/loading.89540200.svg`}
      />
      }
    </div>
  )
}
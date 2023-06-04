import { useInView } from 'react-intersection-observer';
import styles from './BurgerIngredients.module.css';
import Tabs from './Tabs/Tabs';
import Category from './IngredientsCategory/IngredientsCategory';

export default function BurgerIngredients() {
  const [bunRef, bunInView] = useInView({ threshold: .05 });
  const [sauceRef, sauceInView] = useInView({ threshold: .05 });
  const [mainRef, mainInView] = useInView({ threshold: .05 });

  return (
    <section className={`${styles.section} pl-5 pr-5`}>
      <h1 className='text text_type_main-large pt-10'>
        Соберите бургер
      </h1>

      <Tabs inViews={{ bunInView, sauceInView, mainInView }} />

      <ul className={`${styles.list}`}>
        <div ref={bunRef}>
          <Category
            className='pt-5'
            type='bun'
          />
        </div>

        <div ref={sauceRef}>
          <Category
            className='pt-5'
            type='sauce'
          />
        </div>

        <div ref={mainRef}>
          <Category
            className='pt-5'
            type='main'
          />
        </div>
      </ul>
    </section >
  )
}

import styles from './feed.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export function FeedPage() {

  return (
    <div className={styles.wrapper}>
      <h2 className={'text text_type_main-large ' + styles.title}>Лента заказов</h2>
      <div className={styles.content}>
        <section className={styles.feed + ' custom-scroll'}>
          <div className={styles.orders + ' mr-2'}>
            <article className={styles.order}>
              <div className={styles.info + ' mb-6'}>
                <p className={'text text_type_digits-default'}>#30463</p>
                <p className={"text text_color_inactive text_type_main-default "}>Сегодня, 16:20 i-GMT+3</p>
              </div>
              <h3 className={'text text_type_main-medium mb-6'}>Death Star Starship Main бургер</h3>
              <div className={styles.info}>
                <img src="" alt="Картинки" />
                <span className={'text text_type_digits-medium mr-10 ' + styles.sum}>480{<CurrencyIcon />}</span>
              </div>
            </article>
            <article className={styles.order}>
              <div className={styles.info + ' mb-6'}>
                <p className={'text text_type_digits-default'}>#30462</p>
                <p className={"text text_color_inactive text_type_main-default "}>Сегодня, 12:30 i-GMT+3</p>
              </div>
              <h3 className={'text text_type_main-medium mb-6'}>Black Hole Singularity острый бургер</h3>
              <div className={styles.info}>
                <img src="" alt="Картинки" />
                <span className={'text text_type_digits-medium mr-10 ' + styles.sum}>560{<CurrencyIcon />}</span>
              </div>
            </article>
            <article className={styles.order}>
              <div className={styles.info + ' mb-6'}>
                <p className={'text text_type_digits-default'}>#30461</p>
                <p className={"text text_color_inactive text_type_main-default "}>Сегодня, 10:00 i-GMT+3</p>
              </div>
              <h3 className={'text text_type_main-medium mb-6'}>Supernova Infinity бургер</h3>
              <div className={styles.info}>
                <img src="" alt="Картинки" />
                <span className={'text text_type_digits-medium mr-10 ' + styles.sum}>510{<CurrencyIcon />}</span>
              </div>
            </article>
            <article className={styles.order}>
              <div className={styles.info + ' mb-6'}>
                <p className={'text text_type_digits-default'}>#30460</p>
                <p className={"text text_color_inactive text_type_main-default "}>Сегодня, 9:20 i-GMT+3</p>
              </div>
              <h3 className={'text text_type_main-medium mb-6'}>Black Hole Singularity острый бургер</h3>
              <div className={styles.info}>
                <img src="" alt="Картинки" />
                <span className={'text text_type_digits-medium mr-10 ' + styles.sum}>370{<CurrencyIcon />}</span>
              </div>
            </article>
            <article className={styles.order}>
              <div className={styles.info + ' mb-6'}>
                <p className={'text text_type_digits-default'}>#30459</p>
                <p className={"text text_color_inactive text_type_main-default "}>Сегодня, 9:14 i-GMT+3</p>
              </div>
              <h3 className={'text text_type_main-medium mb-6'}>Black Hole Singularity острый бургер</h3>
              <div className={styles.info}>
                <img src="" alt="Картинки" />
                <span className={'text text_type_digits-medium mr-10 ' + styles.sum}>518{<CurrencyIcon />}</span>
              </div>
            </article>
            <article className={styles.order}>
              <div className={styles.info + ' mb-6'}>
                <p className={'text text_type_digits-default'}>#30458</p>
                <p className={"text text_color_inactive text_type_main-default "}>Вчера, 21:41 i-GMT+3</p>
              </div>
              <h3 className={'text text_type_main-medium mb-6'}>Black Hole Singularity острый бургер</h3>
              <div className={styles.info}>
                <img src="" alt="Картинки" />
                <span className={'text text_type_digits-medium mr-10 ' + styles.sum}>518{<CurrencyIcon />}</span>
              </div>
            </article>
          </div>
        </section>
        <section className={styles.statistics}>
          <div className={'mb-15 ' + styles.container}>
            <div className="ready">
              <h4 className='text text_type_main-medium mb-6'>Готовы:</h4>
              <ul className={styles.list}>
                <li className={'text text_color_success text_type_digits-default ' + styles.li}>034533</li>
                <li className={'text text_color_success text_type_digits-default ' + styles.li}>034532</li>
                <li className={'text text_color_success text_type_digits-default ' + styles.li}>034530</li>
                <li className={'text text_color_success text_type_digits-default ' + styles.li}>034527</li>
                <li className={'text text_color_success text_type_digits-default ' + styles.li}>034525</li>
              </ul>
            </div>
            <div className='preparing'>
              <h4 className='text text_type_main-medium mb-6'>В работе:</h4>
              <ul className={styles.list}>
                <li className={'text text_type_digits-default ' + styles.li}>034538</li>
                <li className={'text text_type_digits-default ' + styles.li}>034541</li>
                <li className={'text text_type_digits-default ' + styles.li}>034542</li>
              </ul>
            </div>
          </div>
          <article className="completed mb-15">
            <h3 className="text text_type_main-medium">Выполнено за всё время:</h3>
            <span className={"text text_type_digits-large " + styles.digits}>28752</span>
          </article>
          <article className="completed">
            <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
            <span className={"text text_type_digits-large " + styles.digits}>138</span>
          </article>
        </section>
      </div>
    </div>
  )
}
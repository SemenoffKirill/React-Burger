import styles from './BurgerIngredients.module.css';
import PropTypes from 'prop-types';
import IngredientCategory from './IngredientCategory/IngredientCategory';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab";
import { useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import IngredientDetails from '../Modal/IngredientDetails/IngredientDetails.jsx';
import Modal from '../Modal/Modal';

function BurgerIngredients({ closePopup }) {
	const isIngredientModalOpen = useSelector(state => state.modalState.isIngredientModalOpen);
	const burgerData = useSelector(state => state.ingredients.ingredients);

	const buns = useMemo(() => burgerData.filter((item) => item.type === 'bun'), [burgerData]);
	const mains = useMemo(() => burgerData.filter((item) => item.type === 'main'), [burgerData]);
	const sauces = useMemo(() => burgerData.filter((item) => item.type === 'sauce'), [burgerData]);

	const bunRef = useRef(null);
	const sauceRef = useRef(null);
	const mainRef = useRef(null);

	const [current, setCurrent] = useState('buns');
	const currentIngredient = useSelector(state => state.ingredients.currentIngredient);
	const selectedIngredients = useSelector(state => state.ingredients.selectedIngredients);

	const handleClick = (value) => {
		switch (value) {
			case 'buns': {
				bunRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
				break;
			}
			case 'sauces': {
				sauceRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
				break;
			}
			case 'mains': {
				mainRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
				break;
			}
		}
	};
	const scrollRef = useRef();
	const handleScroll = () => {
		const lineY = scrollRef.current.getBoundingClientRect().y;
		const bunsOffset = Math.abs(bunRef.current.getBoundingClientRect().y - lineY);
		const sauceOffset = Math.abs(sauceRef.current.getBoundingClientRect().y - lineY);
		const mainsOffset = Math.abs(mainRef.current.getBoundingClientRect().y - lineY);

		if (bunsOffset < sauceOffset && bunsOffset < mainsOffset) setCurrent("buns");
		if (sauceOffset < bunsOffset && sauceOffset < mainsOffset) setCurrent("sauces");
		if (mainsOffset < bunsOffset && mainsOffset < sauceOffset) setCurrent("mains");
	}

	const textStyle = 'text text_type_main-medium text_color_primary pb-6';

	return (
		<section className={styles.ingredients}>
			<h2 className={'text text_type_main-large text text_color_primary mt-10 mb-5'}>Соберите бургер</h2>
			<div className={styles.tabs}>
				<Tab value='buns' active={current === 'buns'} onClick={handleClick}>
					Булки
				</Tab>
				<Tab value='sauces' active={current === 'sauces'} onClick={handleClick}>
					Соусы
				</Tab>
				<Tab value='mains' active={current === 'mains'} onClick={handleClick}>
					Начинки
				</Tab>
			</div>
			<div className={styles.wrapper}>
				<div className={styles.scroll + ' custom-scroll pt-10'} ref={scrollRef} onScroll={handleScroll}>
					<IngredientCategory ref={bunRef} category={buns} heading={'Булки'}
						listStyle={'pl-4 pr-4 ' + styles.list} textStyle={textStyle}
					/>
					<IngredientCategory ref={sauceRef} category={sauces} heading={'Соусы'}
						listStyle={`pl-4 pr-4  ${styles.list} ${selectedIngredients.length === 0 && styles.disabled}`}
						textStyle={textStyle + ' pt-10'}
					/>
					<IngredientCategory ref={mainRef} category={mains} heading={'Начинки'}
						listStyle={`pl-4 pr-4 pb-8 ${styles.list} ${selectedIngredients.length === 0 && styles.disabled}`}
						textStyle={textStyle + ' pt-10'}
					/>
				</div>
			</div>
			{isIngredientModalOpen && (
				<Modal title={'Детали ингредиента'} closePopup={closePopup}>
					<IngredientDetails currentIngredient={currentIngredient}/>
				</Modal>
			)}
		</section>
	)
};

BurgerIngredients.propTypes = {
	closePopup: PropTypes.func.isRequired
}


export default BurgerIngredients;


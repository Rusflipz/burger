import styles from "./BurgerIngredients.module.css";
import { useMemo, useState, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { ingredientsSelector } from "../../services/slice/ingredients";
import { BurgerIngredient } from '../BurgerIngredient/BurgerIngredient';

function BurgerIngredients() {

  const [current, setCurrent] = useState('bun');
  const { ingredients } = useSelector(ingredientsSelector);
  const dispatch = useDispatch();

  const buns = useMemo(() => ingredients.filter((prod) => prod.type === "bun"), [ingredients])
  const sauces = useMemo(() => ingredients.filter((prod) => prod.type === "sauce"), [ingredients])
  const mains = useMemo(() => ingredients.filter((prod) => prod.type === "main"), [ingredients])

  const containerRef = useRef(null);
  const mainsRef = useRef(null);
  const saucesRef = useRef(null);
  const bunsRef = useRef(null);

  const TabClick = (evt, ref) => {
    setCurrent(evt);
    ref.current.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }

  const Scroll = () => {
    const top = containerRef.current.getBoundingClientRect().y;
    const bunsDistance = Math.abs(
      top - bunsRef.current.getBoundingClientRect().y
    );
    const saucesDistance = Math.abs(
      top - saucesRef.current.getBoundingClientRect().y
    );
    const mainsDistance = Math.abs(
      top - mainsRef.current.getBoundingClientRect().y
    );
    const minTabDistance = Math.min(
      bunsDistance,
      saucesDistance,
      mainsDistance
    );

    const activeTab =
      minTabDistance === saucesDistance
        ? 'sauce'
        : minTabDistance === mainsDistance
          ? 'main'
          : 'bun';
    setCurrent(activeTab);
  }

  return ingredients.length && (
    <section className={`${styles.BurgerConstructor}`}>
      <p className={`${styles.title} mb-5 mt-10 text text_type_main-large`}>
        Соберите бургер
      </p>
      <div className={`${styles.tabBox}`}>
        <Tab value="one" active={current === "bun"} onClick={evt => TabClick(evt, bunsRef)}>
          Булки
        </Tab>
        <Tab value="two" active={current === "sauce"} onClick={evt => TabClick(evt, saucesRef)}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "main"} onClick={evt => TabClick(evt, mainsRef)}>
          Начинки
        </Tab>
      </div>
      <div ref={containerRef} onScroll={Scroll} className={`${styles.mainConteiner}  mt-10`}>
        <div className={`${styles.conteiner}`}>
          <p
            className={`${styles.conteinerTitle} text text_type_main-medium mb-6`}
            ref={bunsRef}
          >
            Булки
          </p>
          <div className={`${styles.cards}`}>
            {buns.map(ingredient =>
              <BurgerIngredient item={ingredient} key={ingredient._id} />)}
          </div>
        </div>
        <div className={`${styles.conteiner} mt-10`}>
          <p
            className={`${styles.conteinerTitle} text text_type_main-medium mb-6`}
            ref={saucesRef}
          >
            Соусы
          </p>
          <div className={`${styles.cards}`}>
            {sauces.map(ingredient =>
              <BurgerIngredient item={ingredient} key={ingredient._id} />)}
          </div>
        </div>
        <div className={`${styles.conteiner} mt-10`}>
          <p className={`${styles.conteinerTitle} text text_type_main-medium mb-6`}
            ref={mainsRef}
          >
            Ингридиенты
          </p>
          <div className={`${styles.cards}`}>
            {mains.map(ingredient =>
              <BurgerIngredient item={ingredient} key={ingredient._id} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BurgerIngredients;

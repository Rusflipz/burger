import styles from "./BurgerIngredients.module.css";
import { useMemo, useState, useRef, MutableRefObject, SetStateAction, useEffect, Ref } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { ingredientsSelector, removeIngredientСomponents } from "../../services/slice/ingredients";
import { BurgerIngredient } from '../BurgerIngredient/BurgerIngredient';
import Modal from '../Modal/Modal';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';
import { Iingredients } from '../../utils/Interface'

function BurgerIngredients() {

  const [current, setCurrent] = useState('bun');
  const { ingredients, ingredientModalOpen } = useSelector(ingredientsSelector);
  const dispatch = useDispatch();

  const buns = useMemo(() => ingredients.filter((prod: { type: string; }) => prod.type === "bun"), [ingredients])
  const sauces = useMemo(() => ingredients.filter((prod: { type: string; }) => prod.type === "sauce"), [ingredients])
  const mains = useMemo(() => ingredients.filter((prod: { type: string; }) => prod.type === "main"), [ingredients])

  const containerRef = useRef<HTMLDivElement>(null);
  const mainsRef = useRef<HTMLParagraphElement>(null);
  const saucesRef = useRef<HTMLParagraphElement>(null);
  const bunsRef = useRef<HTMLParagraphElement>(null);

  const TabClick = (evt: SetStateAction<string>, ref: React.RefObject<HTMLParagraphElement>) => {
    setCurrent(evt);
    if (ref.current !== null) {
      ref.current.scrollIntoView({ block: 'start', behavior: 'smooth' })
    }
  }

  const Scroll = () => {
    if (containerRef.current !== null && mainsRef.current !== null && saucesRef.current !== null && bunsRef.current !== null) {
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
            {buns.map((ingredient: Iingredients) =>
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
            {sauces.map((ingredient: Iingredients) =>
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
            {mains.map((ingredient: Iingredients) =>
              <BurgerIngredient item={ingredient} key={ingredient._id} />)}
          </div>
        </div>
      </div>
      {ingredientModalOpen && <>
        <Modal onClose={() => dispatch(removeIngredientСomponents())}>
          <IngredientDetails />
        </Modal>
      </>}
    </section>
  );
}

export default BurgerIngredients;

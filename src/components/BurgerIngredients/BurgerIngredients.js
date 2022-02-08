import styles from "./BurgerIngredients.module.css";
import React from "react";
import {
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState("one");
  function Construct(props) {
    return (
      <>
        <img src={`${props.element.image}`} alt={props.element.name}></img>
        <div className={`${styles.priceConteiner} mt-1 mb-1`}>
          <span
            className={`text text_type_digits-default`}
          >{`${props.element.price} `}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p
          className={`text text_type_main-default`}
        >{`${props.element.name}`}</p>
      </>
    );
  }
  function Main() {
    const array = props.state;
    const Main = array.map((element) => {
      if (element.type === "main") {
        return (
          <div
            onClick={() => props.updateData(element)}
            className={`${styles.card}`}
            key={`${element._id}`}
          >
            <Construct element={element} />
          </div>
        );
      }
    });
    return <div className={`${styles.cards}`}>{Main}</div>;
  }

  function Sauces() {
    const array = props.state;
    const Sauces = array.map((element) => {
      if (element.type === "sauce") {
        return (
          <div
            onClick={() => props.updateData(element)}
            className={`${styles.card}`}
            key={`${element._id}`}
          >
            <Construct element={element} />
          </div>
        );
      }
    });
    return <div className={`${styles.cards}`}>{Sauces}</div>;
  }

  function Buns() {
    const array = props.state;
    const buns = array.map((element) => {
      if (element.type === "bun") {
        return (
          <div
            onClick={() => props.updateData(element)}
            className={`${styles.card}`}
            key={`${element._id}`}
          >
            <Construct element={element} />
          </div>
        );
      }
    });
    return <div className={`${styles.cards}`}>{buns}</div>;
  }

  return (
    <section className={`${styles.BurgerConstructor}`}>
      <p className={`${styles.title} mb-5 mt-10 text text_type_main-large`}>
        Соберите бургер
      </p>
      <div className={`${styles.tabBox}`}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.mainConteiner}  mt-10`}>
        <div className={`${styles.conteiner}`}>
          <p
            className={`${styles.conteinerTitle} text text_type_main-medium mb-6`}
          >
            Булки
          </p>
          <Buns />
        </div>
        <div className={`${styles.conteiner} mt-10`}>
          <p
            className={`${styles.conteinerTitle} text text_type_main-medium mb-6`}
          >
            Соусы
          </p>
          <Sauces />
        </div>
        <div className={`${styles.conteiner} mt-10`}>
          <p className={`${styles.conteinerTitle} text text_type_main-medium mb-6`}>
            Ингридиенты
          </p>
          <Main />
        </div>
      </div>
    </section>
  );
}

export default BurgerIngredients;

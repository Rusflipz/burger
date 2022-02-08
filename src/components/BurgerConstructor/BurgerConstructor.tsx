import styles from './BurgerConstructor.module.css';
import React from 'react';
import { CurrencyIcon, ConstructorElement, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function BurgerConstructor(props: any) {

  const [current, setCurrent] = React.useState('one');

  function Construct(props: { element: any }) {
    return (<></>)
  }


  function Buns() {
    const array = props.state;
    const buns = array.map((element: { type: string; }) => {
      if (element.type === "bun") {
        return (<>
          <Construct element={element} />
        </>)
      }
    });
    return (<div className={`${styles.cards}`}>{buns}</div>)
  }

  return (
    <section className={`${styles.BurgerIngredients} mt-25`}>
      <div className={`${styles.box}`}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail={`https://code.s3.yandex.net/react/code/bun-02.png`}
      />
      </div>
      <div className={`${styles.mainConteiner} mt-4 mb-4`}>
        <div className={`${styles.box}`}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Соус Spicy-X"
            price={90}
            thumbnail={`https://code.s3.yandex.net/react/code/sauce-02.png`}
          />
        </div>
        <div className={`${styles.box}`}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Филе Люминесцентного тетраодонтимформа"
            price={988}
            thumbnail={`https://code.s3.yandex.net/react/code/meat-03.png`}
          />
        </div>
        <div className={`${styles.box}`}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Хрустящие минеральные кольца"
            price={300}
            thumbnail={`https://code.s3.yandex.net/react/code/mineral_rings.png`}
          />
        </div>
        <div className={`${styles.box}`}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Мини-салат Экзо-Плантаго"
            price={4400}
            thumbnail={`https://code.s3.yandex.net/react/code/salad.png`}
          />
        </div>
        <div className={`${styles.box}`}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Хрустящие минеральные кольца"
            price={300}
            thumbnail={`https://code.s3.yandex.net/react/code/mineral_rings.png`}
          />
        </div>
        <div className={`${styles.box}`}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Соус фирменный Space Sauce"
            price={80}
            thumbnail={`https://code.s3.yandex.net/react/code/sauce-04.png`}
          />
        </div>
      </div>
      <div className={`${styles.box}`}>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        price={200}
        thumbnail={`https://code.s3.yandex.net/react/code/bun-02.png`}
      />
      </div>
      <div className={`${styles.buttonConteiner} mt-10`}>
        <span className={`text text_type_digits-medium mr-10`}>500 <CurrencyIcon type="primary" /></span>
        <Button type="primary" size="large" onClick={props.openOrder}>
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

export default BurgerConstructor;
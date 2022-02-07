import styles from './BurgerIngredients.module.css';
import React from 'react';
import {CurrencyIcon, ConstructorElement, Button} from '@ya.praktikum/react-developer-burger-ui-components'

function BurgerIngredients(props: { state:  any; }) {
    
    const [current, setCurrent] = React.useState('one');

function Construct(props: { element: any }){
    return(<></>)
}

   
function Buns (){
    const array = props.state;
    const buns = array.map((element: { type: string; }) => {
        if (element.type === "bun"){
            return (<>
                <Construct element={element}/>
                </>)
        }
    });
return (<div className={`${styles.cards}`}>{buns}</div>)
}

    return (
        <section  className= {`${styles.BurgerIngredients} mt-25`}>
            <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail={`https://code.s3.yandex.net/react/code/bun-02.png`}
      />
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className= {`${styles.mainConteiner} mt-4 mb-4`}>
    
      <ConstructorElement
        text="Краторная булка N-200i (верх)"
        price={50}
        thumbnail={`https://code.s3.yandex.net/react/code/bun-02.png`}
      />
      <ConstructorElement
        text="Краторная булка N-200i (верх)"
        price={50}
        thumbnail={`https://code.s3.yandex.net/react/code/bun-02.png`}
      />
      <ConstructorElement
        text="Краторная булка N-200i (верх)"
        price={50}
        thumbnail={`https://code.s3.yandex.net/react/code/bun-02.png`}
      />
      <ConstructorElement
        text="Краторная булка N-200i (верх)"
        price={50}
        thumbnail={`https://code.s3.yandex.net/react/code/bun-02.png`}
      />
      <ConstructorElement
        text="Краторная булка N-200i (верх)"
        price={50}
        thumbnail={`https://code.s3.yandex.net/react/code/bun-02.png`}
      />
      <ConstructorElement
        text="Краторная булка N-200i (верх)"
        price={50}
        thumbnail={`https://code.s3.yandex.net/react/code/bun-02.png`}
      />
      <ConstructorElement
        text="Краторная булка N-200i (верх)"
        price={50}
        thumbnail={`https://code.s3.yandex.net/react/code/bun-02.png`}
      />
      <ConstructorElement
        text="Краторная булка N-200i (верх)"
        price={50}
        thumbnail={`https://code.s3.yandex.net/react/code/bun-02.png`}
      />
      </div>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        price={200}
        thumbnail={`https://code.s3.yandex.net/react/code/bun-02.png`}
      />
      <div className={`${styles.buttonConteiner} mt-10`}>
<span className={`text text_type_digits-medium mr-10`}>500 <CurrencyIcon type="primary" /></span>
<Button type="primary" size="large">
Оформить заказ
</Button>
</div>
        </section>
    )
}

export default BurgerIngredients;
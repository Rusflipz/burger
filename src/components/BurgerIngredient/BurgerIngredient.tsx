import styles from "./BurgerIngredient.module.css";
import {
  CurrencyIcon,
  Counter
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector, useAppDispatch } from '../../hooks'
import { ingredientsSelector } from "../../services/slice/ingredients";
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import { Iingredients } from '../../utils/Interface'

export function BurgerIngredient({ item }: { item: Iingredients }) {

  const { constructor } = useAppSelector(ingredientsSelector)
  const constructorItems = constructor.burger
  const count = constructorItems.filter((element: { _id: string; }) => element._id === item._id).length;
  const bunCount = 1;

  const location = useLocation()

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: item,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    })
  });

  if (item.type === 'bun') {
    return (
      <Link
        to={{ pathname: `/ingredients/${item._id}`, state: { background1: location } }}
        className={`${styles.card}`}
        key={`${item._id}`}
        ref={dragRef}
      >
        <img
          src={item.image}
          alt={item.name}
        />
        <div className={`${styles.priceConteiner} mt-1 mb-1`}>
          <p className={`text text_type_digits-default`}>{item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.description} text text_type_main-default`}>
          {item.name}
        </p>
        {count > 0 && <Counter count={bunCount} size="default" />}
      </Link>
    )
  } else {
    return (
      <Link
        to={{ pathname: `/ingredients/${item._id}`, state: { background1: location } }}
        className={`${styles.card} mb-8 pl-2 pr-2`}
        key={`${item._id}`}
        ref={dragRef}
      >
        <img
          src={item.image}
          alt={item.name}
        />
        <div className={`${styles.priceConteiner} mt-1 mb-1`}>
          <p className={`text text_type_digits-default`}>{item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.description} text text_type_main-default`}>
          {item.name}
        </p>
        {count > 0 && <Counter count={count} size="default" />}
      </Link>
    )
  }
}

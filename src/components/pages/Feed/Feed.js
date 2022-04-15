import React, { useEffect } from 'react';
import styles from './Feed.module.css';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
  Button,
  Input
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from 'react-redux';
import { postLogin, getOrders } from '../../../services/api';
import { Route, Redirect, useLocation, Link } from 'react-router-dom';
import { orderSelector } from '../../../services/slice/order';
import { ingredientsSelector } from '../../../services/slice/ingredients';
import {
  CurrencyIcon,
  Counter
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ImageUrl } from '../../../images/imagesForOrders/images';
import {
  scorePrice
} from '../../../services/slice/order';

export function FeedPage() {
  const dispatch = useDispatch()

  const location = useLocation()

  const { ingredients } = useSelector(ingredientsSelector);

  const { orders, dataSuccess } = useSelector(orderSelector);

  let done = [];
  let process = [];

  const Orders = (order) => {
    let orderDate = new Date(order.item.createdAt);
    let orderDateHours = orderDate.getHours()
    let orderDateMinutes = orderDate.getMinutes()
    let now = new Date();
    let diff = now - orderDate;
    let result = Math.round(diff / (1000 * 60 * 60 * 24) % 30);
    let day;

    if (result == 0) {
      day = "Сегодня"
    } else if (result == 1) {
      day = "Вчера"
    }
    else if (result >= 2 && result < 5) {
      day = `${result} дня назад`
    }
    else if (result >= 5) {
      day = `${result} дней назад`
    }

    let massage = `${day}, ${orderDateHours}:${orderDateMinutes} i-GMT+3`

    let totalCost = 0;
    // let imgArray = []
    let ingredientIdArray = []
    // Не откуда брать нормальные картинки, но оставил, а вдруг будут ссылки на них

    let length = order.item.ingredients.length
    // if (order.item.ingredients.length < 4) {
    order.item.ingredients.forEach((ingredient) => {
      if (ingredient !== null) {
        let ing = ingredients.find(item => item._id == ingredient);
        let i = 0;

        if (ing.type == 'bun') { // не смог реализовать, чтобы одна булка только оставалась
          ingredientIdArray.unshift(ing._id);
          // for (let i = 0; i < 1; i++) {
          //   console.log(i)
          //   ingredientIdArray.unshift(ing._id)
          // }
        } else {
          ingredientIdArray.unshift(ing._id)
        }
        totalCost = totalCost + ing.price;

      }
    })

    function Image(array) {
      if (length < 4) {
        let img = ImageUrl.find(item => item.id == array.item)
        return <img className={`${styles.image}`} src={img.url}></img>
      } else {
        let img = ImageUrl.find(item => item.id == array.item)
        return <img className={`${styles.image}`} src={img.url}></img>
      }
    }

    return (
      <div className={`${styles.orderBackgraund} pt-6 pb-6 pr-6 pl-6 mb-4`}>
        <Link
          to={{ pathname: `/orders/${order.item._id}`, state: { background2: location } }}
          className={`${styles.orderConteiner}`}>
          <div className={`${styles.orderNumber} mb-6`}>
            <p className={`${styles.number} text text_type_digits-default`}>{`#${order.item.number}`}</p>
            <p className={`${styles.date} text text_type_main-small`}>{massage}</p>
          </div>
          <p className={`${styles.mainText} text text_type_main-medium mb-6`}>{order.item.name}</p>
          <div className={`${styles.orderInfoConteiner}`}>
            <div className={`${styles.imageConteiner}`}>{dataSuccess && ingredientIdArray.map((imageId) => <Image item={imageId} />)}</div>
            <div className={`${styles.priceConteiner}`}><p className={`${styles.price} text text_type_digits-default`}>{totalCost}</p><CurrencyIcon /></div>
          </div>
        </Link>
      </div>)
  }
  let a;

  if (dataSuccess) { // Максимум 15 заказов в окне
    a = orders.orders.slice(0, 15)
  }

  function OrdersNumberDone(order) {
    if (order.item.status == 'done') {
      return <p className={`${styles.ordersDoneNumber} text text_type_digits-default`}>{order.item.number}</p>
    } else {
      return <></>
    }


  }

  function OrdersNumberProcess(order) {
    if (order.item.status !== 'done') {
      return <p className={`${styles.ordersProcessNumber} text text_type_digits-default`}>{order.item.number}</p>

    } else {
      return <></>
    }
  }

  return (
    <>
      <p className={`${styles.title} text text_type_main-large`}>Лента заказов</p>
      <div className={`${styles.mainConteiner}`}>
        <div className={`${styles.feedLent} mr-15`}>
          {dataSuccess && orders.orders.map((order) =>
            <Orders item={order} key={order._id} />)}
        </div>
        <div className={`${styles.infoLent}`}>
          <div className={`${styles.ordersInfo} mb-15`}>
            <div className={`${styles.ordersDone}`}>
              <p className={`text text_type_main-medium mb-6`}>Готовы:</p>
              <div className={`${styles.ordersDoneNumbers}`}>
                {dataSuccess && a.map((order) =>
                  <OrdersNumberDone item={order} key={order._id} />)}
              </div>
            </div>
            <div className={`${styles.ordersProcess}`}>
              <p className={`text text_type_main-medium mb-6`}>В работе:</p>
              <div className={`${styles.ordersDoneNumbers}`}>
                {dataSuccess && a.map((order) =>
                  <OrdersNumberProcess item={order} key={order._id} />)}
              </div>
            </div>
          </div>
          <div className={`${styles.allOrdersDone} mb-15`}>
            <p className={`${styles.ordersDoneInfo} text text_type_main-medium`}>Выполнено за все время:</p>
            {dataSuccess ? <p className={`${styles.ordersDoneValue} text text_type_digits-large`}>{orders.total}</p> : <p className={``}>{ }</p>}
          </div>
          <div className={`${styles.todayOrdersDone}`}>
            <p className={`${styles.ordersDoneInfo} text text_type_main-medium`}>Выполнено за сегодня:</p>
            {dataSuccess ? <p className={`${styles.ordersDoneValue} text text_type_digits-large`}>{orders.totalToday}</p> : <p className={``}>{ }</p>}
          </div>
        </div>
      </div>
    </>
  );
} 
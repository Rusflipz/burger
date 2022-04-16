import styles from './ProfileOrders.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import Order, { orderSelector } from '../../../services/slice/order';
import { ingredientsSelector } from '../../../services/slice/ingredients';
import { ImageUrl } from '../../../images/imagesForOrders/images';
import {
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function ProfileOrders() {
console.log('nen')
  const location = useLocation()

  const { ingredients } = useSelector(ingredientsSelector);

  const { userOrders, userDataSuccess } = useSelector(orderSelector);

  function Order(order) {
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

    let ingredientIdArray = []

    let ingredient = []

    let length = order.item.ingredients.length

    order.item.ingredients.forEach((ingredient) => {
      if (ingredient !== null) {
        let ing = ingredients.find(item => item._id == ingredient);
        let i = 0;
        ingredientIdArray.unshift(ing._id);
        totalCost = totalCost + ing.price;
      }
    })

    let resultReduce = ingredientIdArray.reduce(function (acc, cur) {
      if (!acc.hash[cur]) {
        acc.hash[cur] = { [cur]: 1 };
        acc.map.set(acc.hash[cur], 1);
        acc.result.push(acc.hash[cur]);
      } else {
        acc.hash[cur][cur] += 1;
        acc.map.set(acc.hash[cur], acc.hash[cur][cur]);
      }
      return acc;
    }, {
      hash: {},
      map: new Map(),
      result: []
    });

    let res = resultReduce.result.sort(function (a, b) {
      return resultReduce.map.get(b) - resultReduce.map.get(a);
    });

    ingredient = res.reverse()

    let moreActive = false;
    let more;

    if (ingredient.length > 5) {
      more = ingredient.length - 5
      moreActive = true;
      ingredient.splice(4, ingredient.length - 5)
      ingredient.push({ '0': 0 })
    } else {
    }

    function Image(array) {
      let id = Object.keys(array.item)[0]
      let img = ImageUrl.find(item => item.id == id)
      return <img className={`${styles.image}`} src={img.url}></img>
    }

    return (
      <div className={`${styles.orderBackgraund} pt-6 pb-6 pr-6 pl-6 mb-4`}>
        <Link
          to={{ pathname: `profile/orders/${order.item._id}`, state: { background3: location } }}
          className={`${styles.orderConteiner}`}>
          <div className={`${styles.orderNumber} mb-6`}>
            <p className={`${styles.number} text text_type_digits-default`}>{`#${order.item.number}`}</p>
            <p className={`${styles.date} text text_type_main-small`}>{massage}</p>
          </div>
          <p className={`${styles.mainText} text text_type_main-medium mb-6`}>{order.item.name}</p>
          <div className={`${styles.orderInfoConteiner}`}>
            <div className={`${styles.imageConteiner}`}>{userDataSuccess && ingredient.map((imageId) => <Image item={imageId} />)}{moreActive && <p className={`${styles.more} text text_type_digits-default`}>{`+${more}`}</p>}</div>
            <div className={`${styles.priceConteiner}`}><p className={`${styles.price} text text_type_digits-default`}>{totalCost}</p><CurrencyIcon /></div>
          </div>
        </Link>
      </div>)
  }

  if (userDataSuccess) {

    let arr = []

    userOrders.orders.map((order) => {
      arr.push(order)
    })
    const reversed = arr.reverse();
    return <> {userDataSuccess && reversed.map((order) => <Order item={order} key={order._id} />)} </>
  } else
    return <></>
}

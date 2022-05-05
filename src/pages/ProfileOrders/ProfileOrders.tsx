import styles from './ProfileOrders.module.css';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { orderSelector } from '../../services/slice/order';
import { ingredientsSelector } from '../../services/slice/ingredients';
import { ImageUrl } from '../../images/imagesForOrders/images';
import {
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getCookie } from '../../services/Cookie';
import { useEffect } from 'react';
import { postLogOut } from '../../services/api';
import { getUserOrders } from '../../services/WebSocet';
import { Loading } from '../Loading/loading';
import { Error } from '../Error/error';
import { Iorder } from '../../utils/Interface';


export function ProfileOrders() {
  const location = useLocation()

  useEffect(() => {
    dispatch(getUserOrders('connect'))
    return () => {
      dispatch(getUserOrders('disconnect'))
    }
  }, [])

  const { ingredients } = useSelector(ingredientsSelector);

  const { userOrders, userDataSuccess, loadingUserOrder, errorUserOrder } = useSelector(orderSelector);

  const dispatch = useDispatch();

  let refreshToken = getCookie('refreshToken')

  function Order(order: { item: Iorder }) {

    let orderDate: any = new Date(order.item.createdAt);
    let orderDateHours = orderDate.getHours()
    let orderDateMinutes = orderDate.getMinutes()
    let now: any = new Date();
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

    let ingredientIdArray: Array<string> = []

    let ingredient = []

    order.item.ingredients.forEach((ingredient: Array<string> | null) => {
      if (ingredient !== null) {
        let ing = ingredients.find((item: { _id: string[]; }) => item._id == ingredient);
        let i = 0;
        ingredientIdArray.unshift(ing._id);
        totalCost = totalCost + ing.price;
      }
    })

    let resultReduce = ingredientIdArray.reduce(function (acc: {
      hash: any;
      map: any;
      result: any;
    }, cur) {
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

    let res = resultReduce.result.sort(function (a: Array<string>, b: Array<string>) {
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

    function Image(array: { item: {}; }) {
      let id = Object.keys(array.item)[0]
      let img = ImageUrl.find(item => item.id == id)
      if (img !== undefined) {
        return <img className={`${styles.image}`} src={img.url}></img>
      } else return <></>
    }

    return (
      <div className={`${styles.orderBackgraund} pt-6 pb-6 pr-6 pl-6 mb-4`}>
        <Link
          to={{ pathname: `/profile/orders/${order.item.number}`, state: { background3: location } }}
          className={`${styles.orderConteiner}`}>
          <div className={`${styles.orderNumber} mb-6`}>
            <p className={`${styles.number} text text_type_digits-default`}>{`#${order.item.number}`}</p>
            <p className={`${styles.date} text text_type_main-small`}>{massage}</p>
          </div>
          <p className={`${styles.mainText} text text_type_main-medium mb-6`}>{order.item.name}</p>
          <div className={`${styles.orderInfoConteiner}`}>
            <div className={`${styles.imageConteiner}`}>{userDataSuccess && ingredient.map((imageId: {}) => <Image item={imageId} key={Object.keys(imageId)[0]} />)}{moreActive && <p className={`${styles.more} text text_type_digits-default`}>{`+${more}`}</p>}</div>
            <div className={`${styles.priceConteiner}`}><p className={`${styles.price} text text_type_digits-default`}>{totalCost}</p><CurrencyIcon type='primary' /></div>
          </div>
        </Link>
      </div>)
  }

  if (loadingUserOrder) return <Loading />
  if (errorUserOrder) return <Error />

  if (userDataSuccess) {
    let arr: Array<any> = []
    userOrders.orders.map((order: any) => {
      arr.push(order)
    })

    return <>
      <div className={styles.wrapper}>
        <div className={`${styles.links_box} mr-15`}>
          <NavLink exact to={'/profile'} activeClassName={`${styles.active}`} className={`${styles.link} text text_type_main-medium`} >Профиль</NavLink>
          <NavLink
            exact
            to={"/profile/orders"}
            activeClassName={`${styles.active}`}
            className={`${styles.link} text text_type_main-medium`}>История заказов</NavLink>
          <NavLink exact to='/' activeClassName={`${styles.active}`} className={`${styles.link} text text_type_main-medium mb-20`}
            onClick={() => dispatch(postLogOut(refreshToken))}>Выход</NavLink>
          <p className={`${styles.text} `}>В этом разделе вы можете
            изменить свои персональные данные</p>
        </div>
        <div className={`${styles.ordersConteiner}`}>
          {userDataSuccess && arr.map((order) => <Order item={order} key={order._id} />)}
        </div>
      </div>
    </>
  } else
    return <></>
}

import React from 'react';
import styles from './Feed.module.css';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
  Button,
  Input
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { postLogin } from '../../../services/api';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { profileSelector } from '../../../services/slice/profile';


export function FeedPage() {
  const dispatch = useDispatch()

  const { isUserLoaded } = useSelector(profileSelector);

  // let mailInput = React.createRef();
  // let passwordInput = React.createRef();

  // function handleClick(e) {
  //   e.preventDefault();
  //   mailInput.current.focus();
  //   passwordInput.current.focus();
  //   let info = {
  //     mail: mailInput.current.value,
  //     password: passwordInput.current.value,
  //   }
  //   dispatch(postLogin(info))
  // }

  // let location = useLocation();

  // if (isUserLoaded) {
  //   return (
  //     <Redirect
  //       to={location.state?.from || '/'}
  //     />
  //   );
  // }


  const order = () => {
    <div className={`${styles.orderConteiner}`}>
      <div className={`${styles.orderNumber}`}>
        <p className={``}></p>
        <p className={``}></p>
      </div>
      <p className={`${styles.mainText}`}></p>
      <div className={`${styles.orderInfoConteiner}`}>
        <div className={`${styles.imageConteiner}`}></div>
        <p className={`${styles.price}`}></p>
      </div>
    </div>
  }

  return (
    <>
      <p className={`${styles.title} text text_type_main-large`}>Лента заказов</p>
      <div className={`${styles.mainConteiner}`}>
        <div className={`${styles.feedLent} mr-15`}>

        </div>
        <div className={`${styles.infoLent}`}>
          <div className={`${styles.ordersInfo}`}>
            <div className={`${styles.ordersDone}`}>
              <p className={``}></p>
              <p className={``}></p>
            </div>
            <div className={`${styles.ordersProcess}`}>
              <p className={``}></p>
              <p className={``}></p>
            </div>
          </div>
          <div className={`${styles.allOrdersDone}`}>
            <p className={``}></p>
            <p className={``}></p>
          </div>
          <div className={`${styles.todayOrdersDone}`}>
            <p className={``}></p>
            <p className={``}></p>
          </div>
        </div>
      </div>
    </>
  );
} 
import styles from './UserOrderPage.module.css';
import { ingredientsSelector, } from '../../services/slice/ingredients';
import { orderSelector, } from '../../services/slice/order';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';
import { OrederDetail } from '../OrederDetail/OrederDetail';
import { current } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Loading } from '../Loading/loading';
import { Error } from '../Error/error';
import {getUserOrders} from '../../services/WebSocet'

export const UserOrderPage = () => {
  
  const dispatch = useDispatch();
  useEffect(() =>{
  dispatch(getUserOrders())
  },[])

  const { id } = useParams();
  const { orders, userOrders1, userDataSuccess, loadingUserOrder, errorUserOrder } = useSelector(orderSelector);

  const currentOrder = useMemo(
    () => userOrders1.find((el) => el.number == id),
    [userOrders1, id]
  );

  if (loadingUserOrder) return <Loading />
  if (errorUserOrder) return <Error />

  if (userDataSuccess){
  return (
    <>{currentOrder &&
      <div className={styles.main}>
        <OrederDetail item={userOrders1} />
      </div>}
    </>
  )} else {
    return <></>
  }

}


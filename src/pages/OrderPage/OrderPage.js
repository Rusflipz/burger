import styles from './OrderPage.module.css';
import { orderSelector, } from '../../services/slice/order';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { OrederDetail } from '../../components/OrederDetail/OrederDetail';
import { Loading } from '../Loading/loading';
import { Error } from '../Error/error';
import { getOrders } from '../../services/WebSocet'

export const OrderPage = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders())
  }, [])

  const { id } = useParams();
  const { orders, orders1, dataSuccess, loadingOrder, errorOrder } = useSelector(orderSelector);


  const currentOrder = useMemo(
    () => orders1.find((el) => el.number == id),
    [orders1, id]
  );


  if (loadingOrder) return <Loading />
  if (errorOrder) return <Error />

  return (
    <>{currentOrder &&
      <div className={styles.main}>
        <OrederDetail item={orders1} />
      </div>}
    </>
  )

}


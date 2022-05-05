import styles from './UserOrderPage.module.css';
import { orderSelector, } from '../../services/slice/order';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { OrederDetail } from '../../components/OrederDetail/OrederDetail';
import { Loading } from '../Loading/loading';
import { Error } from '../Error/error';
import { getUserOrders } from '../../services/WebSocet'

export const UserOrderPage = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders('connect'))
    return () => {
      dispatch(getUserOrders('disconnect'))
    }
  }, [])

  const { id }: { id: string } = useParams();
  const { userOrders1, userDataSuccess, loadingUserOrder, errorUserOrder } = useSelector(orderSelector);

  const currentOrder = useMemo(
    () => userOrders1.find((el: { number: string; }) => el.number == id),
    [userOrders1, id]
  );

  if (loadingUserOrder) return <Loading />
  if (errorUserOrder) return <Error />

  if (userDataSuccess) {
    return (
      <>{currentOrder &&
        <div className={styles.main}>
          <OrederDetail item={userOrders1} />
        </div>}
      </>
    )
  } else {
    return <></>
  }

}


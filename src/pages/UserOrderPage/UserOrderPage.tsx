import styles from './UserOrderPage.module.css';
import { webSoketSelector, wsClose, wsOpen, } from '../../services/slice/webSoket';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { OrederDetail } from '../../components/OrederDetail/OrederDetail';
import { Loading } from '../Loading/loading';
import { Error } from '../Error/error';
import { getCookie } from '../../services/Cookie';

export const UserOrderPage = () => {

  const dispatch = useAppDispatch();

  let token = getCookie('token')

  useEffect(() => {
    dispatch(wsOpen({ token: token }))
    return () => {
      dispatch(wsClose())
    }
  },
    []
  );

  const { id }: { id: string } = useParams();
  const { orders, dataSuccess, loadingOrder, errorOrder, orders1 } = useAppSelector(webSoketSelector);

  const currentOrder = useMemo(
    () => orders1.find((el: { number: string; }) => el.number == id),
    [orders1, id]
  );

  if (loadingOrder) return <Loading />
  if (errorOrder) return <Error />

  if (dataSuccess) {
    return (
      <>{currentOrder &&
        <div className={styles.main}>
          <OrederDetail item={orders1} />
        </div>}
      </>
    )
  } else {
    return <></>
  }

}


import styles from './OrderPage.module.css';
import { webSoketSelector, wsClose, wsOpen } from '../../services/slice/webSoket';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { OrederDetail } from '../../components/OrederDetail/OrederDetail';
import { Loading } from '../Loading/loading';
import { Error } from '../Error/error';

export const OrderPage = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(wsOpen({ token: null }))
    return () => {
      dispatch(wsClose())
    }
  },
    []
  );

  const { id }: { id: string } = useParams();
  const { orders1, loadingOrder, errorOrder } = useAppSelector(webSoketSelector);


  const currentOrder = useMemo(
    () => orders1.find((el: { number: string; }) => el.number == id),
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


import styles from './OrderPage.module.css';
import { webSoketSelector, wsClose, wsOpen } from '../../services/slice/webSoket';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { OrederDetail } from '../../components/OrederDetail/OrederDetail';
import { Loading } from '../Loading/loading';
import { Error } from '../Error/error';
import { wsUrl } from '../../utils/constants';

export const OrderPage = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(wsOpen({ url: `${wsUrl}/all` }))
    return () => {
      dispatch(wsClose())
    }
  },
    []
  );

  const { id }: { id: string } = useParams();
  const { orders1, loadingOrder, errorOrder } = useAppSelector(webSoketSelector);


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


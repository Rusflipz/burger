import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { ingredientsSelector } from '../../services/slice/ingredients';
import { orderSelector } from '../../services/slice/order';
import { fetchIngredients } from '../../services/api';
import { Loading } from '../../pages/Loading/loading';
import { Error } from '../../pages/Error/error';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { LoginPage } from '../../pages/Login/Login';
import { RegistrationPage } from '../../pages/Registration/Registration';
import { Forgotpassword } from '../../pages/Forgot-password/Forgot-password';
import { Resetpassword } from '../../pages/Reset-password/Reset-password';
import { Profile } from '../../pages/Profile/Profile';
import { ProtectedRouteProfile } from '../ProtectedRoute/ProtectedRouteProfile';
import { IngredientPage } from '../../pages/IngredientPage/IngredientPage';
import { ProtectedRouteLogin } from '../ProtectedRoute/ProtectedRouteLogin';
import { ProtectedRouteRegistration } from '../ProtectedRoute/ProtectedRouteRegistration';
import { ProtectedForgotPassword } from '../ProtectedRoute/ProtectedForgotPassword';
import { ProtectedResetPassword } from '../ProtectedRoute/ProtectedResetPassword';
import { ProtectedRouteProfileOrders } from '../ProtectedRoute/ProtectedRouteProfileOrders';
import { ProtectedUserOrder } from '../ProtectedRoute/ProtectedUserOrder';
import { getCookie } from '../../services/Cookie';
import Modal from '../Modal/Modal';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';
import { FeedPage } from '../../pages/Feed/Feed';
import { OrederDetail } from '../OrederDetail/OrederDetail';
import { OrderPage } from '../../pages/OrderPage/OrderPage';
import { UserOrderPage } from '../../pages/UserOrderPage/UserOrderPage';
import { ProfileOrders } from '../../pages/ProfileOrders/ProfileOrders'

function App() {
  const { loading, error, isUserLoaded } = useSelector(ingredientsSelector);
  const { orders1, userOrders1, orders, userOrders } = useSelector(orderSelector);

  const dispatch = useDispatch()

  const history = useHistory();
  const location = useLocation();

  const background1 = location.state && location.state.background1;
  const background2 = location.state && location.state.background2;
  const background3 = location.state && location.state.background3;

  const closeModal = () => {
    history.goBack();
  };

  useEffect(() => {
    dispatch(fetchIngredients())
  }, [dispatch]);


  function content() {
    if (loading) return <Loading />
    if (error) return <Error />
    return <>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </>
  }

  return (
    <>
      <div className={styles.App}>
        <AppHeader />
        <Switch location={background1 || background2 || background3 || location}>
          <Route path="/login" exact={true}>
            <ProtectedRouteLogin>
              <LoginPage />
            </ProtectedRouteLogin>
          </Route>
          <Route path="/registration" exact={true}>
            <ProtectedRouteRegistration>
              <RegistrationPage />
            </ProtectedRouteRegistration>
          </Route>
          <Route path="/forgot-password" exact={true}>
            <ProtectedForgotPassword>
              <Forgotpassword />
            </ProtectedForgotPassword>
          </Route>
          <Route path="/reset-password" exact={true}>
            <ProtectedResetPassword>
              <Resetpassword />
            </ProtectedResetPassword>
          </Route>
          <Route path="/profile" exact={true}>
            <ProtectedRouteProfile path="/" >
              <Profile />
            </ProtectedRouteProfile>
          </Route>
          <Route path="/ingredients/:id" exact={true}>
            <IngredientPage />
          </Route>
          <Route path="/feed/:id" exact={true}>
            <OrderPage />
          </Route>
          <Route path="/profile/orders/:id" exact={true}>
            <ProtectedUserOrder>
              <UserOrderPage />
            </ProtectedUserOrder>
          </Route>
          <Route path="/feed" exact={true}>
            <FeedPage />
          </Route>
          <Route path="/profile/orders" exact={true}>
            <ProtectedRouteProfileOrders>
              <ProfileOrders />
            </ProtectedRouteProfileOrders>
          </Route>
          <Route path="/" exact={true}>
            <main className={styles.main}>
              {content()}
            </main>
          </Route>
        </Switch>
      </div>

      {
        background1 && (<>
          <Route path="/ingredients/:id" exact={true}>
            <Modal onClose={closeModal}>
              <IngredientDetails />
            </Modal>
          </Route>
        </>)
      }

      {
        background2 && (<>
          <Route path="/feed/:id" exact={true}>
            <Modal onClose={closeModal}>
              <OrederDetail item={orders1} />
            </Modal>
          </Route>
        </>)
      }

      {
        background3 && (<>
          <Route path="/profile/orders/:id" exact={true}>
            <Modal onClose={closeModal}>
              <OrederDetail item={userOrders1} />
            </Modal>
          </Route>
        </>)
      }


    </>
  )
}

export default App;

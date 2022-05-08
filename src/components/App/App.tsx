import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../../hooks'
import { ingredientsSelector } from '../../services/slice/ingredients';
import { webSoketSelector } from '../../services/slice/webSoket';
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
import { IngredientPage } from '../../pages/IngredientPage/IngredientPage';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import Modal from '../Modal/Modal';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';
import { FeedPage } from '../../pages/Feed/Feed';
import { OrederDetail } from '../OrederDetail/OrederDetail';
import { OrderPage } from '../../pages/OrderPage/OrderPage';
import { UserOrderPage } from '../../pages/UserOrderPage/UserOrderPage';
import { ProfileOrders } from '../../pages/ProfileOrders/ProfileOrders'

function App() {
  const { loading, error } = useAppSelector(ingredientsSelector);
  const { orders1 } = useAppSelector(webSoketSelector);

  const dispatch = useAppDispatch()

  interface LocationState {
    pathname: string;
    search: string;
    hash: string;
    state: object | undefined;
    background2: LocationState;
    background3: LocationState;
    background1: LocationState;
  }

  const history = useHistory();
  const location = useLocation<LocationState>();

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
            <ProtectedRoute>
              <LoginPage />
            </ProtectedRoute>
          </Route>
          <Route path="/registration" exact={true}>
            <ProtectedRoute>
              <RegistrationPage />
            </ProtectedRoute>
          </Route>
          <Route path="/forgot-password" exact={true}>
            <ProtectedRoute>
              <Forgotpassword />
            </ProtectedRoute>
          </Route>
          <Route path="/reset-password" exact={true}>
            <ProtectedRoute>
              <Resetpassword />
            </ProtectedRoute>
          </Route>
          <Route path="/profile" exact={true}>
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          </Route>
          <Route path="/ingredients/:id" exact={true}>
            <IngredientPage />
          </Route>
          <Route path="/feed/:id" exact={true}>
            <OrderPage />
          </Route>
          <Route path="/profile/orders/:id" exact={true}>
            <UserOrderPage />
          </Route>
          <Route path="/feed" exact={true}>
            <FeedPage />
          </Route>
          <Route path="/profile/orders" exact={true}>
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
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
              <OrederDetail item={orders1} />
            </Modal>
          </Route>
        </>)
      }


    </>
  )
}

export default App;

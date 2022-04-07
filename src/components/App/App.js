import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { ingredientsSelector } from '../../services/slice/ingredients';
import { fetchIngredients } from '../../services/api';
import { Loading } from '../Loading/loading';
import { Error } from '../Error/error';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LoginPage } from '../pages/Login/Login';
import { RegistrationPage } from '../pages/Registration/Registration';
import { Forgotpassword } from '../pages/Forgot-password/Forgot-password';
import { Resetpassword } from '../pages/Reset-password/Reset-password';
import { Profile } from '../pages/Profile/Profile';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { IngredientPage } from '../IngredientPage/IngredientPage';

function App() {
  const { loading, error } = useSelector(ingredientsSelector);
  const dispatch = useDispatch()

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
    <div className={styles.App}>

      <Router>
        <AppHeader />
        <Switch>
            <Route path="/login" exact={true}>
              <LoginPage />
            </Route>
            <Route path="/registration" exact={true}>
              <RegistrationPage />
            </Route>
            <Route path="/forgot-password" exact={true}>
              <Forgotpassword />
            </Route>
            <Route path="/reset-password" exact={true}>
              <Resetpassword />
            </Route>
          <Route path="/profile" exact={true}>
            <ProtectedRoute path="/">
              <Profile />
            </ProtectedRoute>
          </Route>
          <Route path="/ingredients/:id" >
              <IngredientPage />
          </Route>
          <Route path="/" exact={true}>
            <main className={styles.main}>
              {content()}
            </main>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;

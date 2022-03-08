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
      <AppHeader />
      <main className={styles.main}>
        {content()}
      </main>
    </div>
  )
}

export default App;

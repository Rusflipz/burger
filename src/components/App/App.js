import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import React from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";

function App() {
  const [state, setState] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [children, setChildren] = React.useState(<></>);

  React.useEffect(() => {
    const apiUrl = "https://norma.nomoreparties.space/api/ingredients";
    fetch(`${apiUrl}`)
      .then(checkResponse)
      .then((data) => setState(data.data))
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const updateData = (value) => {
    setChildren(IngredientDetails(value={value}));
    openModal();
  };

  const openOrder = () => {
    setChildren(OrderDetails);
    openModal();
  };

  if (state !== null) {
    return (
      <div className={styles.App}>
        <Modal isOpen={isOpen} closeModal={closeModal} children={children} />
        <AppHeader />
        <main className={styles.main}>
          <BurgerIngredients state={state} updateData={updateData} />
          <BurgerConstructor openOrder={openOrder} />
        </main>
      </div>
    );
  } else {
    return (
      <div className={`${styles.loading} pt-4`}>
        <Logo />
        <p className={`text_type_main-large ${styles.loadingText}`}>
          Загрузка...
        </p>
      </div>
    );
  }
}

export default App;

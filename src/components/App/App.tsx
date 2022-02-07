import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import Modal from '../Modal/Modal';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'

function App() {
    const [state, setState] = React.useState(null);
    const [isOpen, setIsOpen] = React.useState(false);
    // const [isLoad, setIsLoad] = React.useState(false);
    React.useEffect(() => {
const apiUrl = 'https://norma.nomoreparties.space/api/ingredients'

        fetch(`${apiUrl}`)
            .then(response => response.json())
            .then(data => setState(data.data))
            .catch(error => {
                // this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            })
    }, [])


    if (state !== null) {
    return  (
        <>
        <ModalOverlay isOpen={isOpen}/>
        <div className = {styles.App} >
        <Modal />   
        <AppHeader />
        <main className = {styles.main}>
        <BurgerConstructor state={state} />
        <BurgerIngredients state={state} />
        </main>
        </div>
        </>
    )
    } else {
        return (<>
        <div className = {`${styles.loading} pt-4`}>
        <Logo />
        <p className = {`text_type_main-large ${styles.loadingText}`}>Загрузка...</p>
        </div>
        </>)
    }
}

export default App;
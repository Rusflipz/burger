import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import Modal from '../Modal/Modal';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'



function App() {
    const [data, setData] = React.useState(null);
    const [state, setState] = React.useState(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const [typeOfModal, setTypeOfModal] = React.useState('order');
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

    const setType = (value: any) => {
if (value === 'ingredient'){
    setTypeOfModal(value)
}
    else if(value === 'order') {
        setTypeOfModal(value)
    }
}

    const ecs = (e: any) => {
        if (e.key === "Escape"){ 
             closeModal()
        }
    }

    function closeModal(){
        setIsOpen(false);
        document.removeEventListener('keydown', function (e) {
            ecs(e)
            //Слушатель не хочет сниматься
     }, false)
    }

    function openModal(){
        setIsOpen(true);
        document.addEventListener('keydown', function (e) {
            ecs(e)
     }, false)
    }

    const updateData = (value: any) => {
        setData(value)
        setType('ingredient')
        openModal()
    }

    const openOrder = (value: any) => {
        setType('order')
        openModal()
    }

    if (state !== null) {
    return  (
        <>
        <ModalOverlay isOpen={isOpen} closeModal={closeModal}/>
        <div className = {styles.App} >
        <Modal typeOfModal={typeOfModal} ecs={ecs} data={data} isOpen={isOpen} closeModal={closeModal} />
        <AppHeader />
        <main className = {styles.main}>
        <BurgerConstructor setType={setType} updateData={updateData} state={state} />
        <BurgerIngredients state={state} openOrder={openOrder}  />
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
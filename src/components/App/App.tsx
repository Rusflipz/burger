import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import Modal from '../Modal/Modal';
import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'


function App() {
    const [data, setData] = React.useState(null);
    const [state, setState] = React.useState(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const [typeOfModal, setTypeOfModal] = React.useState('order');
    React.useEffect(() => {
        const apiUrl = 'https://norma.nomoreparties.space/api/ingredients'
        fetch(`${apiUrl}`)
            .then(checkResponse)
            .then(data => setState(data.data))
            .catch(error => {
                console.error('There was an error!', error);
            })
    }, [])


    function checkResponse(res: any) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)

    }

    const setType = (value: any) => {
        if (value === 'ingredient') {
            setTypeOfModal(value)
        }
        else if (value === 'order') {
            setTypeOfModal(value)
        }
    }

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
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
        return (
            <>
                <div className={styles.App} >
                    <Modal typeOfModal={typeOfModal} data={data} isOpen={isOpen} closeModal={closeModal} />
                    <AppHeader />
                    <main className={styles.main}>
                        <BurgerIngredients updateData={updateData} state={state} />
                        <BurgerConstructor state={state} openOrder={openOrder} />
                    </main>
                </div>
            </>
        )
    } else {
        return (<>
            <div className={`${styles.loading} pt-4`}>
                <Logo />
                <p className={`text_type_main-large ${styles.loadingText}`}>Загрузка...</p>
            </div>
        </>)
    }
}

export default App;
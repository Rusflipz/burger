import styles from './ModalOverlay.module.css';
import React, { useEffect } from 'react';
import {} from '@ya.praktikum/react-developer-burger-ui-components'

function ModalOverlay(props: {isOpen: boolean}) {
    console.log(props.isOpen)
    const [current, setCurrent] = React.useState('one');

    return (
        <section hidden id='overlay' className= {`${styles.ModalOverlay}`}></section>
    )
}

export default ModalOverlay;
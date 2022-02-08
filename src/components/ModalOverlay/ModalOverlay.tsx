import './ModalOverlay.css';
import React, { useEffect } from 'react';
import { } from '@ya.praktikum/react-developer-burger-ui-components'

function ModalOverlay(props: { isOpen: boolean, closeModal: any }) {
    const [current, setCurrent] = React.useState('one');
    let className = 'ModalOverlay';




    if (props.isOpen === true) {
        className += ' ModalOverlay-active'
    } else {
        className = 'ModalOverlay'
    }

    if (props.isOpen === true) {
        return (
            <section onClick={props.closeModal} id='overlay' className={`${className}`}></section>
        )
    } else {
        return (
            <></>
        )
    }
}

export default ModalOverlay;
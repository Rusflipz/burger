import styles from './Modal.module.css';
import { MouseEventHandler, ReactChild, ReactFragment, ReactPortal, useEffect } from 'react';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { getUserOrders } from '../../services/WebSocet';
import { getOrders } from '../../services/WebSocet';
import { useSelector, useDispatch } from "react-redux";
import React from 'react';


function Modal(props: { onClose: Function; children: ReactChild | ReactFragment | ReactPortal; }) {
    const dispatch = useDispatch();
    useEffect(() => {
        const closeByEscape = (e: { key: string; }) => {
            if (e.key === 'Escape') {
                props.onClose()
            }
        }
        document.addEventListener('keydown', closeByEscape)
        return () => document.removeEventListener('keydown', closeByEscape)
    }, [])

    const modalRoot = document.getElementById('modals')
    if (modalRoot !== null) {
        // try {
        return ReactDOM.createPortal(
            <>
                <ModalOverlay onClose={() => props.onClose} />
                <section className={`${styles.Modal} pl-10 pr-10 pt-10`}>
                    <div className={`${styles.ModalCloseIcon}`}>
                        <CloseIcon type="primary" onClick={() => props.onClose} />
                    </div>
                    {props.children}
                </section>
            </>
            , modalRoot)
    } else return <></>
    // } catch (error) {
    //     console.error("React render error: ", error);
    //     return null
    // }
}

export default Modal;

// Modal.propTypes = {
//     children: PropTypes.object.isRequired,
//     onClose: PropTypes.func.isRequired
// };
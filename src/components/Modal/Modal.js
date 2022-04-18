import styles from './Modal.module.css';
import { useEffect } from 'react';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { getUserOrders } from '../../services/WebSocet';
import { getOrders } from '../../services/WebSocet';
import { useSelector, useDispatch } from "react-redux";


function Modal(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        const closeByEscape = (e) => {
            if (e.key === 'Escape') {
                props.onClose()
            }
        }
        document.addEventListener('keydown', closeByEscape)
        return () => document.removeEventListener('keydown', closeByEscape)
    }, [])

    const modalRoot = document.getElementById('modals')
    try {
        return ReactDOM.createPortal(
            <>
                <ModalOverlay onClick={props.onClose} />
                <section className={`${styles.Modal} pl-10 pr-10 pt-10`}>
                    <div className={`${styles.ModalCloseIcon}`}>
                        <CloseIcon type="primary" onClick={props.onClose} />
                    </div>
                    {props.children}
                </section>
            </>
            , modalRoot)
    } catch (error) {
        console.error("React render error: ", error);
    }
}

export default Modal;

Modal.propTypes = {
    children: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
};
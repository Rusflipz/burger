import styles from './Modal.module.css';
import { ReactChild, ReactFragment, ReactPortal, useEffect } from 'react';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ReactDOM from 'react-dom';

function Modal(props: { onClose: Function; children: ReactChild | ReactFragment | ReactPortal; }) {
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
        return ReactDOM.createPortal(
            <>
                <ModalOverlay onClose={() => props.onClose()} />
                <section className={`${styles.Modal} pl-10 pr-10 pt-10`}>
                    <div className={`${styles.ModalCloseIcon}`}>
                        <CloseIcon type="primary" onClick={() => props.onClose()} />
                    </div>
                    {props.children}
                </section>
            </>
            , modalRoot)
    } else return <></>
}

export default Modal;

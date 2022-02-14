import './Modal.css';
import React from 'react';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function Modal(props) {
    let className = 'Modal';

    React.useEffect(() => {
        const closeByEscape = (e) => {
            if (e.key === 'Escape') {
                props.closeModal();
            }
        }
        document.addEventListener('keydown', closeByEscape)
        return () => document.removeEventListener('keydown', closeByEscape)
    }, [])

    if (props.isOpen === true) {
        className += ' Modal-active'
    } else {
        className = 'Modal'
    }
    const modalRoot = document.getElementById('modals')
    return ReactDOM.createPortal(
        <>
            <ModalOverlay isOpen={props.isOpen} closeModal={props.closeModal} />
            <section className={`${className} pl-10 pr-10 pt-10`}>
                <div className={`Modal-close-icon`}>
                    <CloseIcon type="primary" onClick={props.closeModal} />
                </div>
                {props.children}
            </section>
        </>
        , modalRoot)
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
};

export default Modal;
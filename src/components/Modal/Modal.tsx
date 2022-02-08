import './Modal.css';
import React from 'react';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ReactDOM from 'react-dom';

function Modal(props: any) {
    const [option, setOption] = React.useState('construct');
    const modalRef = React.useRef(null);
    let className = 'Modal';

    React.useEffect(() => {
        const closeByEscape = (e: any) => {
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
    return modalRoot ? ReactDOM.createPortal(
        <>
            <ModalOverlay isOpen={props.isOpen} closeModal={props.closeModal} />
            <section ref={modalRef} className={`${className} pl-10 pr-10 pt-10`}>
                <div className={`Modal-close-icon`}>
                    <CloseIcon type="primary" onClick={props.closeModal} />
                </div>
                {props.typeOfModal === 'ingredient'
                    ? <IngredientDetails data={props.data} />
                    : <OrderDetails data={props.data} />
                }

            </section>
        </>
        , modalRoot) : null
}



export default Modal;
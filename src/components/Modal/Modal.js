import './Modal.css';
import { useEffect } from 'react';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ReactDOM from 'react-dom';
import { ingredientsSelector, removeIngredientСomponents, closeOrderСomponentsModal } from "../../services/slice/ingredients";
import { useSelector, useDispatch } from "react-redux";
import { IngredientDetails } from "../IngredientDetails/IngredientDetails";
import { OrderDetails } from "../OrderDetails/OrderDetails"

function Modal() {
    const { ingredientСomponents, isModalOpen, ModalType, orderNumber, orderName } = useSelector(ingredientsSelector);
    const dispatch = useDispatch();
    let className = 'Modal';

    function closeModal() {
        dispatch(removeIngredientСomponents())
        dispatch(closeOrderСomponentsModal())
    }

    useEffect(() => {
        const closeByEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal()
            }
        }
        document.addEventListener('keydown', closeByEscape)
        return () => document.removeEventListener('keydown', closeByEscape)
    }, [])

    if (isModalOpen === true) {
        className += ' Modal-active'
    } else {
        className = 'Modal'
    }
    const modalRoot = document.getElementById('modals')
    try {
        return ReactDOM.createPortal(
            <>
                <ModalOverlay onClick={closeModal} />
                <section className={`${className} pl-10 pr-10 pt-10`}>
                    <div className={`Modal-close-icon`}>
                        <CloseIcon type="primary" onClick={closeModal} />
                    </div>
                    {ModalType === 'Ing' && (<IngredientDetails value={ingredientСomponents} />)}
                    {ModalType === 'Order' && (<OrderDetails orderNumber={orderNumber} orderName={orderName} />)}
                </section>
            </>
            , modalRoot)
    } catch (error) {
        console.error("React render error: ", error);
    }
}

export default Modal;
import './Modal.css';
import React from 'react';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'

function Modal(props: any) {
    
    const [option, setOption] = React.useState('construct');
    const modalRef = React.useRef(null);
    let className = 'Modal';


if (props.isOpen === true){
    className += ' Modal-active'
} else {
    className = 'Modal'
}
    
if (props.typeOfModal === 'ingredient'){
return (
        <section ref={modalRef} className= {`${className} pl-10 pr-10 pt-10`}>
            <div className= {`Modal-close-icon`}>
            <CloseIcon type="primary"  onClick={props.closeModal}/>
            </div>
        <IngredientDetails data={props.data}/>
        </section>
    )

} else if(props.typeOfModal === 'order'){
    return (
        <section ref={modalRef} className= {`${className} pl-10 pr-10 pt-10`}>
            <div className= {`Modal-close-icon`}>
            <CloseIcon type="primary"  onClick={props.closeModal}/>
            </div>
        <OrderDetails data={props.data}/>
        </section>
    )
}
else 
return <></>
    }



export default Modal;
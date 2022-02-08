import './ModalOverlay.css';

function ModalOverlay(props) {
    let className = 'ModalOverlay'

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
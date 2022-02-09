import './ModalOverlay.css';
import PropTypes from 'prop-types';

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

ModalOverlay.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
};

export default ModalOverlay;
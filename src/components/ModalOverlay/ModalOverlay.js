import './ModalOverlay.css';
import PropTypes from 'prop-types';
import { ingredientsSelector } from "../../services/slice/ingredients";
import { useSelector } from "react-redux";

function ModalOverlay(props) {
    const { isModalOpen } = useSelector(ingredientsSelector);

    let className = 'ModalOverlay'

    if (isModalOpen === true) {
        className += ' ModalOverlay-active'
    } else {
        className = 'ModalOverlay'
    }

    if (isModalOpen === true) {
        return (
            <section onClick={props.onClick} id='overlay' className={`${className}`}></section>
        )
    } else {
        return (
            <></>
        )
    }
}

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default ModalOverlay;


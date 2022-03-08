import styles from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay(props) {
    return (
        <section onClick={props.onClick} id='overlay' className={`${styles.ModalOverlay}`}></section>
    )
}

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default ModalOverlay;


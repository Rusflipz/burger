import styles from './ModalOverlay.module.css';
// import PropTypes from 'prop-types';
import React from 'react';

function ModalOverlay({ onClose }: { onClose: React.MouseEventHandler<HTMLElement> }) {
    return (
        <section onClick={onClose} id='overlay' className={`${styles.ModalOverlay}`}></section>
    )
}

// ModalOverlay.propTypes = {
//     onClick: PropTypes.func.isRequired,
// };

export default ModalOverlay;


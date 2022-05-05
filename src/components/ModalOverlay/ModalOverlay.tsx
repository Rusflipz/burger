import styles from './ModalOverlay.module.css';
import React from 'react';

function ModalOverlay({ onClose }: { onClose: React.MouseEventHandler<HTMLElement> }) {
    return (
        <section onClick={onClose} id='overlay' className={`${styles.ModalOverlay}`}></section>
    )
}

export default ModalOverlay;


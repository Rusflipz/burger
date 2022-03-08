import styles from './error.module.css';
import error from '../../images/404.jpg';

export function Error() {
    return (
        <div className={`${styles.error}`}>
            <p className={`text text_type_main-large mt-20 ${styles.text} `}>Ошибка!</p>
            <img className={`mt-10 ${styles.text} `} src={error} alt="Ошибка"></img>
        </div>
    )
}

import logo from '../../images/logo.svg';
import profile from '../../images/profile.svg';
import styles from './AppHeader.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader() {
    return (<header className={`${styles.header}`} >
        <div className={`${styles.contentBox}`}>
            <nav className={styles.navigation}>
                <a className={`${styles.navigationItem} ml-1 pr-5 mr-2 mt-4 mb-4`}> <BurgerIcon type="secondary" /><span className={`text text_type_main-default ml-2`}>Конструктор</span></a>
                <a className={`${styles.navigationItem} pl-5 pr-5 mt-4 mb-4`}> <ListIcon type="secondary" /><span className={`text text_type_main-default ml-2`}>Лента заказов</span></a>
            </nav>
            <span className={styles.logo}>
                <Logo />
            </span>
            <nav className={styles.navigation}>
                <a className={`${styles.navigationItem} ${styles.navigationItemProf} pl-5 pr-5 mt-4 mb-4`}> <ProfileIcon type="secondary" /><span className={`text text_type_main-default ml-2`}>Личный кабинет</span></a>
            </nav>
        </div>
    </header>
    );
}

export default AppHeader;
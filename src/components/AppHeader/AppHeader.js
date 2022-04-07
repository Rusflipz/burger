import styles from "./AppHeader.module.css";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';

function AppHeader() {
  return (
    <header className={`${styles.header}`}>
      <div className={`${styles.contentBox}`}>
        <nav className={styles.navigation}>
          <Link className={`${styles.navigationItem} ml-1 pr-5 mr-2 mt-4 mb-4`}
          to='/'
          >
            <BurgerIcon type="secondary" />
            <span className={`text text_type_main-default ml-2`}>
              Конструктор
            </span>
          </Link>
          <a className={`${styles.navigationItem} pl-5 pr-5 mt-4 mb-4`}>
            <ListIcon type="secondary" />
            <span className={`text text_type_main-default ml-2`}>
              Лента заказов
            </span>
          </a>
        </nav>
        <span className={styles.logo}>
          <Logo />
        </span>
        <nav className={styles.navigation}>
          <Link
            className={`${styles.navigationItem} ${styles.navigationItemProf} pl-5 pr-5 mt-4 mb-4`}
            to='profile'
          >
            <ProfileIcon type="secondary" />
            <span className={`text text_type_main-default ml-2`}>
              Личный кабинет
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
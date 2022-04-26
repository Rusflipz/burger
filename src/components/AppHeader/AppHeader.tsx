import styles from "./AppHeader.module.css";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from 'react-router-dom';
import React, { useEffect, createRef, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  headerLinksSelector,
  constructorLinkActive, feedLinkActive, profileLinkActive,
  constructorLinkNotActive, feedLinkNotActive, profileLinkNotActive
} from '../../services/slice/HeaderLinks';

function AppHeader() {

  const dispatch = useDispatch();

  const { constructorLinkValue, feedLinkValue, profileLinkValue } = useSelector(headerLinksSelector);

  let constructorLink = useRef<HTMLAnchorElement>(null);
  let feedLink = useRef<HTMLAnchorElement>(null);
  let profileLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (constructorLink && constructorLink.current) {
      constructorLink.current.focus();
      if (constructorLink.current.className.includes("active")) {
        dispatch(constructorLinkActive())
        dispatch(feedLinkNotActive())
        dispatch(profileLinkNotActive())
      }
    }
    if (feedLink && feedLink.current) {
      feedLink.current.focus();
      if (feedLink.current.className.includes("active")) {
        dispatch(constructorLinkNotActive())
        dispatch(feedLinkActive())
        dispatch(profileLinkNotActive())
      }
    }
    if (profileLink && profileLink.current) {
      profileLink.current.focus();
      if (profileLink.current.className.includes("active")) {
        dispatch(constructorLinkNotActive())
        dispatch(feedLinkNotActive())
        dispatch(profileLinkActive())
      }
    }
  }, [constructorLinkValue, feedLinkValue, profileLinkValue])

  function handleClickConstructorLink() {
    dispatch(constructorLinkActive())
    dispatch(feedLinkNotActive())
    dispatch(profileLinkNotActive())
  }
  function handleClickFeedLink() {
    dispatch(constructorLinkNotActive())
    dispatch(feedLinkActive())
    dispatch(profileLinkNotActive())
  }
  function handleClickProfileLink() {
    dispatch(constructorLinkNotActive())
    dispatch(feedLinkNotActive())
    dispatch(profileLinkActive())
  }
  return (
    <header className={`${styles.header}`}>
      <div className={`${styles.contentBox}`}>
        <nav className={styles.navigation}>
          <NavLink
            onClick={handleClickConstructorLink}
            ref={constructorLink}
            exact
            className={`${styles.navigationItem} ml-1 pr-5 mr-2 mt-4 mb-4`}
            activeClassName={styles.active}
            to='/'
          >
            <BurgerIcon type={constructorLinkValue} />
            <span className={`text text_type_main-default ml-2`}>
              Конструктор
            </span>
          </NavLink>
          <NavLink
            onClick={handleClickFeedLink}
            ref={feedLink}
            activeClassName={styles.active}
            exact
            className={`${styles.navigationItem} pl-5 pr-5 mt-4 mb-4`}
            to='/feed'>
            <ListIcon type={feedLinkValue} />
            <span className={`text text_type_main-default ml-2`}>
              Лента заказов
            </span>
          </NavLink>
        </nav>
        <span className={styles.logo}>
          <Logo />
        </span>
        <nav className={styles.navigation}>
          <NavLink
            onClick={handleClickProfileLink}
            ref={profileLink}
            activeClassName={styles.active}
            exact
            className={`${styles.navigationItem} ${styles.navigationItemProf} pl-5 pr-5 mt-4 mb-4`}
            to='/profile'
          >
            <ProfileIcon type={profileLinkValue} />
            <span className={`text text_type_main-default ml-2`}>
              Личный кабинет
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;

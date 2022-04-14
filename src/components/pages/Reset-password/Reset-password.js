import React, { useState } from 'react';
import styles from './Reset-password.module.css';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
  Button,
  Input
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { postResetPassword } from '../../../services/api';
import { getCookie } from '../../../services/Cookie';

export function Resetpassword() {

  let token = getCookie('token')

  const [passwordValue, setPasswordValue] = useState(null);
  const [codelValue, setcodeValue] = useState(null);

  let isUserLoaded = true
  if (token !== '') {
    isUserLoaded = false
  }
  if (token == undefined) {
    isUserLoaded = true
  }

  const dispatch = useDispatch();

  function handleChangePassword(e) {
    e.preventDefault();
    setPasswordValue(e.target.value)
  }

  function handleChangeCode(e) {
    e.preventDefault();
    setcodeValue(e.target.value)
  }

  function handleClick(e) {
    e.preventDefault();
    dispatch((postResetPassword(passwordValue, codelValue)))
  }
  return (
    <>
      {!isUserLoaded && <Redirect to={{ pathname: "/" }} />}
      <div className={styles.wrapper}>
        <h1 className={`${styles.heading} text text_type_main-medium mb-6`}>Восстановление пароля</h1>
        <form className={`${styles.form} mb-20`} onSubmit={() => { handleClick() }}>
          <div className={`mb-6`}>
            <Input
              onChange={e => handleChangePassword(e)}
              placeholder='Введите новый пароль'
              size={'default'}
              type='password'
              icon={'ShowIcon'}
            />
          </div>
          <div className={`mb-6`}>
            <Input
              onChange={e => handleChangeCode(e)}
              placeholder='Введите код из письма'
              size={'default'}
              type='text'
            />
          </div>
          <Button
            onClick={(e) => handleClick(e)}
          >
            Восстановить
          </Button>
        </form>
        <p className={`${styles.text} mb-4`}>Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link></p>
      </div>
    </>
  );
} 
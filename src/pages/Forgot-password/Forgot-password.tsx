import React, { useState } from 'react';
import styles from './Forgot-password.module.css';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
  Button,
  Input
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { profileSelector, postForgot } from '../../services/slice/profile';
import { postForgotPassword } from '../../services/api';
import { getCookie } from '../../services/Cookie';

export function Forgotpassword() {

  let token = getCookie('token')

  let isUserLoaded = true
  if (token !== '') {
    isUserLoaded = false
  }
  if (token == undefined) {
    isUserLoaded = true
  }


  const history = useHistory();

  const { forgotSuccess, forgotFailed } = useSelector(profileSelector);
  const dispatch = useDispatch();


  const [mailValue, setmailValue] = useState('');

  const login = React.useCallback(
    () => {
      history.replace({ pathname: '/list' });
    },
    [history]
  );

  function handleClick(e: React.SyntheticEvent<Element, Event>) {
    e.preventDefault();
    dispatch((postForgotPassword(mailValue)));
  }

  function handleChangeMail(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setmailValue(e.target.value)
  }

  return (
    <>
      {forgotSuccess && (
        <Redirect to={{ pathname: "/reset-password" }} />
      )}
      <div className={styles.wrapper}>
        <h1 className={`${styles.heading} text text_type_main-medium mb-6`}>Восстановление пароля</h1>
        <form className={`${styles.form} mb-20`}
        // onSubmit={() => { handleClick() }}
        >
          <div className={`mb-6`}>
            <Input
              value={mailValue}
              onChange={e => handleChangeMail(e)}
              placeholder='E-mail'
              size={'default'}
              type='email'
            />
          </div>
          <Link to='/reset-password'>
            <Button //Тут TypeScript не нравиться, что внутри button что-то есть, но из UI библеотеки, именно так и должно быть.
              onClick={((e) => handleClick(e))}
            >Восстановить
            </Button>
          </Link>
          {forgotFailed ? <p>Неудается найти такую учетную записть, проверть адрес почты и попробуйте еще раз</p> : <></>}
        </form>
        <p className={`${styles.text} mb-4`}>Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link></p>
      </div>
    </>
  );
} 
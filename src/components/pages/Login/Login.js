import React from 'react';
import styles from './Login.module.css';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
  Button,
  Input
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { postLogin } from '../../../services/api';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { profileSelector } from '../../../services/slice/profile';


export function LoginPage() {
  const dispatch = useDispatch()

  const { isUserLoaded } = useSelector(profileSelector);

  let mailInput = React.createRef();
  let passwordInput = React.createRef();

  function handleClick(e) {
    e.preventDefault();
    mailInput.current.focus();
    passwordInput.current.focus();
    let info = {
      mail: mailInput.current.value,
      password: passwordInput.current.value,
    }
    dispatch(postLogin(info))
  }

  let location = useLocation();

  if (isUserLoaded) {
    return (
      <Redirect
        to={ location.state?.from || '/' }
      />
    );
  }


  return (
    <>
{!isUserLoaded ? <div className={styles.wrapper}>
        <h1 className={`${styles.heading} text text_type_main-medium mb-6`}>Вход</h1>
        <form className={`${styles.form} mb-20`} onSubmit={() => { handleClick() }}>
          <div className={`mb-6`}>
            <Input
              ref={mailInput}
              placeholder='E-mail'
              size={'default'}
              type='email'
            />
          </div>
          <div className={`mb-6`}>
            <Input
              ref={passwordInput}
              placeholder='Пароль'
              size={'default'}
              type='password'
              icon={'ShowIcon'}
            />
          </div>
          <Button
            onClick={(e) => handleClick(e)}
          >
            Войти
          </Button>
        </form>
        <p className={`${styles.text} mb-4`}>Вы — новый пользователь? <Link to='/registration' className={styles.link}>Зарегистрироваться</Link></p>
        <p className={styles.text}>Забыли пароль? <Link to='/forgot-password' className={styles.link}>Восстановить пароль</Link></p>
      </div> : <Redirect to='/' />}
      
    </>
  );
} 
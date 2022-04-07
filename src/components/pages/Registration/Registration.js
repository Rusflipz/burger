import React from 'react';
import styles from './Registration.module.css';
import {
    BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon,
    Button,
    Input
  } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import { postRegister } from '../../../services/api';
import { useSelector, useDispatch } from 'react-redux';

export function RegistrationPage() {
  const dispatch = useDispatch()

  let nameInput = React.createRef();
  let mailInput = React.createRef();
  let passwordInput = React.createRef();
  
  function handleClick(e) {
    e.preventDefault();
    nameInput.current.focus();
    mailInput.current.focus();
    passwordInput.current.focus();
    let info = {
      name: nameInput.current.value,
      mail: mailInput.current.value,
      password: passwordInput.current.value,
    }
    dispatch(postRegister(info))
  }

    return (
      <div className={styles.wrapper}>
          <h1 className={`${styles.heading} text text_type_main-medium mb-6`}>Регистрация</h1>
        <form className={`${styles.form} mb-20`} onSubmit= {() => {return false}}>
        <div className={`mb-6`}>
            <Input
            ref={nameInput}
            name='Name'
            placeholder='Имя'
            size={'default'}
            type='text'
            />
            </div>
            <div className={`mb-6`}>
            <Input
            ref={mailInput}
            name='E-mail'
            placeholder='E-mail'
            size={'default'}
            type='email'
            />
            </div>
            <div className={`mb-6`}>
            <Input 
            ref={passwordInput}
            name='Password'
            placeholder='Пароль'
            size={'default'}
            type='password'
            icon={'ShowIcon'}
            />
            </div>
            <Button
            onClick={(e) => handleClick(e)}
            >
            Зарегистрироваться 
            </Button>
        </form>
        <p className={`${styles.text}`}>Уже зарегистрированы? <Link to='/login' className={styles.link}>Войти</Link></p>
      </div>
    );
  } 
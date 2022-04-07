import React from 'react';
import styles from './Reset-password.module.css';
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
import { postResetPassword } from '../../../services/api';

export function Resetpassword() {

  const dispatch = useDispatch();
  
  function handleClick(e){
    e.preventDefault();
    dispatch((postResetPassword()))
  }
    return (

      <div className={styles.wrapper}>
          <h1 className={`${styles.heading} text text_type_main-medium mb-6`}>Восстановление пароля</h1>
        <form className={`${styles.form} mb-20`} onSubmit= {() => {return false}}>
            <div className={`mb-6`}>
            <Input 
            placeholder='Введите новый пароль'
            size={'default'}
            type='password'
            icon={'ShowIcon'}
            />
            </div>
            <div className={`mb-6`}>
            <Input 
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
    );
  } 
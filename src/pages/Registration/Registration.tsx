import React, { useState } from 'react';
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
import { postRegister } from '../../services/api';
import { useSelector, useDispatch } from 'react-redux';

export function RegistrationPage() {
  const dispatch = useDispatch()

  const [nameValue, setNameValue] = useState('');
  const [mailValue, setmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setNameValue(e.target.value)
  }

  function handleChangeMail(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setmailValue(e.target.value)
  }

  function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setPasswordValue(e.target.value)
  }

  function handleClick(e: React.SyntheticEvent<Element, Event>) {
    e.preventDefault();
    let info = {
      name: nameValue,
      mail: mailValue,
      password: passwordValue,
    }
    dispatch(postRegister(info))
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={`${styles.heading} text text_type_main-medium mb-6`}>Регистрация</h1>
      <form className={`${styles.form} mb-20`}
      //  onSubmit={() => { handleClick() }}
      >
        <div className={`mb-6`}>
          <Input
            onChange={e => handleChangeName(e)}
            value={nameValue}
            name='Name'
            placeholder='Имя'
            size={'default'}
            type='text'
          />
        </div>
        <div className={`mb-6`}>
          <Input
            onChange={e => handleChangeMail(e)}
            value={mailValue}
            name='E-mail'
            placeholder='E-mail'
            size={'default'}
            type='email'
          />
        </div>
        <div className={`mb-6`}>
          <Input
            onChange={e => handleChangePassword(e)}
            value={passwordValue}
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
import React, { useState } from 'react';
import styles from './Registration.module.css';
import {
  Button,
  Input
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from 'react-router-dom';
import { postRegister } from '../../services/api';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getCookie } from '../../services/Cookie';

export function RegistrationPage() {
  let isUserLoaded = false

  let token = getCookie('token')

  if (token !== '' || token !== undefined) {
    isUserLoaded = true
  }
  const dispatch = useAppDispatch()

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

  function handleClick() {
    let info = {
      name: nameValue,
      mail: mailValue,
      password: passwordValue,
    }
    dispatch(postRegister(info))
  }

  return (
    <>
      {isUserLoaded && (
        <Redirect to={{ pathname: "/" }} />
      )}
      <div className={styles.wrapper}>
        <h1 className={`${styles.heading} text text_type_main-medium mb-6`}>Регистрация</h1>
        <form className={`${styles.form} mb-20`}
          onSubmit={() => { handleClick() }}
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
          <Button>Зарегистрироваться</Button>
        </form>
        <p className={`${styles.text}`}>Уже зарегистрированы? <Link to='/login' className={styles.link}>Войти</Link></p>
      </div>
    </>
  );
} 
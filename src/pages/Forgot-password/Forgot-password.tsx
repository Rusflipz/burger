import React, { useState } from 'react';
import styles from './Forgot-password.module.css';
import {
  Button,
  Input
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { profileSelector } from '../../services/slice/profile';
import { postForgotPassword } from '../../services/api';

export function Forgotpassword() {

  const { forgotSuccess, forgotFailed } = useAppSelector(profileSelector);

  const dispatch = useAppDispatch();

  const [mailValue, setmailValue] = useState('');

  function handleClick() {
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
          onSubmit={() => { handleClick() }}
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
            <Button>Восстановить</Button>
          </Link>
          {forgotFailed ? <p>Неудается найти такую учетную запись, проверьте адрес почты и попробуйте еще раз</p> : <></>}
        </form>
        <p className={`${styles.text} mb-4`}>Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link></p>
      </div>
    </>
  );
} 
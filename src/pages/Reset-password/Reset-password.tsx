import React, { useState } from 'react';
import styles from './Reset-password.module.css';
import {
  Button,
  Input
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postResetPassword } from '../../services/api';

export function Resetpassword() {

  const [passwordValue, setPasswordValue] = useState('');
  const [codelValue, setcodeValue] = useState('');

  const dispatch = useDispatch();

  function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setPasswordValue(e.target.value)
  }

  function handleChangeCode(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setcodeValue(e.target.value)
  }

  function handleClick() {
    dispatch((postResetPassword(passwordValue, codelValue)))
  }
  return (
    <>
      <div className={styles.wrapper}>
        <h1 className={`${styles.heading} text text_type_main-medium mb-6`}>Восстановление пароля</h1>
        <form className={`${styles.form} mb-20`}
          onSubmit={() => { handleClick() }}
        >
          <div className={`mb-6`}>
            <Input
              value={passwordValue}
              onChange={e => handleChangePassword(e)}
              placeholder='Введите новый пароль'
              size={'default'}
              type='password'
              icon={'ShowIcon'}
            />
          </div>
          <div className={`mb-6`}>
            <Input
              value={codelValue}
              onChange={e => handleChangeCode(e)}
              placeholder='Введите код из письма'
              size={'default'}
              type='text'
            />
          </div>
          <Button>Восстановить</Button>
        </form>
        <p className={`${styles.text} mb-4`}>Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link></p>
      </div>
    </>
  );
} 
import React from 'react';
import styles from './Forgot-password.module.css';
import {
    BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon,
    Button,
    Input
  } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { profileSelector, postForgot } from '../../../services/slice/profile';
import { postForgotPassword } from '../../../services/api';

export function Forgotpassword() {
  const history = useHistory(); 

  const { forgotSuccess } = useSelector(profileSelector);
  const dispatch = useDispatch();

  let mailInput = React.createRef();

  const login = React.useCallback(
    () => {
        history.replace({ pathname: '/list' });
    },
    [history]
  ); 

  function handleClick(e){
    e.preventDefault();
    mailInput.current.focus();
    dispatch((postForgotPassword(mailInput.current.value)))
  }
    return (

      <div className={styles.wrapper}>
          <h1 className={`${styles.heading} text text_type_main-medium mb-6`}>Восстановление пароля</h1>
        <form className={`${styles.form} mb-20`} onSubmit= {() => {return false}}>
            <div className={`mb-6`}>
            <Input
            ref={mailInput}
            placeholder='E-mail'
            size={'default'}
            type='email'
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
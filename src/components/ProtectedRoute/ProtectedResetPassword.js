import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getCookie } from '../../services/Cookie';
import { profileSelector } from '../../services/slice/profile';


export function ProtectedResetPassword({ children }) {

    let token = getCookie('token')

    const { forgotSuccess } = useSelector(profileSelector);

    let isUserLoaded = false
    if (token !== '') {
        isUserLoaded = true
    }
    if (token == undefined){
        isUserLoaded = true
    }

console.log(isUserLoaded)
console.log(forgotSuccess)

    return (<>
        {!isUserLoaded & forgotSuccess ? children : <Redirect to='/login' />}
    </>)

} 
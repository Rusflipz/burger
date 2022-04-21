import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getCookie } from '../../services/Cookie';
import { profileSelector } from '../../services/slice/profile';


export function ProtectedUserOrder({ children }) {

    let token = getCookie('token')

    const { forgotSuccess } = useSelector(profileSelector);

    let isUserLoaded = false
    if (token !== '') {
        isUserLoaded = true
    }
    if (token == undefined){
        isUserLoaded = false
    }

    return (<>
        {isUserLoaded ? children : <Redirect to='/login' />}
    </>)

} 
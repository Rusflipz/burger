import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getCookie } from '../../services/Cookie';
import { profileSelector } from '../../services/slice/profile';

export function ProtectedRouteRegistration({ children }: { children: JSX.Element }) {
    let token = getCookie('token')
    let isUserLoaded = true
    if (token !== '') {
        isUserLoaded = false
    }
    if (token == undefined) {
        isUserLoaded = true
    }
    return (<>
        {isUserLoaded ? children : <Redirect to='/login' />}
    </>)

} 
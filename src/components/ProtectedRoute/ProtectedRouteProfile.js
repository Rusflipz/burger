import { Route, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getCookie } from '../../services/Cookie';
import { profileSelector } from '../../services/slice/profile';

export function ProtectedRouteProfile({ children }) {
    const dispatch = useDispatch()
    console.log(document.cookie)
    let token = getCookie('token')
    console.log('зашел')
    console.log(token)

useEffect(() => {
    console.log('обновляю токен')
    token = getCookie('token')
    console.log(token)
}, [token])

    let isUserLoaded = false
    if (token !== '') {
        isUserLoaded = true
    }
    if (token == undefined){
        isUserLoaded = false
    }
    let location = useLocation();
    console.log(isUserLoaded)
    return (<>
        {isUserLoaded ? children : <Redirect to={{
                            // Маршрут, на который произойдёт переадресация
                            pathname: '/login',
                            // В from сохраним текущий маршрут
              state: { from: location }
                        }} />}
    </>)
} 
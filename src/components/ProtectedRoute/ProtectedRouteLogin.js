import { Route, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getCookie } from '../../services/Cookie';
import { profileSelector } from '../../services/slice/profile';

export function ProtectedRouteLogin({ children, ...rest }) {
    
    let token = getCookie('token')

    const { loading, refreshSuccess, isUserLoaded, refreshing } = useSelector(profileSelector);

    let location = useLocation();

    return (
        <Route
        {...rest}
            render={({ location }) =>
                !isUserLoaded ? (
                    children
                ) : (
                    <Redirect
                        // Передадим в пропс to не строку, а объект.
                        to={{
                            // Маршрут, на который произойдёт переадресация
                            pathname: '/profile',
                            // В from сохраним текущий маршрут
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    )

}
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getCookie } from '../../services/Cookie';
import { profileSelector } from '../../services/slice/profile';

export function ProtectedRouteLogin({ children, ...rest }) {
    let token = getCookie('token')

    let isUserLoaded = true
    if (token !== '') {
        isUserLoaded = false
    }
    if (token == undefined) {
        isUserLoaded = true
    }

    console.log(isUserLoaded)

    let location = useLocation();


    // if (!isUserLoaded) {
    //     return (
    //       <Redirect

    //         to={ state?.from || '/' }
    //       />
    //     );
    //   }


    // return (<>
    //     {isUserLoaded ? children : 
    //     <Redirect to='/profile' />
    //     }
    // </>)

    return (
        <Route
        {...rest}
            render={({ location }) =>
                isUserLoaded ? (
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
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getCookie } from '../../services/Cookie';
import { profileSelector } from '../../services/slice/profile';
import { getProfileInformation } from '../../services/api';
import { Loading } from '../Loading/loading';

export function ProtectedRouteProfile({ children }) {
    let location = useLocation();

    const dispatch = useDispatch()
    const { loading, refreshSuccess, isUserLoaded, refreshing } = useSelector(profileSelector);

    useEffect(() =>{
        dispatch(getProfileInformation())
    },[])

    
console.log(refreshing)
console.log(isUserLoaded)

    if(!refreshing){
return (<>
        {isUserLoaded ? children : <Redirect to={{
                            // Маршрут, на который произойдёт переадресация
                            pathname: '/login',
                            // В from сохраним текущий маршрут
              state: { from: location }
                        }} />}
    </>)
    }
    else return <Loading />

                    }
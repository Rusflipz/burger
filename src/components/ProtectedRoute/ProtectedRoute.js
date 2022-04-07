import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getCookie } from '../../services/Cookie';
import { getProfileInformation } from '../../services/api';
import { profileSelector } from '../../services/slice/profile';

export function ProtectedRoute({ children }) {
    const { isUserLoaded } = useSelector(profileSelector);
    console.log(isUserLoaded)
    let token = null;
    const init = async () => {
        token = getCookie('token')
        if (token !== null) {
            isUserLoaded = true
            console.log(isUserLoaded)
        }
    };

    useEffect(() => {
        init();
    }, []);

    // useEffect(() => {
    //     if (token !== null){
    //         isUserLoaded = true
    //     }
    // }, [token]);
    

    console.log(isUserLoaded)
    return (<>
        {isUserLoaded ? children : <Redirect to='/login' />}
    </>)

} 
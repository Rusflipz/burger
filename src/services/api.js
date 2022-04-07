import { url, checkResponse } from '../utils/constants';
import {
    getIngredients, getIngredientsSuccess, getIngredientsFailed, clearConstructor,
    getOrder, getOrderSuccess, getOrderFailed
} from '../services/slice/ingredients';
import {
    postRegist, postRegistSuccess, postRegistFailed,
    postForgot, postForgotSuccess, postForgotFailed,
    postReset, postResetSuccess, postResetFailed,
    postLog, postLogSuccess, postLogFailed,
    logOut, logOutSuccess, logOutFailed,
    getProfile, getProfileSuccess, getProfileFailed,
} from '../services/slice/profile'
import { setCookie, deleteCookie } from '../services/Cookie'
import { useContext, useState, createContext } from 'react';
import { useSelector, useDispatch } from "react-redux";


// const AuthContext = createContext(undefined);

// export function ProvideAuth({ children }) {
//     const auth = useProvideAuth();
//     console.log(auth)
//     return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
// }

export const getProfileInformation = (information) => {
    return async dispatch => {
        dispatch(getProfile())
        try {
            const response = await fetch(`${url}auth/logout`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "authorization": ""
                })
            })
            const data = await checkResponse(response)
            console.log(data)
            // setUser({ ...data.user, id: data.user._id });
            dispatch(getProfileSuccess(data))
        } catch (err) {
            console.log(err)
            dispatch(getProfileFailed())
        }
    }
}

export const fetchIngredients = () => {
    return async dispatch => {
        dispatch(getIngredients())
        try {
            const response = await fetch(`${url}ingredients`)
            const data = await checkResponse(response)
            dispatch(getIngredientsSuccess(data.data))
        } catch (err) {
            dispatch(getIngredientsFailed())
        }
    }
}

export const fetchOrderDetails = (ingredients) => {
    return async dispatch => {
        dispatch(getOrder())
        try {
            const response = await fetch(`${url}orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ingredients: ingredients.map(i => i._id) })
            })
            const data = await checkResponse(response)
            dispatch(getOrderSuccess(data))
        } catch (err) {
            dispatch(getOrderFailed())
        }
    }
}

export const postRegister = (information) => {
    return async dispatch => {
        dispatch(postRegist())
        try {
            const response = await fetch(`${url}auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "email": information.mail,
                    "password": information.password,
                    "name": information.name
                })
            })
            const data = await checkResponse(response)
            let authToken;
            let refreshToken;
            authToken = data.accessToken.split('Bearer ')[1];
            refreshToken = data.refreshToken;
            console.log(authToken)
            if (authToken) {
                const name = 'token';
                const token = authToken
                setCookie(name, token);
            }
            if (refreshToken) {
                const name = 'refreshToken';
                const token = refreshToken
                setCookie(name, token);
            }
            console.log(document.cookie)
            dispatch(postRegistSuccess(data))
        } catch (err) {
            console.log(err)
            dispatch(postRegistFailed())
        }
    }
}

export const postLogin = (information) => {
    return async dispatch => {
        dispatch(postLog())
        try {
            const response = await fetch(`${url}auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "email": information.mail,
                    "password": information.password,
                })
            })
            const data = await checkResponse(response)
            console.log(data)
            let authToken;
            let refreshToken;
            authToken = data.accessToken.split('Bearer ')[1];
            refreshToken = data.refreshToken;
            console.log(authToken)
            if (authToken) {
                const name = 'token';
                const token = authToken
                setCookie(name, token);
            }
            if (refreshToken) {
                const name = 'refreshToken';
                const token = refreshToken
                setCookie(name, token);
            }
            console.log(document.cookie)
            dispatch(postLogSuccess(data))
        } catch (err) {
            console.log(err)
            dispatch(postLogFailed())
        }
    }
}

export const postForgotPassword = (information) => {
    return async dispatch => {
        dispatch(postForgot())
        try {
            const response = await fetch(`${url}password-reset`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "email": information.mail
                })
            })
            const data = await checkResponse(response)
            dispatch(postForgotSuccess(data))
        } catch (err) {
            console.log(err)
            dispatch(postForgotFailed())
        }
    }
}

export const postResetPassword = (information) => {
    return async dispatch => {
        dispatch(postReset())
        try {
            const response = await fetch(`${url}password-reset/reset`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "password": "",
                    "token": ""
                })
            })
            const data = await checkResponse(response)
            dispatch(postResetSuccess(data))
        } catch (err) {
            console.log(err)
            dispatch(postResetFailed())
        }
    }
}

export const postLogOut = (information) => {
    return async dispatch => {
        let authToken;
        let refreshToken;
        dispatch(logOut())
        try {
            const response = await fetch(`${url}auth/logout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "token": information
                })
            })
            const data = await checkResponse(response)
            if (authToken) {
                const name = 'token';
                deleteCookie(name);
            }
            if (refreshToken) {
                const name = 'refreshToken';
                deleteCookie(name);
            }
            dispatch(logOutSuccess(data))
        } catch (err) {
            console.log(err)
            dispatch(logOutFailed())
        }
    }
}

export const editProfileInformation = (information) => {
    return async dispatch => {
        dispatch(getProfile())
        try {
            const response = await fetch(`${url}auth/logout`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "authorization": "",
                    "email": information.mail,
                    "password": information.password,
                    "name": information.name
                })
            })
            const data = await checkResponse(response)
            dispatch(getProfileSuccess(data))
        } catch (err) {
            console.log(err)
            dispatch(getProfileFailed())
        }
    }
}
import { url, checkResponse } from '../utils/constants';
import {
    getIngredients, getIngredientsSuccess, getIngredientsFailed, clearConstructor,
    getOrder, getOrderSuccess, getOrderFailed
} from './slice/ingredients';
import {
    postRegist, postRegistSuccess, postRegistFailed,
    postForgot, postForgotSuccess, postForgotFailed,
    postReset, postResetSuccess, postResetFailed,
    postLog, postLogSuccess, postLogFailed,
    logOut, logOutSuccess, logOutFailed,
    getProfile, getProfileSuccess, getProfileFailed,
    postChange, postChangeSuccess, postChangeFailed,
    refreshProfile, refreshProfileSuccess, refreshProfileFailed,
    firstTry
} from './slice/profile'
import {
    getOrdersSuccess, getUserOrdersSuccess
} from './slice/order';
import { setCookie, deleteCookie, getCookie } from './Cookie'
import { useContext, useState, createContext } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { IfFulfilled } from 'react-async';
import { Route, Redirect } from 'react-router-dom';

export const editProfile = (token: string | undefined, previus: { name: string, mail: string, password: string }, actual: { name: string, mail: string, password: string }) => {
    let name: string;
    let login: string;
    let password: string;

    if (previus.name == actual.name) {
        name = previus.name
    } else {
        name = actual.name
    }

    if (previus.mail == actual.mail) {
        login = previus.mail
    } else {
        login = actual.mail
    }

    if (previus.password == actual.password) {
        password = previus.password
    } else {
        password = actual.password
    }

    if (previus.password !== actual.password) {
        return async (dispatch: any) => {
            dispatch(postChange())
            try {
                const response = await fetch(`${url}auth/user`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        "email": login,
                        "password": password,
                        "name": name
                    })
                })
                const data = await checkResponse(response)
                dispatch(postChangeSuccess(data))
            } catch (err) {
                console.log(err)
                dispatch(postChangeFailed())
            }
        }
    } else {
        return async (dispatch: any) => {
            dispatch(postChange())
            try {
                const response = await fetch(`${url}auth/user`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        "email": login,
                        "name": name
                    })
                })
                const data = await checkResponse(response)
                dispatch(postChangeSuccess(data))
            } catch (err) {
                console.log(err)
                dispatch(postChangeFailed())
                if (err == 'Ошибка: 403') {
                    dispatch(refreshProfileInformation())
                }
            }
        }
    }
}

export const refreshProfileInformation = () => {
    let refreshToken = getCookie('refreshToken')
    return async (dispatch: any) => {
        dispatch(refreshProfile())
        try {
            const response = await fetch(`${url}auth/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "token": refreshToken
                })
            })
            const data = await checkResponse(response)
            let authToken1;
            let refreshToken1;
            authToken1 = data.accessToken.split('Bearer ')[1];
            refreshToken1 = data.refreshToken;
            if (authToken1) {
                const name = 'token';
                const token = authToken1
                setCookie(name, token);
            }
            if (refreshToken1) {
                const name = 'refreshToken';
                const token = refreshToken1
                setCookie(name, token);
            }
            dispatch(refreshProfileSuccess(data))
            dispatch(getProfileInformation())
        } catch (err) {
            console.log(err)
            dispatch(refreshProfileFailed())

        }
    }
}

export const getProfileInformation = () => {
    return async (dispatch: any) => {
        dispatch(getProfile())
        try {
            let token = getCookie("token");
            const response = await fetch(`${url}auth/user`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`,
                },
            })
            const data = await checkResponse(response)
            dispatch(getProfileSuccess(data))
        } catch (err) {
            console.log(err)
            dispatch(getProfileFailed())
            if (err == 'Ошибка: 403') {
                dispatch(refreshProfileInformation())
            }
            if (err !== 'Ошибка: 403') {
                dispatch(firstTry())
            }
        }
    }
}

export const fetchIngredients = () => {
    return async (dispatch: any) => {
        dispatch(getIngredients(null))
        try {
            const response = await fetch(`${url}ingredients`)
            const data = await checkResponse(response)
            dispatch(getIngredientsSuccess(data.data))
        } catch (err) {
            dispatch(getIngredientsFailed(null))
        }
    }
}

export const fetchOrderDetails = (ingredients: Array<any>) => {
    let arr: Array<string> = []
    ingredients.map((i) => {
        arr.push(i._id)
    })
    let img = ingredients.find(item => item.type == 'bun')
    arr.push(img._id)
    return async (dispatch: any) => {
        dispatch(getOrder(null))
        try {
            let token = getCookie("token");
            const response = await fetch(`${url}orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ ingredients: arr })
            })
            const data = await checkResponse(response)
            dispatch(getOrderSuccess(data))
        } catch (err) {
            dispatch(getOrderFailed(null))
        }
    }
}

export const postRegister = (information: { name: string; mail: string; password: string; }) => {
    return async (dispatch: any) => {
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
            dispatch(postRegistSuccess(data))
        } catch (err) {
            console.log(err)
            dispatch(postRegistFailed())
        }
    }
}

export const postLogin = (information: { mail: string; password: string; }) => {
    return async (dispatch: any) => {
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
            let authToken;
            let refreshToken;
            authToken = data.accessToken.split('Bearer ')[1];
            refreshToken = data.refreshToken;
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
            dispatch(postLogSuccess(data))
        } catch (err) {
            console.log(err)
            dispatch(postLogFailed())
        }
    }
}

export const postForgotPassword = (information: string) => {
    return async (dispatch: any) => {
        dispatch(postForgot())
        try {
            const response = await fetch(`${url}password-reset`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "email": information
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

export const postResetPassword = (password: string, code: string) => {
    return async (dispatch: any) => {
        dispatch(postReset())
        try {
            const response = await fetch(`${url}password-reset/reset`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "password": password,
                    "token": code
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

export const postLogOut = (information: string | undefined) => {
    return async (dispatch: any) => {
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
            deleteCookie('token');
            deleteCookie('refreshToken');
            dispatch(logOutSuccess(data))
        } catch (err) {
            console.log(err)
            dispatch(logOutFailed())
        }
    }
}


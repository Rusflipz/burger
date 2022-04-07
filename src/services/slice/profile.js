import { createSlice } from '@reduxjs/toolkit';
import uniqid from 'uniqid';

export const initialState = {
    loading: false,
    error: false,
    profileInformation: [],
    forgotInformation: [],
    accessToken: null,
    refreshToken: null,
    forgotSuccess: false,
    name: null,
    mail: null,
    orderModalOpen: false,
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        postRegist: state => {
            state.loading = true;
            console.log('Идет регистрация')
        },
        postRegistSuccess: (state, { payload }) => {
            state.profileInformation = payload
            state.loading = false
            state.error = false
            console.log(state.profileInformation)
            console.log('Регистрации прошла успешно')
        },
        postRegistFailed: state => {
            state.loading = false
            state.error = true
            console.log('Ошибка регистрации')
        },
        postLog: state => {
            state.loading = true;
            console.log('Идет авторизация')
        },
        postLogSuccess: (state, { payload }) => {
            console.log(payload)
            state.profileInformation = payload
            state.loading = false
            state.error = false
            state.name = payload.user.name
            state.mail = payload.user.email
            state.accessToken = payload.user.accessToken
            state.refreshToken = payload.user.refreshToken
            console.log('Авторизация прошла успешно')
        },
        postLogFailed: state => {
            state.loading = false
            state.error = true
            console.log('Ошибка Авторизации')
        },
        postForgot: state => {
            state.loading = false
            state.error = true
            console.log('Отправка завяки на восстановления пароля')
        },
        postForgotSuccess: (state, { payload }) => {
            state.forgotInformation = payload
            state.loading = false
            state.error = false
            console.log(state.forgotInformation)
            console.log('Завяка принята')
        },
        postForgotFailed: state => {
            state.loading = false
            state.error = true
            console.log('Ошибка сброса пароля')
        },
        postReset: state => {
            state.loading = false
            state.error = true
            console.log('Отправка завяки на восстановления пароля')
        },
        postResetSuccess: (state, { payload }) => {
            state.forgotInformation = payload
            state.loading = false
            state.error = false
            console.log(state.forgotInformation)
            console.log('Завяка принята')
        },
        postResetFailed: state => {
            state.loading = false
            state.error = true
            console.log('Ошибка сброса пароля')
        },
        logOut: state => {
            state.loading = false
            state.error = true
            console.log('Выход из системы...')
        },
        logOutSuccess: (state, { payload }) => {
            state.profileInformation = null
            state.loading = false
            state.error = false
            state.name = null
            state.mail = null
            state.accessToken = null
            state.refreshToken = null
            console.log(state.forgotInformation)
            console.log('Вы вышли')
        },
        logOutFailed: state => {
            state.loading = false
            state.error = true
            console.log('Ошибка выхода')
        },
        getProfile: state => {
            state.loading = false
            state.error = true
            console.log('Получение данных о пользователе...')
        },
        getProfileSuccess: (state, { payload }) => {
            state.forgotInformation = payload
            state.loading = false
            state.error = false
            console.log(state.forgotInformation)
            console.log('Получил данные пользователя')
        },
        getProfileFailed: state => {
            state.loading = false
            state.error = true
            console.log('Ошибка полученя данных пользователя')
        },
    },
})


export const {
    postRegist, postRegistSuccess, postRegistFailed, postForgot, postForgotSuccess, postForgotFailed, postReset, postResetSuccess, postResetFailed, postLog, postLogSuccess, postLogFailed, logOut, logOutSuccess, logOutFailed, getProfile, getProfileSuccess, getProfileFailed,
} = profileSlice.actions

export const profileSelector = state => state.profile

export default profileSlice.reducer
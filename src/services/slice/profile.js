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
    forgotFailed: false,
    name: '',
    mail: '',
    password: '',
    orderModalOpen: false,
    isUserLoaded: false,
    isChangeName: false,
    isChangeLogin: false,
    isChangePassword: false,
    isChange: false,  
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        startChangeName: state => {
            state.isChangeName = true;
            state.isChange = true;
            console.log('Редактирование информации Имени')
        },
        startChangeLogin: state => {
            state.isChangeLogin = true;
            state.isChange = true;
            console.log('Редактирование информации Логина')
        },
        startChangePassword: state => {
            state.isChangePassword = true;
            state.isChange = true;
            console.log('Редактирование информации Пароля')
        },
        stopChange: (state) => {
            state.isChange = false;
            state.isChangeName = false;
            state.isChangeLogin = false;
            state.isChangePassword = false;
            console.log('Отмена редактирования')
        },
        postChange: state => {
            state.isChange = false;
            state.isChangeName = false;
            state.isChangeLogin = false;
            state.isChangePassword = false;
            state.loading = true
            state.error = true
            console.log('Отправка изменений')
        },
        postChangeSuccess: (state, { payload }) => {
            state.isChange = false;
            state.isChangeName = false;
            state.isChangeLogin = false;
            state.isChangePassword = false;
            state.loading = false
            state.error = false
            console.log(payload)
            console.log('Изменения произведены успешно')
        },
        postChangeFailed: state => {
            state.loading = false
            state.error = true
            console.log('Изменения не были произведены')
        },
        postRegist: state => {
            state.loading = true;
            console.log('Идет регистрация')
        },
        postRegistSuccess: (state, { payload }) => {
            state.loading = false
            state.error = false
            state.isUserLoaded = true
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
            state.loading = false
            state.error = false
            state.name = payload.user.name
            state.mail = payload.user.email
            state.accessToken = payload.user.accessToken
            state.refreshToken = payload.user.refreshToken
            state.isUserLoaded = true
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
            state.forgotSuccess = true
            state.forgotFailed = false
            console.log(state.forgotInformation)
            console.log('Завяка принята')
        },
        postForgotFailed: state => {
            state.forgotSuccess = false
            state.loading = false
            state.error = true
            state.forgotFailed = true
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
            state.forgotSuccess = false
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
            state.name = ''
            state.mail = ''
            state.accessToken = null
            state.refreshToken = null
            state.isUserLoaded = false
            console.log(state.forgotInformation)
            console.log('Вы вышли')
        },
        logOutFailed: state => {
            state.loading = false
            state.error = true
            console.log('Ошибка выхода')
        },
        getProfile: state => {
            state.loading = true
            state.error = false
            console.log('Получение данных о пользователе...')
        },
        getProfileSuccess: (state, { payload }) => {
            state.name = payload.user.name
            state.mail = payload.user.email
            state.loading = false
            state.error = false
            console.log(payload)
            console.log('Получил данные пользователя')
        },
        getProfileFailed: state => {
            state.loading = false
            state.error = true
            console.log('Ошибка полученя данных пользователя')
        },
        refreshProfile: state => {
            state.loading = false
            state.error = true
            console.log('Обновление токена...')
        },
        refreshProfileSuccess: (state, { payload }) => {
            state.loading = false
            state.error = false
            state.isUserLoaded = true
            console.log(payload)
            console.log('Успешное обновление токена')
        },
        refreshProfileFailed: state => {
            state.loading = false
            state.error = true
            console.log('Ошибка обновления токена')
        },
        tokenNotFound: state =>{
            state.isUserLoaded = false
        }
    },
})


export const {
    postRegist, postRegistSuccess, postRegistFailed,
     postForgot, postForgotSuccess, postForgotFailed, 
     postReset, postResetSuccess, postResetFailed, 
     postLog, postLogSuccess, postLogFailed,
      logOut, logOutSuccess, logOutFailed,
       getProfile, getProfileSuccess, getProfileFailed,
       startChangeName, startChangeLogin, startChangePassword, stopChange, postChange, postChangeSuccess, postChangeFailed,
       refreshProfile, refreshProfileSuccess, refreshProfileFailed,
       tokenNotFound,
} = profileSlice.actions

export const profileSelector = state => state.profile

export default profileSlice.reducer
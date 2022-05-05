import { createSlice } from '@reduxjs/toolkit';

interface CounterState {
    loading: boolean;
    error: boolean;
    profileInformation: Array<any> | null;
    forgotInformation: Array<any>;
    accessToken: null | string;
    refreshToken: null | string;
    forgotSuccess: boolean;
    forgotFailed: boolean;
    name: string;
    mail: string;
    password: string;
    orderModalOpen: boolean;
    isUserLoaded: boolean;
    isChangeName: boolean;
    isChangeLogin: boolean;
    isChangePassword: boolean;
    isChange: boolean;
    refreshSuccess: boolean;
    refreshing: boolean;
}

export const initialState: CounterState = {
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
    refreshSuccess: false,
    refreshing: false,
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        startChangeName: state => {
            state.isChangeName = true;
            state.isChange = true;
        },
        startChangeLogin: state => {
            state.isChangeLogin = true;
            state.isChange = true;
        },
        startChangePassword: state => {
            state.isChangePassword = true;
            state.isChange = true;
        },
        stopChange: (state) => {
            state.isChange = false;
            state.isChangeName = false;
            state.isChangeLogin = false;
            state.isChangePassword = false;
        },
        postChange: state => {
            state.isChange = false;
            state.isChangeName = false;
            state.isChangeLogin = false;
            state.isChangePassword = false;
            state.loading = true
            state.error = true
        },
        postChangeSuccess: (state, { payload }) => {
            state.isChange = false;
            state.isChangeName = false;
            state.isChangeLogin = false;
            state.isChangePassword = false;
            state.loading = false
            state.error = false
        },
        postChangeFailed: state => {
            state.loading = false
            state.error = true
        },
        postRegist: state => {
            state.loading = true;
        },
        postRegistSuccess: (state, { payload }) => {
            state.loading = false
            state.error = false
            state.isUserLoaded = true
        },
        postRegistFailed: state => {
            state.loading = false
            state.error = true
        },
        postLog: state => {
            state.loading = true;
        },
        postLogSuccess: (state, { payload }) => {
            state.loading = false
            state.error = false
            state.name = payload.user.name
            state.mail = payload.user.email
            state.accessToken = payload.user.accessToken
            state.refreshToken = payload.user.refreshToken
            state.isUserLoaded = true
        },
        postLogFailed: state => {
            state.loading = false
            state.error = true
        },
        postForgot: state => {
            state.loading = false
            state.error = true
        },
        postForgotSuccess: (state, { payload }) => {
            state.forgotInformation = payload
            state.loading = false
            state.error = false
            state.forgotSuccess = true
            state.forgotFailed = false
        },
        postForgotFailed: state => {
            state.forgotSuccess = false
            state.loading = false
            state.error = true
            state.forgotFailed = true
        },
        postReset: state => {
            state.loading = false
            state.error = true
        },
        postResetSuccess: (state, { payload }) => {
            state.forgotInformation = payload
            state.loading = false
            state.error = false
            state.forgotSuccess = false
        },
        postResetFailed: state => {
            state.loading = false
            state.error = true
        },
        logOut: state => {
            state.loading = false
            state.error = true
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
        },
        logOutFailed: state => {
            state.loading = false
            state.error = true
        },
        getProfile: state => {
            state.loading = true
            state.error = false
            state.refreshing = true
        },
        getProfileSuccess: (state, { payload }) => {
            state.name = payload.user.name
            state.mail = payload.user.email
            state.loading = false
            state.error = false
            state.refreshSuccess = true
            state.refreshing = false
            state.isUserLoaded = true
        },
        getProfileFailed: state => {
            state.loading = false
            state.error = true
            state.refreshSuccess = false
            state.isUserLoaded = false
        },
        refreshProfile: state => {
            state.loading = false
            state.error = true
            state.refreshing = true
        },
        refreshProfileSuccess: (state, { payload }) => {
            state.loading = false
            state.error = false
            state.refreshing = false
            state.isUserLoaded = true
            state.refreshSuccess = true
        },
        refreshProfileFailed: state => {
            state.loading = false
            state.refreshing = false
            state.error = true
            state.refreshSuccess = false
        },
        tokenNotFound: state => {
            state.isUserLoaded = false
        },
        firstTry: state => {
            state.refreshing = false
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
    tokenNotFound, firstTry
} = profileSlice.actions

export const profileSelector = (state: { profile: any; }) => state.profile

export default profileSlice.reducer
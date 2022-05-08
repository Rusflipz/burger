import { createSlice } from '@reduxjs/toolkit';
import { Iorder } from '../../utils/Interface';

interface CounterState {
    connectionClose: boolean;
    loadingOrder: boolean;
    errorOrder: boolean;
    connectionSuccessOrder: boolean;
    dataSuccess: boolean;
    orders: Array<Iorder> | null;
    orders1: Array<Iorder>;
}


export const initialState: CounterState = {
    connectionClose: false,
    loadingOrder: false,
    errorOrder: false,
    connectionSuccessOrder: false,
    dataSuccess: false,
    orders: null,
    orders1: [{ _id: '6259088c1a3b2c001bd008a6', ingredients: Array(2), status: 'done', name: 'Краторный бургер', createdAt: '2022-04-15T05:54:20.294Z', number: '123' }],
}

export const webSoket = createSlice({
    name: 'webSoket',
    initialState,
    reducers: {
        wsOpen: (state, { payload }) => {
            state.connectionClose = false
            state.loadingOrder = true
        },
        wsSuccess: (state) => {
            state.connectionClose = false
            state.loadingOrder = false
            state.connectionSuccessOrder = true
        },
        wsDataSuccess: (state, { payload }) => {
            state.connectionClose = false
            state.orders = payload
            state.orders1 = payload.orders
            state.dataSuccess = true
            state.loadingOrder = false
            state.connectionSuccessOrder = true
        },
        wsError: (state) => {
            state.loadingOrder = false
            state.connectionSuccessOrder = false
            state.dataSuccess = false
            state.errorOrder = true
        },
        wsClose: (state) => {
            state.connectionClose = true
            state.loadingOrder = false
            state.connectionSuccessOrder = false
            state.dataSuccess = false
            state.errorOrder = false
            state.orders = null
            state.orders1 = [{ _id: '6259088c1a3b2c001bd008a6', ingredients: Array(2), status: 'done', name: 'Краторный бургер', createdAt: '2022-04-15T05:54:20.294Z', number: '123' }]
        }
    }
})


export const {
    wsOpen, wsSuccess, wsDataSuccess, wsError, wsClose
} = webSoket.actions

export const webSoketSelector = (state: { webSoket: any; }) => state.webSoket

export const webSocketActions = webSoket.actions;

export default webSoket.reducer
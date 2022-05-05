import { createSlice } from '@reduxjs/toolkit';
import uniqid from 'uniqid';

interface CounterState {
    loadingOrder: boolean;
    errorOrder: boolean;
    connectionSuccessOrder: boolean;
    dataSuccess: boolean;
    loadingUserOrder: boolean;
    errorUserOrder: boolean;
    connectionSuccessUserOrder: boolean;
    userDataSuccess: boolean;
    orders: Array<any> | null;
    orders1: Array<any>;
    userOrders: Array<any> | null;
    userOrders1: Array<any>;
}


export const initialState: CounterState = {
    loadingOrder: false,
    errorOrder: false,
    connectionSuccessOrder: false,
    dataSuccess: false,
    loadingUserOrder: false,
    errorUserOrder: false,
    connectionSuccessUserOrder: false,
    userDataSuccess: false,
    orders: null,
    orders1: [{ _id: '6259088c1a3b2c001bd008a6', ingredients: Array(2), status: 'done', name: 'Краторный бургер', createdAt: '2022-04-15T05:54:20.294Z', number: '123' }],
    userOrders: null,
    userOrders1: [{ _id: '6259088c1a3b2c001bd008a6', ingredients: Array(2), status: 'done', name: 'Краторный бургер', createdAt: '2022-04-15T05:54:20.294Z', number: '123' }],
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        connectingOrders: (state) => {
            state.loadingOrder = true
        },
        connectingOrdersSuccess: (state) => {
            state.loadingOrder = false
            state.connectionSuccessOrder = true
        },
        getOrdersSuccess: (state, { payload }) => {
            state.orders = payload
            state.orders1 = payload.orders
            state.dataSuccess = true
            state.loadingOrder = false
            state.connectionSuccessOrder = true
        },
        failConnectingOrders: (state) => {
            state.loadingOrder = false
            state.connectionSuccessOrder = false
            state.dataSuccess = false
            state.errorOrder = true
        },
        connectingUserOrders: (state) => {
            state.loadingUserOrder = true
        },
        connectingUserOrdersSuccess: (state) => {
            state.loadingUserOrder = false
            state.connectionSuccessOrder = true
        },
        getUserOrdersSuccess: (state, { payload }) => {
            state.userOrders = payload
            state.userOrders1 = payload.orders
            state.userDataSuccess = true
            state.loadingUserOrder = false
            state.connectionSuccessUserOrder = true
        },
        
        getUserOrdersfail: (state) => {
            state.userDataSuccess = false
            state.loadingUserOrder = false
            state.connectionSuccessUserOrder = false
        },
        failConnectingUserOrders: (state) => {
            state.loadingUserOrder = false
            state.connectionSuccessUserOrder = false
            state.userDataSuccess = false
            state.errorUserOrder = true
        },
    }
})


export const {
    connectingOrders, connectingOrdersSuccess, getOrdersSuccess, failConnectingOrders,
    connectingUserOrders, connectingUserOrdersSuccess, getUserOrdersSuccess, getUserOrdersfail, failConnectingUserOrders
} = orderSlice.actions

export const orderSelector = (state: { order: any; }) => state.order

export default orderSlice.reducer
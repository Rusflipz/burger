import { createSlice } from '@reduxjs/toolkit';
import uniqid from 'uniqid';

export const initialState = {
    loadingOrder: false,
    errorOrder: false,
    connectionSuccessOrder: false,
    dataSuccess: false,
    loadingUserOrder: false,
    errorUserOrder: false,
    connectionSuccessUserOrder: false,
    userDataSuccess: false,
    orders: null,
    orders1: [{ _id: '6259088c1a3b2c001bd008a6', ingredients: Array(2), status: 'done', name: 'Краторный бургер', createdAt: '2022-04-15T05:54:20.294Z' }],
    userOrders: null,
    userOrders1: [{ _id: '6259088c1a3b2c001bd008a6', ingredients: Array(2), status: 'done', name: 'Краторный бургер', createdAt: '2022-04-15T05:54:20.294Z' }],
}

export const orderSlice = createSlice({
    name: 'profile',
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
            state.error = true
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
    connectingUserOrders, connectingUserOrdersSuccess, getUserOrdersSuccess, failConnectingUserOrders
} = orderSlice.actions

export const orderSelector = state => state.order

export default orderSlice.reducer
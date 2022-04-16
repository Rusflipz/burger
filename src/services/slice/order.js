import { createSlice } from '@reduxjs/toolkit';
import uniqid from 'uniqid';

export const initialState = {
    loading: false,
    error: false,
    orders: null,
    orders1: [{ _id: '6259088c1a3b2c001bd008a6', ingredients: Array(2), status: 'done', name: 'Краторный бургер', createdAt: '2022-04-15T05:54:20.294Z' }],
    userOrders: null,
    userOrders1: [{ _id: '6259088c1a3b2c001bd008a6', ingredients: Array(2), status: 'done', name: 'Краторный бургер', createdAt: '2022-04-15T05:54:20.294Z' }],
    dataSuccess: false,
    currentOrder: true,
    loading: true,
    userDataSuccess: false,
    isOrderOpen: false,
}

export const orderSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        getOrdersSuccess: (state, { payload }) => {
            state.orders = payload
            state.orders1 = payload.orders
            state.dataSuccess = true
            // state.loading = false
        },
        getUserOrdersSuccess: (state, { payload }) => {
            state.userOrders = payload
            state.userOrders1 = payload.orders
            state.userDataSuccess = true
            console.log('получил заказы пользователя')
            // state.loading = false
        },
        openOrder: (state) => {
            state.isOrderOpen = true
        },
        closeOrder: (state) => {
            state.isOrderOpen = true
        },
    },
})


export const {
    getOrdersSuccess,
    getUserOrdersSuccess,
} = orderSlice.actions

export const orderSelector = state => state.order

export default orderSlice.reducer
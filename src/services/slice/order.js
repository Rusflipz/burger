import { createSlice } from '@reduxjs/toolkit';
import uniqid from 'uniqid';

export const initialState = {
    loading: false,
    error: false,
    orders: null,
    orders1: [{ _id: '6259088c1a3b2c001bd008a6', ingredients: Array(2), status: 'done', name: 'Краторный бургер', createdAt: '2022-04-15T05:54:20.294Z'}],
    dataSuccess: false,
    currentOrder: true,
    currentOrderPrice: 0,
    loading: true
}

export const orderSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        getOrdersSuccess: (state, { payload }) => {
            state.orders = payload
            state.orders1 = payload.orders
            state.dataSuccess = true
            state.loading = false
            console.log('Получил данные пользователя')
        },
        scorePrice: (state, { payload }) => {
            state.currentOrderPrice = state.currentOrderPrice + payload;
            console.log('Получил данные пользователя')
        },
    },
})


export const {
    getOrdersSuccess,
    scorePrice,
} = orderSlice.actions

export const orderSelector = state => state.order

export default orderSlice.reducer
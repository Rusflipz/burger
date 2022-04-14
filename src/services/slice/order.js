import { createSlice } from '@reduxjs/toolkit';
import uniqid from 'uniqid';

export const initialState = {
    loading: false,
    error: false,
    data: []
}

export const orderSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        getOrdersSuccess: (state, { payload }) => {
            state.data = payload
            console.log(payload)
            console.log('Получил данные пользователя')
        },
    },
})


export const {
    getOrdersSuccess,
} = orderSlice.actions

export const orderSelector = state => state.order

export default orderSlice.reducer
import { createSlice } from '@reduxjs/toolkit';
import uniqid from 'uniqid';

export const initialState = {
    loading: false,
    error: false,
    ingredients: [],
    ingredientСomponents: [],
    isModalOpen: false,
    ModalType: '',
    constructor: {
        burger: [],
    },
    orderNumber: 0,
    orderName: '',
}

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        getIngredients: state => {
            state.loading = true;
        },
        getIngredientsSuccess: (state, { payload }) => {
            state.ingredients = payload
            state.loading = false
            state.error = false
        },
        getIngredientsFailed: state => {
            state.loading = false
            state.error = true
        },
        showIngredientСomponents: (state, { payload }) => {
            state.ingredientСomponents = payload
            state.isModalOpen = true
            state.ModalType = 'Ing'
        },
        removeIngredientСomponents: state => {
            state.ingredientСomponents = []
            state.isModalOpen = false
            state.ModalType = ''
        },
        addIngredientInConstructorItem: {
            reducer: (state, { payload }) => {
                state.constructor.burger = [...state.constructor.burger, payload]
            },
            prepare: item => {
                const uniqueID = uniqid()
                return { payload: { ...item, uniqueID } }
            }
        },
        deleteIngredientFromConstructorItem: (state, { payload }) => {
            if (payload.type === 'bun') {
                state.constructor.burger = state.constructor.burger.filter(item => item.type !== 'bun')
            } else {
                state.constructor.burger = [...state.constructor.burger].filter(item => item.uniqueID !== payload.uniqueID)
            }
        },
        dragItems: (state, { payload }) => {
            const draggableIngredients = state.constructor.burger.filter(item => item.type !== 'bun')
            const nonDraggableIngredients = state.constructor.burger.filter(item => item.type === 'bun')
            draggableIngredients[payload.dragIndex] = draggableIngredients.splice(payload.hoverIndex, 1, draggableIngredients[payload.dragIndex])[0]
            state.constructor.burger = draggableIngredients.concat(nonDraggableIngredients)
        },
        getOrder: state => {
            state.loading = true;
        },
        getOrderSuccess: (state, { payload }) => {
            state.loading = false
            state.orderNumber = payload.order.number
            state.orderName = payload.name
            state.isModalOpen = true
            state.ModalType = 'Order'
        },
        getOrderFailed: state => {
            state.orderNumber = 0
            state.orderName = 'Ошибка!'
        },
        closeOrderСomponentsModal: state => {
            state.constructor.burger = []
            state.orderNumber = 0
            state.orderName = ''
            state.isModalOpen = false
            state.ModalType = ''
        },
    },
})


export const {
    getIngredients,
    getIngredientsSuccess,
    getIngredientsFailed,
    showIngredientСomponents,
    removeIngredientСomponents,
    addIngredientInConstructorItem,
    deleteIngredientFromConstructorItem,
    clearConstructor,
    getOrder, getOrderFailed, getOrderSuccess, closeOrderСomponentsModal, dragItems } = ingredientsSlice.actions

export const ingredientsSelector = state => state.ingredients

export default ingredientsSlice.reducer
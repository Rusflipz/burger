import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import uniqid from 'uniqid';
import { Iingredients } from '../../utils/Interface'

interface CounterState {
    loading: boolean;
    error: boolean;
    ingredients: Array<Iingredients>;
    ingredientСomponents: Array<string>;
    ingredientModalOpen: boolean;
    constructor: {
        burger: Array<Iingredients>;
    };
    orderModalOpen: boolean;
    orderNumber: number;
    orderName: string;
}

export const initialState: CounterState = {
    loading: false,
    error: false,
    ingredients: [],
    ingredientСomponents: [],
    ingredientModalOpen: false,
    constructor: {
        burger: [],
    },
    orderModalOpen: false,
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
            state.ingredientModalOpen = true
        },
        removeIngredientСomponents: state => {
            state.ingredientСomponents = []
            state.ingredientModalOpen = false
        },
        addIngredientInConstructorItem: {
            reducer: (state, { payload }: { payload: Iingredients }) => {
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
            state.orderModalOpen = true
        },
        getOrderFailed: state => {
            state.orderNumber = 0
            state.orderName = 'Ошибка!'
        },
        closeOrderСomponentsModal: state => {
            state.constructor.burger = []
            state.orderNumber = 0
            state.orderName = ''
            state.orderModalOpen = false
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
    getOrder, getOrderFailed, getOrderSuccess, closeOrderСomponentsModal, dragItems } = ingredientsSlice.actions

export const ingredientsSelector = (state: { ingredients: any; }) => state.ingredients

export default ingredientsSlice.reducer
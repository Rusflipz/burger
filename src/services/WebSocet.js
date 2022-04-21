import {
    connectingOrders, connectingOrdersSuccess, getOrdersSuccess, failConnectingOrders,
    connectingUserOrders, connectingUserOrdersSuccess, getUserOrdersSuccess, failConnectingUserOrders
} from '../services/slice/order';
import { setCookie, deleteCookie, getCookie } from '../services/Cookie'



export const getOrders = () => {
    return async dispatch => {
        try {
            dispatch(connectingOrders())
            let order = null
            order = new WebSocket("wss://norma.nomoreparties.space/orders/all")

            order.onopen = (event) => {
                dispatch(connectingOrdersSuccess())
            }

            order.onmessage = (event) => {
                let ordersData = JSON.parse(event.data)
                dispatch(getOrdersSuccess(ordersData))
            }

            order.onclose = (event) => {
                dispatch(failConnectingOrders())
            }

            order.onerror = (event) => {
                dispatch(failConnectingOrders())
                console.log(`Ошибка ${event.message}`)
            }

        } catch (err) {
            console.log(err)
        }
    }
}

export const getUserOrders = () => {
    return async dispatch => {
        try {
            dispatch(connectingUserOrders())
            let userOrder = null
            let token = getCookie("token");
            userOrder = new WebSocket(`wss://norma.nomoreparties.space/orders?token=${token}`)

            userOrder.onopen = (event) => {
                dispatch(connectingUserOrdersSuccess())
            }

            userOrder.onmessage = (event) => {
                let userOrdersData = JSON.parse(event.data)
                dispatch(getUserOrdersSuccess(userOrdersData))
            }

            userOrder.onclose = (event) => {
                dispatch(failConnectingUserOrders())
            }

            userOrder.onerror = (event) => {
                dispatch(failConnectingUserOrders())
                console.log(`Ошибка ${event.message}`)
            }

        } catch (err) {
            console.log(err)
        }
    }
}

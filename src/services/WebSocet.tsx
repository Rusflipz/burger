import {
    connectingOrders, connectingOrdersSuccess, getOrdersSuccess, failConnectingOrders,
    connectingUserOrders, connectingUserOrdersSuccess, getUserOrdersSuccess, failConnectingUserOrders
} from './slice/order';
import { setCookie, deleteCookie, getCookie } from './Cookie'



export const getOrders = () => {
    return async (dispatch: (arg0: any) => void) => {
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
                console.log(`Соеденение закрыто`)
            }

            order.onerror = (event: any) => {
                dispatch(failConnectingOrders())
                console.log(`Ошибка ${event.message}`)
            }

        } catch (err) {
            console.log(err)
        }
    }
}

export const getUserOrders = () => {
    return async (dispatch: (arg0: any) => void) => {
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

            userOrder.onerror = (event: any) => {
                dispatch(failConnectingUserOrders())
                console.log(`Ошибка ${event.message}`)
            }

        } catch (err) {
            console.log(err)
        }
    }
}

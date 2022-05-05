import {
    connectingOrders, connectingOrdersSuccess, getOrdersSuccess, failConnectingOrders,
    connectingUserOrders, connectingUserOrdersSuccess, getUserOrdersSuccess, getUserOrdersfail, failConnectingUserOrders
} from './slice/order';
import { getCookie } from './Cookie'



export const getOrders = (action: string) => {
    return async (dispatch: any) => {
        try {
            dispatch(connectingOrders())
            let order = null
            order = new WebSocket("wss://norma.nomoreparties.space/orders/all")

            if (action == 'connect') {
                order.onopen = () => {
                    dispatch(connectingOrdersSuccess())
                }

                order.onmessage = (event) => {
                    let ordersData = JSON.parse(event.data)
                    dispatch(getOrdersSuccess(ordersData))
                }

                order.onclose = () => {
                    dispatch(failConnectingOrders())
                    console.log(`Соеденение закрыто`)
                }

                order.onerror = (event: any) => {
                    dispatch(failConnectingOrders())
                    console.log(`Ошибка ${event.message}`)
                }
            } else if (action == 'disconnect') {
                order.close()
                console.log(`Соеденение успешно закрыто`)
            }

        } catch (err) {
            console.log(err)
        }
    }
}

export const getUserOrders = (action: string) => {
    return async (dispatch: any) => {
        try {
            dispatch(connectingUserOrders())
            let userOrder = null
            let token = getCookie("token");
            userOrder = new WebSocket(`wss://norma.nomoreparties.space/orders?token=${token}`)

            if (action == 'connect') {

                userOrder.onopen = () => {
                    dispatch(connectingUserOrdersSuccess())
                }

                userOrder.onmessage = (event) => {
                    let userOrdersData = JSON.parse(event.data)
                    if (userOrdersData.success == false) {
                        dispatch(getUserOrdersfail())

                    } else {
                        dispatch(getUserOrdersSuccess(userOrdersData))
                    }
                }

                userOrder.onclose = () => {
                    dispatch(failConnectingUserOrders())
                }

                userOrder.onerror = (event: any) => {
                    dispatch(failConnectingUserOrders())
                    console.log(`Ошибка ${event.message}`)
                }
            } else if (action == 'disconnect') {
                userOrder.close()
                console.log(`Соеденение успешно закрыто`)
            }

        } catch (err) {
            console.log(err)
        }
    }
}

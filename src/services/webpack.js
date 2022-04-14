import { useDispatch } from "react-redux";
import { getOrdersSuccess } from "./slice/order"



export function WebSocket() {
const ws = new WebSocket("wss://norma.nomoreparties.space/orders/all") 

const dispatch = useDispatch();

ws.onopen = (event) => {
    console.log("Соединение установлено");
} 

ws.onmessage = (event) => {  //Получение данных из соеденения
   
    let ordersData = JSON.parse(event.data)
    dispatch(getOrdersSuccess(ordersData))
    console.log(ordersData.orders)
} 

ws.onerror = (event) => {
    console.log(`Ошибка ${event.message}`)
} 
}
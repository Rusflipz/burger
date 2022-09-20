import { Middleware } from "@reduxjs/toolkit";


//webSocketActions чем типизировать, если через slice написаны экшены
export const socketMiddleware = (webSocketActions: any): Middleware => {
//тут dispatch не типизируется, при поптыке типизировать, как вы показали выдает ошибки:
// 1) Псевдоним типа "AppDispatch" циклически ссылается на себя.
// 2)"socketMiddleware" неявно имеет тип возвращаемого значения any, так как у него нет заметки с типом возвращаемого значения, а также на него прямо или косвенно указана ссылка в одном из его выражений return.
// 3)"store" неявно имеет тип any, так как отсутствует аннотация типа и на "store" есть прямые или непрямые ссылки в его собственном инициализаторе.
    return (store: any) => {

        let socket: WebSocket | null;

        return (next: (arg0: any) => void) => (action: { type: any; payload: any; }) => {
            const { dispatch } = store;
            const { type, payload } = action;
            const { wsOpen, wsSuccess, wsDataSuccess, wsError, wsClose, wsCloseByServer } = webSocketActions;

            if (type === wsOpen.type) {
                let wsUrlAct = payload.url
                socket = new WebSocket(wsUrlAct);
            }

            if (socket) {
                socket.onopen = event => {
                    dispatch(wsSuccess());
                };

                socket.onerror = event => {
                    dispatch(wsError())
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const { success, ...parsedData } = JSON.parse(data);
                    if (success) {
                        dispatch(wsDataSuccess(parsedData));
                    }
                };

                socket.onclose = event => {
                    dispatch(wsCloseByServer)
                };

                if (type === wsClose.type) {
                    socket.close()
                }
            }
            next(action);
        };
    };
}

export default socketMiddleware
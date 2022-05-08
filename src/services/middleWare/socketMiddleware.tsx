import { webSocketActions } from "../slice/webSoket";


export const socketMiddleware = (wsUrl: string) => {
//тут dispatch не типизируется
    return (store: { dispatch: any }) => {

        let socket: WebSocket | null;

        return (next: (arg0: any) => void) => (action: { type: any; payload: any; }) => {
            const { dispatch } = store;
            const { type, payload } = action;
            const { wsOpen, wsSuccess, wsDataSuccess, wsError, wsClose } = webSocketActions;

            if (type === wsOpen.type) {
                let wsUrlAct;

                if (payload.token === null) {
                    wsUrlAct = `${wsUrl}/all`
                } else {
                    console.log('nen')
                    wsUrlAct = `${wsUrl}?token=${payload.token}`
                }

                console.log(wsUrlAct)
                socket = new WebSocket(wsUrlAct);
                console.log(socket)
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
                    dispatch(wsClose())
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
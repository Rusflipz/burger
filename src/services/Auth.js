// import { useContext, useState, createContext } from 'react';
// import { url, checkResponse } from '../utils/constants';
// import {
//     postRegist, postRegistSuccess, postRegistFailed,
//     postForgot, postForgotSuccess, postForgotFailed,
//     postReset, postResetSuccess, postResetFailed,
//     postLog, postLogSuccess, postLogFailed,
//     logOut, logOutSuccess, logOutFailed,
//     getProfile, getProfileSuccess, getProfileFailed,
// } from '../services/slice/profile'

// const AuthContext = createContext(undefined);

// export function ProvideAuth({ children }) {
//     const auth = useProvideAuth();
//     console.log(auth)
//     return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
// }

// export function useAuth() {
//     return useContext(AuthContext);
// }

// export function useProvideAuth() {
//     console.log('Зашел')
//     const [user, setUser] = useState(null);
//     const getProfileInformation = (information) => {
//         return async dispatch => {
//             dispatch(getProfile())
//             try {
//                 const response = await fetch(`${url}auth/logout`, {
//                     method: 'GET',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({
//                         "authorization": ""
//                     })
//                 })
//                 const data = await checkResponse(response)
//                 console.log(data)
//                 setUser({ ...data.user, id: data.user._id });
//                 dispatch(getProfileSuccess(data))
//             } catch (err) {
//                 console.log(err)
//                 dispatch(getProfileFailed())
//             }
//         }
//     }
// }
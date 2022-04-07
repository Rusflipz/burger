import { Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {getProfileInformation} from '../../services/api'
import {getCookie} from '../../services/Cookie'

export function ProtectedRoute({ children }) {
  // let { getUser, ...auth } = useAuth();
  const [isUserLoaded, setUserLoaded] = useState(false);
  let token = null;
  const init = async () => {
  token = getCookie('token')
  console.log(getCookie('token'))
  await getProfileInformation(token);
  
};

useEffect(() => {
  init();
}, []);

useEffect(() => {
  console.log('правлю')
  console.log(!isUserLoaded)
  setUserLoaded(!isUserLoaded)
}, [token]);


// if(token !== null){
//   console.log('поставил true')
//   setUserLoaded(true)
//   console.log(isUserLoaded)
// } else {
//   console.log('поставил false')
//   setUserLoaded(false)
// }


console.log(isUserLoaded)
  return (
    <Route
render={() =>
isUserLoaded
? (
          children
        ) : (
            <Redirect
                        to='/login'
          />
        )
      }
    />
  );
} 
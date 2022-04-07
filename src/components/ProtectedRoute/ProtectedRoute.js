import { Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {getProfileInformation} from '../../services/api'
import {getCookie} from '../../services/Cookie'

export function ProtectedRoute({ children }) {
  console.log(document.cookie)
  let token = null;
  const [isUserLoaded, setUserLoaded] = useState(false);
  const init = async () => {
  token = getCookie('token')
  console.log(getCookie('token'))
  await getProfileInformation(token);
  setUserLoaded(true);
};

useEffect(() => {
  init();
}, []);

  if (!isUserLoaded) {
  return null;
}


  return (
    <Route
      render={() => 
        isUserLoaded ? (
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
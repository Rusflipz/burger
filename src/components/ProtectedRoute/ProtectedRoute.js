import { Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {getProfileInformation} from '../../services/api'

export function ProtectedRoute({ children, ...rest }) {
 // Вернём из хранилища запрос на получение данных о пользователе и
  // текущий объект с пользователем
  let { getUser, ...auth } = getProfileInformation();
  const [isUserLoaded, setUserLoaded] = useState(false);
  const init = async () => {
      // Вызовем запрос getUser и изменим состояние isUserLoaded
  await getProfileInformation();
  setUserLoaded(true);
};

useEffect(() => {
      // При монтировании компонента запросим данные о пользователе
  init();
}, []);

  if (!isUserLoaded) {
  return null;
}


  return (
    <Route
      {...rest}
      render={() => 
        auth.user ? (
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
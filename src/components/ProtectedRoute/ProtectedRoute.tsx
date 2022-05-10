import { Route, Redirect, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks'
import React, { useEffect } from 'react';
import { profileSelector } from '../../services/slice/profile';
import { getProfileInformation } from '../../services/api';
import { Loading } from '../../pages/Loading/loading';
import { RouteProps } from 'react-router-dom'

export const ProtectedRoute = ({ children }: { children: RouteProps }) => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProfileInformation())
  }, [])

  const { isUserLoaded, profileSuccess, error } = useAppSelector(profileSelector);

  let location = useLocation();

  console.log(profileSuccess)
  console.log(error)

  if (profileSuccess !== true && error !== true) return <Loading />

  return (
    <Route
      render={() =>
        isUserLoaded ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  )

}

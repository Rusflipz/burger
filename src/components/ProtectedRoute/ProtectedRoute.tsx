import { Route, Redirect, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks'
import React, { useEffect } from 'react';
import { profileSelector } from '../../services/slice/profile';
import { getProfileInformation } from '../../services/api';
import { Loading } from '../../pages/Loading/loading';

export const ProtectedRoute = ({ children
}: { children: any }) => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProfileInformation())
    }, [])
    const { loading, isUserLoaded } = useAppSelector(profileSelector);

    let location = useLocation();

    if (loading) return <Loading />

    if (location.pathname == "/profile") {
        return (
            <Route
                render={({ location }) =>
                    isUserLoaded ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: location }
                            }}
                        />
                    )
                }
            />
        )
    } else if (location.pathname == "/login") {
        return (
            <Route
                render={({ location }) =>
                    !isUserLoaded ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/profile',
                                state: { from: location }
                            }}
                        />
                    )
                }
            />
        )
    }
    else if (location.pathname == "/forgot-password") {
        return (
            <Route
                render={({ location }) =>
                    !isUserLoaded ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/profile',
                                state: { from: location }
                            }}
                        />
                    )
                }
            />
        )
    } else if (location.pathname == "/reset-password") {
        return (
            <Route
                render={({ location }) =>
                    !isUserLoaded ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/profile',
                                state: { from: location }
                            }}
                        />
                    )
                }
            />
        )
    } else if (location.pathname == "/registration") {
        return (
            <Route
                render={({ location }) =>
                    !isUserLoaded ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/profile',
                                state: { from: location }
                            }}
                        />
                    )
                }
            />
        )
    } else if (location.pathname == "/profile/orders") {
        return (
            <Route
                render={({ location }) =>
                    isUserLoaded ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: location }
                            }}
                        />
                    )
                }
            />
        )
    } else { return <></> }
}
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthLayout from "../pages/_layouts/auth";
import DefaultLayout from "../pages/_layouts/default";

import { store } from '~/store';

export default function RouteWrapper({ component: Component, isPrivate = false, ...rest }) {
    const { signed } = store.getState().auth;

    // SE NÃO ESTIVER LOGADO E ROTA FOR PRIVADA 
    if (!signed && isPrivate) {
        return <Redirect to="/" />;
    }

    // SE ESTIVER LOGADO E ROTA NÃO FOR PRIVADA 
    if (signed && !isPrivate) {
        return <Redirect to="/dashboard" />;
    }

    const Layout = signed ? DefaultLayout : AuthLayout;

    return <Route {...rest} render={props => (
        <Layout>
            <Component {...props} />
        </Layout>
    )} />;
}
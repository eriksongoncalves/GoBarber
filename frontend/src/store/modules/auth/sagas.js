import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '~/services/history';
import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
    try {
        const { email, password } = payload;

        const response = yield call(api.post, 'sessions', {
            email,
            password
        });

        const { token, user } = response.data;

        if (!user.provider) {
            toast.error('Usuário não é prestador');
            return;
        }

        api.defaults.headers['authorization'] = `Bearer ${token}`;

        yield put(signInSuccess(token, user));

        history.push('/dashboard');
    }
    catch (e) {
        toast.error('Falha na autenticação, verifique os seus dados');
        yield put(signFailure());
    }
}

export function* signUp({ payload }) {
    try {
        const { name, email, password } = payload;

        yield call(api.post, 'users', {
            name,
            email,
            password,
            provider: true
        });

        history.push('/');
    }
    catch (e) {
        toast.error('Falha no cadastro, verifique os seus dados');
    }
}

export function setToken({ payload }) {

    if (!payload) return;

    const { token } = payload.auth;

    if (token) {
        api.defaults.headers['authorization'] = `Bearer ${token}`;
    }
}

export function signOut() {
    history.push('/');
}


export default all([
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    takeLatest('@auth/SIGN_UP_REQUEST', signUp),
    takeLatest('@auth/SIGN_OUT', signOut)

]);
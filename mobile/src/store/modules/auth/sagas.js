import { Alert } from 'react-native';
import { all, takeLatest, call, put } from 'redux-saga/effects';
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

        if (user.provider) {
            Alert.alert('Erro no login', 'O usuário não pode ser prestador de serviços');
            yield put(signFailure());
            return;
        }

        api.defaults.headers['authorization'] = `Bearer ${token}`;

        yield put(signInSuccess(token, user));
    }
    catch (e) {
        Alert.alert('Falha na autenticação', 'Houve um erro no login, verifique os seus dados');
        yield put(signFailure());
    }
}

export function* signUp({ payload }) {
    try {
        const { name, email, password } = payload;

        yield call(api.post, 'users', {
            name,
            email,
            password
        });
    }
    catch (e) {
        Alert.alert('Falha no cadastro', 'Houve um erro no cadastro, verifique os seus dados');
    }
}

export function setToken({ payload }) {

    if (!payload) return;

    const { token } = payload.auth;

    if (token) {
        api.defaults.headers['authorization'] = `Bearer ${token}`;
    }
}

export default all([
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    takeLatest('@auth/SIGN_UP_REQUEST', signUp)
]);
import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { updateProfileSuccess, updateProfileFailure } from './actions';

import api from '~/services/api';

export function* updateProfile({ payload }) {

    try {
        const { name, email, avatar_id, ...rest } = payload.data;

        const profile = Object.assign(
            { name, email, avatar_id },
            rest.oldPassword ? rest : {}
        );

        call(api.put, 'users', profile);

        toast.success('Perfil atualizado com sucesso!');
        yield put(updateProfileSuccess(profile));
    }
    catch (e) {
        toast.error('Erro ao atualizar o perfil, confira os seus dados!');
        yield put(updateProfileFailure());
    }
}


export default all([
    takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)
])
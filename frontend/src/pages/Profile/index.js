import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

import AvatarInput from './AvatarInput';

import { Container } from './styles';

const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string().required('O e-mail é obrigatório').email('Insira um e-mail válido')
})

export default function Profile() {
    const profile = useSelector(state => state.user.profile);
    const dispatch = useDispatch();

    function handleSubmit(data) {
        dispatch(updateProfileRequest(data));
    }

    function handleSignOut() {
        dispatch(signOut());
    }

    return (
        <Container>
            <Form schema={schema} initialData={profile} onSubmit={handleSubmit}>
                <AvatarInput name="avatar_id" />
                <Input name="name" placeholder="Seu nome completo" />
                <Input name="email" type="email" placeholder="Seu e-mail" />

                <hr />

                <Input name="oldPassword" type="password" placeholder="Sua senha atual" />
                <Input name="password" type="password" placeholder="Nova senha" />
                <Input name="confirmPassword" type="password" placeholder="Confirme sua senha" />

                <button type="submit">Atualizar perfil</button>
            </Form>
            <button type="button" onClick={handleSignOut}>Sair do GoBarber</button>
        </Container>
    )
}
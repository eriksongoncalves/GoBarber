import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Notifications from '../Notifications';

import { Container, Content, Profile } from './styles';

import logo from '~/assets/logo-purple.svg';


export default function Headers() {
    const profile = useSelector(state => state.user.profile);


    return (
        <Container>
            <Content>
                <nav>
                    <img src={logo} alt="GoBarber" />
                    <Link to="/dashboard">Dashboard</Link>
                </nav>

                <aside>
                    <Notifications />
                    <Profile>
                        <div>
                            <strong>{profile.name}</strong>
                            <Link to="/profile">Meu perfil</Link>
                        </div>
                        <img src={profile.avatar && profile.avatar.url || "https://api.adorable.io/avatars/50/abott@adorable.png"} alt={profile.name} />
                    </Profile>
                </aside>
            </Content>
        </Container>
    )
}
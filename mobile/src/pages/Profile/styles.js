import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.View`
    flex: 1;
`

export const Separator = styled.View`
    height: 1px;
    background: rgba(255,255,255,.2);
    margin: 20px 0 30px;
`


export const Title = styled.Text`
    font-size: 20px;
    color: #fff;
    font-weight: bold;
    align-self: center;
    margin-top: 30px;
`

export const Form = styled.ScrollView.attrs({
    showsVerticalIndicator: false,
    contentContainerStyle: { padding: 30 }
})`
    align-self: stretch;
    margin-top: 50px;
`

export const FormInput = styled(Input)`
    margin-bottom: 10px;
`

export const SubmitButton = styled(Button)`
    margin-top:5px;
`

export const LogoutButton = styled(Button)`
    margin-top:10px;
    background: #f64c75;
`



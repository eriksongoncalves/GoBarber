import React, { useMemo } from 'react';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { DatePickerAndroid } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";


import { Container, DateButton, DateText, Picker } from './styles';

export default function DateInput({ date, onChange }) {

    const dateFormatted = useMemo(
        () => format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt }),
        [date]
    );

    async function handleOpenPicker() {
        const { action, year, month, day } = await DatePickerAndroid.open({
            mode: 'spinner',
            date
        });

        if (action !== DatePickerAndroid.dateSetAction) {
            const selectedDate = new Date(year, month, day);
            onChange(selectedDate);
        }
    }

    return (
        <Container>
            <DateButton onPress={handleOpenPicker}>
                <Icon name="event" color="#fff" size={20} />
                <DateText>{dateFormatted}</DateText>
            </DateButton>
        </Container>
    );
}

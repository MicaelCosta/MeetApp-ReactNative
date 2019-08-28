import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import Header from '~/components/Header';

import {
    Container,
    ListMeetup,
    Content,
    Image,
    Meetup,
    MeetupTitle,
    Descricao,
    ButtonContainer,
} from './styles';

import api from '~/services/api';

export default function Inscricoes() {
    const [inscricoes, setInscricoes] = useState([]);

    async function loadInscricoes() {
        try {
            const response = await api.get('subscriptions');

            const data = response.data.map(inscricao => {
                const dateFormatted = format(
                    parseISO(inscricao.meetup.date_meetup),
                    "d 'de' MMMM ', às ' HH'h'",
                    {
                        locale: pt,
                    }
                );

                return {
                    ...inscricao,
                    dateFormatted,
                };
            });

            setInscricoes(data);
        } catch (err) {
            Alert.alert('Erro!', 'Erro ao carregar as inscrições!');
        }
    }

    useEffect(() => {
        loadInscricoes();
    }, []);

    async function cancelarInscricao(id) {
        try {
            await api.delete(`subscriptions/${id}`);
            loadInscricoes();

            Alert.alert('Sucesso!', 'Inscrição cancelada com sucesso!');
        } catch (err) {
            Alert.alert('Erro!', 'Não foi possível cancelar essa inscrição!');
        }
    }

    return (
        <Background>
            <Header />

            <Container>
                <ListMeetup
                    data={inscricoes}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item }) => (
                        <Content>
                            <Image
                                source={{
                                    uri: item.meetup.file
                                        ? item.meetup.file.url
                                        : `https://api.adorable.io/avatars/285/abott@adorable.png`,
                                }}
                                alt="banner"
                            />
                            <Meetup>
                                <MeetupTitle>{item.meetup.title}</MeetupTitle>
                                <Descricao>
                                    <Icon name="event" size={15} color="#999" />
                                    {item.dateFormatted}
                                </Descricao>
                                <Descricao>
                                    <Icon name="place" size={15} color="#999" />
                                    {item.meetup.location}
                                </Descricao>
                                <Descricao>
                                    <Icon
                                        name="person"
                                        size={15}
                                        color="#999"
                                    />
                                    Organizador: {item.meetup.user.name}
                                </Descricao>
                            </Meetup>

                            <ButtonContainer
                                onPress={() => cancelarInscricao(item.id)}
                            >
                                Cancelar Inscrição
                            </ButtonContainer>
                        </Content>
                    )}
                />
            </Container>
        </Background>
    );
}

Inscricoes.navigationOptions = {
    tabBarLabel: 'Inscrições',
    tabBarIcon: ({ tintColor }) => (
        <Icon name="local-offer" size={20} color={tintColor} />
    ),
};

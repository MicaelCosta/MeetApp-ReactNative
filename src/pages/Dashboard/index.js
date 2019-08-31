import React, { useEffect, useMemo, useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { format, subDays, addDays, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import Header from '~/components/Header';

import {
    Container,
    DateContainer,
    DateText,
    Mensagem,
    ListMeetup,
    ContentMeetup,
    Image,
    Meetup,
    TitleMeetup,
    DescricaoMeetup,
    InfoMeetup,
    ButtonContainer,
} from './styles';

import api from '~/services/api';

export default function Dashboard() {
    const [date, setDate] = useState(new Date());
    const [page, setPage] = useState(1);
    const [meetups, setMeetups] = useState([]);

    const dataAtual = useMemo(
        () => format(date, "dd 'de' MMMM", { locale: pt }),
        [date]
    );

    function handleSubdays() {
        setDate(subDays(date, 1));
        setPage(1);
        setMeetups([]);
    }

    function handleAdddays() {
        setDate(addDays(date, 1));
        setPage(1);
        setMeetups([]);
    }

    async function handleInscricao(meetupId) {
        try {
            await api.post(`meetups/${meetupId}/subscriptions`);

            Alert.alert('Sucesso!', 'Inscrição realizada com sucesso!');
        } catch (err) {
            Alert.alert('Erro!', 'Erro na inscrição!');
        }
    }

    useEffect(() => {
        async function loadMeetups() {
            const searchDate = format(date, "yyyy'-'MM'-'dd", {
                locale: pt,
            });

            // const response = await api.get(`meetups?date=${searchDate}&page=${page}`);
            const response = await api.get(`meetups?date=${searchDate}`);

            const data = response.data.map(meetup => {
                const dateFormatted = format(
                    parseISO(meetup.date_meetup),
                    "dd 'de' MMMM ', às ' H'h'",
                    {
                        locale: pt,
                    }
                );

                return {
                    ...meetup,
                    dateFormatted,
                };
            });

            setMeetups(data);
            // setMeetups([...meetups, ...data]);
        }

        loadMeetups();
    }, [date, meetups, page]);

    return (
        <Background>
            <Header />
            <Container>
                <DateContainer>
                    <TouchableOpacity onPress={handleSubdays}>
                        <Icon name="chevron-left" size={30} color="#fff" />
                    </TouchableOpacity>

                    <DateText>{dataAtual}</DateText>

                    <TouchableOpacity onPress={handleAdddays}>
                        <Icon name="chevron-right" size={30} color="#fff" />
                    </TouchableOpacity>
                </DateContainer>

                {!meetups || meetups.length <= 0 ? (
                    <Mensagem>Nenhum Meetup para esta data</Mensagem>
                ) : (
                    <ListMeetup
                        data={meetups}
                        keyExtractor={item => String(item.id)}
                        // onEndReached={() => setPage(page + 1)}
                        // onEndReachedThreshold={0.1}
                        renderItem={({ item }) => (
                            <ContentMeetup>
                                <Image
                                    source={{
                                        uri: item.file
                                            ? item.file.url
                                            : `https://api.adorable.io/avatars/285/${item.id}.png`,
                                    }}
                                />

                                <Meetup>
                                    <TitleMeetup>{item.title}</TitleMeetup>
                                    <DescricaoMeetup>
                                        <Icon
                                            name="event"
                                            size={15}
                                            color="#999"
                                        />
                                        <InfoMeetup>
                                            {item.dateFormatted}
                                        </InfoMeetup>
                                    </DescricaoMeetup>
                                    <DescricaoMeetup>
                                        <Icon
                                            name="place"
                                            size={15}
                                            color="#999"
                                        />
                                        <InfoMeetup>{item.location}</InfoMeetup>
                                    </DescricaoMeetup>
                                    <DescricaoMeetup>
                                        <Icon
                                            name="person"
                                            size={15}
                                            color="#999"
                                        />
                                        <InfoMeetup>
                                            Organizador: {item.user.name}
                                        </InfoMeetup>
                                    </DescricaoMeetup>
                                </Meetup>

                                {!item.past ? (
                                    <ButtonContainer
                                        onPress={() => handleInscricao(item.id)}
                                    >
                                        Realizar inscrição
                                    </ButtonContainer>
                                ) : null}
                            </ContentMeetup>
                        )}
                    />
                )}
            </Container>
        </Background>
    );
}

Dashboard.navigationOptions = {
    tabBarLabel: 'Meetups',
    tabBarIcon: ({ tintColor }) => (
        <Icon name="format-list-bulleted" size={20} color={tintColor} />
    ),
};

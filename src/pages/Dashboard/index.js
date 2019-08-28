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
    const [meetups, setMeetups] = useState([]);

    const dataAtual = useMemo(
        () => format(date, "d 'de' MMMM", { locale: pt }),
        [date]
    );

    function handleSubdays() {
        setDate(subDays(date, 1));
    }

    function handleAdddays() {
        setDate(addDays(date, 1));
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
            const queryDate = format(date, "yyyy'-'MM'-'dd", { locale: pt });

            const response = await api.get(`meetups?date=${queryDate}`);
            // const response = await api.get(`meetups`);

            const data = response.data.map(meetup => {
                const dateFormatted = format(
                    parseISO(meetup.date_meetup),
                    "d 'de' MMMM ', às ' H'h'",
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
        }

        loadMeetups();
    }, [date]);

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

                <ListMeetup
                    data={meetups}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item }) => (
                        <ContentMeetup>
                            <Image
                                source={{
                                    uri: item.file
                                        ? item.file.url
                                        : `https://api.adorable.io/avatars/285/abott@adorable.png`,
                                }}
                            />

                            <Meetup>
                                <TitleMeetup>{item.title}</TitleMeetup>
                                <DescricaoMeetup>
                                    <Icon name="event" size={15} color="#999" />
                                    <InfoMeetup>
                                        {item.dateFormatted}
                                    </InfoMeetup>
                                </DescricaoMeetup>
                                <DescricaoMeetup>
                                    <Icon name="place" size={15} color="#999" />
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

                            <ButtonContainer
                                past={item.past}
                                disable={item.past}
                                onPress={() => handleInscricao(item.id)}
                            >
                                Realizar inscrição
                            </ButtonContainer>
                        </ContentMeetup>
                    )}
                />
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

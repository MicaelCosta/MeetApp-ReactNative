import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.ScrollView`
    flex: 1;
`;

export const DateContainer = styled.View`
    margin: 30px 0 10px 0;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const DateText = styled.Text`
    margin: 0 15px;
    font-size: 20px;
    color: #fff;
`;

export const Mensagem = styled.Text`
    font-size: 20px;
    color: rgba(255, 255, 255, 0.6);
    align-self: center;
    margin-top: 20px;
`;

export const ListMeetup = styled.FlatList.attrs({
    contentContainerStyle: { padding: 20 },
})``;

export const ContentMeetup = styled.View`
    margin-bottom: 15px;
    height: 380px;
    background: #fff;
    border-radius: 4px;
    align-items: center;
`;
export const Image = styled.Image`
    height: 150px;
    width: 100%;
    border-radius: 4px;
`;

export const Meetup = styled.View`
    margin: 20px;
    flex-direction: column;
    align-self: flex-start;
`;

export const TitleMeetup = styled.Text`
    margin-bottom: 12px;
    font-size: 20px;
    color: #333;
    font-weight: bold;
`;
export const DescricaoMeetup = styled.View`
    margin-bottom: 12px;
    align-items: center;
    flex-direction: row;
`;

export const InfoMeetup = styled.Text`
    color: #999;
    font-size: 14px;
    margin-left: 5px;
`;

export const ButtonContainer = styled(Button)`
    align-self: stretch;
    margin: 0 15px;
    font-size: 16px;
    height: 40px;
    margin-bottom: 20px;
`;

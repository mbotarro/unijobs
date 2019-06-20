import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

import { getUserData, getUserPicture } from '../actions/LoginActions'

import UniText from '../constants/UniText'
import Button from './Button'

import CardsWrapper from './CardsWrapper'

export default class MyRequestCard extends React.Component {
    state = {
    }

    constructor (props) {
        super(props);
        this.state.userid = this.props.request.userid
    }

    render() {
        const { request, categories, onHidePress, onEditPress, onRemovePress, onQuit } = this.props;

        const ActionButton = (text, onPress, color) => (
            <Button
                text={text}
                buttonStyle={{ marginHorizontal: 64, paddingVertical: 10, marginTop: 10, backgroundColor: color }}
                onPress={() => onPress()}
            />
        )

        const HideButton = ActionButton('Ocultar', onHidePress, '#0BA5F2');
        const EditButton = ActionButton('Editar', onEditPress, '#0BA5F2');
        const RemoveButton = ActionButton('Remover', onRemovePress, '#EF513A');

        const ButtonWrapper = () => {
            return (
                <View style={{flexDirection: 'column', marginBottom: 30, marginTop: 30}}>
                    {HideButton}
                    {EditButton}
                    {RemoveButton}
                </View>
            )
        }
        
        return (
            <CardsWrapper
                request={request}
                categories={categories}
                ButtonWrapper={ButtonWrapper}
                Cards={() => (null)}
                onQuit = {onQuit}
            />
        )
    }
}


const containerStyles = StyleSheet.create({
    cardsContainer: {
        marginTop: 20,
        marginBottom: 30,
        flexDirection: 'column',
        flex: 1,
    },
});

const textStyles = StyleSheet.create({
    userName: {
        marginBottom: 5,
        alignSelf: 'center',
        marginHorizontal: 12,
        textAlign: 'left',
        marginTop: 8,
        color: '#00A5F2',
        fontSize: UniText.normal,
        fontWeight: '600'
    }
})

const myFeedCategoriesTest = [
    { Name: 'category1' },
    { Name: 'category2' },
    { Name: 'category3' },
    { Name: 'category4' },
    { Name: 'category5' },
    { Name: 'category6' },
    { Name: 'category7' },
]

const myFeedTestRequests = [
    {
        ID: 0,
        Name: 'Titulo Solicitação',
        Description: 'Descrição bem grande o suficiente para usar todo o espaço disponível em preview limitado em espaço máximo e restrito!!!!!!!!!!!!!!!!!!!!!!!!!!',
        ExtraInfo: '',
        MinPrice: 'XXXXX',
        MaxPrice: 'XXXXX',
        Userid: 0,
        Categoryid: 0,
    },
    {
        ID: 1,
        Name: '***Aula de Cálculo Numérico***',
        Description: 'Correção de exercícios e revisão teórica. Aulas em grupos de 3 a 4 pessoas',
        ExtraInfo: '',
        MinPrice: '50',
        MaxPrice: '50',
        Userid: 0,
        Categoryid: 1,
    },
    {
        ID: 2,
        Name: 'Aula de Piano',
        Description: 'Teoria da música, leitura de partituras e exercícios de dedo. Aprenda suas músicas favoritas!',
        ExtraInfo: '',
        MinPrice: '100',
        MaxPrice: '100',
        Userid: 0,
        Categoryid: 2,
    },
    {
        ID: 3,
        Name: 'Tradução Chinês - Português',
        Description: 'Tradução em chinês tradicional ou simplificado. Preço por página em português.',
        ExtraInfo: '',
        MinPrice: '30',
        MaxPrice: '30',
        Userid: 0,
        Categoryid: 3,
    }
]
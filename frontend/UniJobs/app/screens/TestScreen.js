"use strict";

import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, ScrollView } from 'react-native';

import ItemMiniCard from '../components/ItemMiniCard';
import { populateRequestMiniCards } from '../components/FeedMiniCards';

import UniStyles from '../constants/UniStyles'
import UniData from '../constants/UniData'
import UniColors from '../constants/UniColors'


export default class TestScreen extends React.Component {
    static navigationOptions = { header: null };

    state = {
        // use for store data
    }


    async componentDidMount() {
        // use for fetching data to show
    }

    render() {

        const miniCards = populateRequestMiniCards(testRequests);

        return (
            <ScrollView contentContainerStyle = { styles.container }>
                <Text style={UniStyles.text}>
                    Welcome to UniJobs!
                </Text>
                { miniCards }
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
});








// TEST !!! (TODO: REMOVE)
const testRequests = [
    {
        ID : 0,
        Name : 'Titulo Solicitação',
        Description : 'Descrição bem grande o suficiente para usar todo o espaço disponível em preview limitado em espaço máximo e restrito!!!!!!!!!!!!!!!!!!!!!!!!!!',
        ExtraInfo : '',
        MinPrice : 'XXXXX',
        MaxPrice: 'XXXXX',
        UserId : 0,
        CategoryId : 0,
    },
    {
        ID : 1,
        Name : 'Aula de Cálculo Numérico',
        Description : 'Correção de exercícios e revisão teórica. Aulas em grupos de 3 a 4 pessoas',
        ExtraInfo : '',
        MinPrice : '50',
        MaxPrice: '50',
        UserId : 0,
        CategoryId : 1,
    },
    {
        ID : 2,
        Name : 'Aula de Piano',
        Description : 'Teoria da música, leitura de partituras e exercícios de dedo. Aprenda suas músicas favoritas!',
        ExtraInfo : '',
        MinPrice : '100',
        MaxPrice: '100',
        UserId : 0,
        CategoryId : 2,
    },
    {
        ID : 3,
        Name : 'Tradução Chinês - Português',
        Description : 'Tradução em chinês tradicional ou simplificado. Preço por página em português.',
        ExtraInfo : '',
        MinPrice : '30',
        MaxPrice: '30',
        UserId : 0,
        CategoryId : 3,
    },
    {
        ID : 4,
        Name : 'Aula de Mandarim',
        Description : 'Aula em grupos de 3. Aulas em mandarim (professor não fala português)',
        ExtraInfo : '',
        MinPrice : '80',
        MaxPrice: '80',
        UserId : 0,
        CategoryId : 2,
    },
]

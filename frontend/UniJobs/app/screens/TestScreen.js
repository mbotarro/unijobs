"use strict";

import React from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';

import ItemMiniCard from '../components/ItemMiniCard';


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
        return (
            <View style={styles.container}>
                <Text style={UniStyles.text}>
                    Welcome to UniJobs!
                </Text>
                <ItemMiniCard 
                    image = {<View style = {{width: 80, height: 80, backgroundColor: UniColors.dark_grey}}/>}
                    titleText = 'Titulo Solicitação'
                    contentText = 'Descrição bem grande o suficiente para usar todo o espaço disponível em preview limitado em espaço máximo e restrito!!!!!!!!!!!!!!!!!!!!!!!!!!'
                    categoryText = 'Categoria'
                    priceText = 'Preço'
                    onPress = {() => {}}
                />
            </View>
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
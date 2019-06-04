"use strict";

import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, ScrollView, TouchableHighlight } from 'react-native';

import { populateRequestMiniCards } from '../components/FeedMiniCards';

import UniStyles from '../constants/UniStyles'
import UniColors from '../constants/UniColors'
import UniText from '../constants/UniText'
import UniData from '../constants/UniData'


export default class FeedRequestScreen extends React.Component {
    static navigationOptions = { title: 'Solicitações' };
    
    state = {
        // use for store data
    }

    textStrings = {
        searchBarPlaceHolder: 'Buscar Solicitações',
    }


    async componentDidMount() {
        // use for fetching data to show
    }

    onMenuButtonPress(navigate) {
        alert('TODO: Integrate with menu (Bruna)');
    }

    onSearchBarChangeText(navigate, text) {

    }

    onSearch (navigate) {
        alert('TODO: Search ');
    }

    onMyFeedPress(navigate) {
        alert('TODO: Hide feed');
    }

    onMyFeedFilterPress(navigate) {
        alert('TODO: Filters');
    }

    onAllFeedPress(navigate) {
        alert('TODO: Hide feed');
    }

    onAllFeedFilterPress(navigate) {
        alert('TODO: Filters');
    }


    render() {
        const { navigate } = this.props.navigation;

        // header
        const menuButton = (
            <TouchableHighlight
                underlayColor={UniColors.main}
                onPress={() => this.onMenuButtonPress(navigate)}
                style={styles.menuButton}
            >
                <Image source={require('../assets/icons/line-menu.png')} />
            </TouchableHighlight>
        );

        const searchBar = (
            <View style = {styles.searchBarView} >
                <TextInput
                    style={styles.searchBarText}
                    placeholder={this.textStrings.searchBarPlaceHolder}
                    onChangeText={(text) => { this.onSearchBarChangeText(navigate, text) }}
                    onSubmitEditing={(event) => this.onSearch(navigate)}
                />
                <TouchableHighlight
                    underlayColor= {UniColors.transparent}
                    onPress = {(event) => this.onSearch(navigate)}
                >
                    <Image
                        source={require('../assets/icons/search.png')}
                        style = {styles.searchBarIcon}
                    />
                </TouchableHighlight>
            </View>
        );

        const searchHeader = (
            <View style={styles.searchHeader} >
                {menuButton}
                {searchBar}
            </View>
        );

        // feed headers
        const feedHeader = (text, onPress, onFilter, showFilter) => {
            return (
            <View style = {styles.feedBar}>
                <TouchableHighlight 
                    underlayColor = {UniColors.transparent}
                    onPress = {() => onPress(navigate)}
                    style={{flexGrow: 1, alignSelf: 'stretch'}}
                >
                    <View style={{flexDirection: 'row'}}>
                        <Image
                            source = {require('../assets/icons/arrow-down.png')}
                            style = {styles.feedBarLeftIcon}
                        />
                        <Text style = {styles.feedBarText}>
                            {text}
                        </Text>
                    </View>
                </TouchableHighlight>
                {
                    showFilter ?
                    <TouchableHighlight
                        underlayColor = {UniColors.transparent}
                        onPress = {() => onFilter(navigate)}
                        style = {styles.feedBarRightIcon}
                    >
                        <Image
                            source = {require('../assets/icons/controls.png')}
                        />
                    </TouchableHighlight>
                    :
                    <View />
                }
            </View>
        )};

        const myFeedHeader = feedHeader('Novas Solicitações', this.onMyFeedPress, this.onMyFeedFilterPress, false);
        
        const generalFeedHeader = feedHeader('Novas Solicitações', this.onAllFeedPress, this.onAllFeedFilterPress, true);
        
        // feed
        const miniCards = populateRequestMiniCards(testRequests);

        return (
            <View style={styles.container} >
                <View style = {styles.headerContainer}>
                    {searchHeader}
                    {myFeedHeader}
                    <View style = {{marginTop: 2}} />
                    {generalFeedHeader}
                </View>
                <ScrollView contentContainerStyle={styles.feedContainer}>
                    {miniCards}
                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex:           1,
        alignSelf:      'stretch',
    },

    headerContainer: {
        zIndex:         1
    },

    feedContainer: {
        paddingTop:      2,
        paddingBottom:   5,
        alignSelf:      'stretch',
    },

    searchHeader : {
        flexDirection:   'row',
        alignSelf:       'stretch',
        backgroundColor: UniColors.main,
    },

    menuButton: {
        marginTop:      38,
        marginLeft:     20,
        marginBottom:   14,
    },

    searchBarView : {
        backgroundColor:UniColors.light,
        borderRadius:   25,

        height:         30,
        marginLeft:     20,
        marginRight:    20,
        marginTop:      35,
        flex:           1,
        flexDirection:  'row',
        justifyContent: 'space-between',
    },

    searchBarText: {
        paddingLeft:    15,
        paddingRight:   5,
        paddingVertical:6,
        flexGrow:       1,
        width:          0,

        fontSize:       UniText.normal,
        color:          UniColors.dark,
        textAlign:      'left',
    },

    searchBarIcon: {
        marginRight:    15,
        marginTop:      7,
    },

    feedBar: {
        flexDirection:  'row',

        backgroundColor:UniColors.white,
        alignSelf:      'stretch', 
        
        shadowOffset:   { width: 0, height: 2 },
        shadowRadius :  2,
        shadowColor:    UniColors.black,
        shadowOpacity:  0.16,
    },

    feedBarLeftIcon: {
        marginLeft:     23,
        marginVertical: 10,
    },

    feedBarRightIcon: {
        marginRight:    23,
        marginVertical: 8,
    },

    feedBarText: {
        marginLeft:     22,
        flexGrow:       1,

        fontSize:       UniText.big,
        color:          UniColors.dark,
        marginVertical: 10,
    }
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

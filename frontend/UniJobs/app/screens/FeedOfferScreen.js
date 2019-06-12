"use strict";

import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, ScrollView, TouchableHighlight, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { populateRequestMiniCards } from '../components/FeedMiniCards';
import { loadRequests, loadCategories } from '../actions/FeedActions'

import UniStyles from '../constants/UniStyles'
import UniColors from '../constants/UniColors'
import UniText from '../constants/UniText'


export default class FeedRequestScreen extends React.Component {
    static navigationOptions = { title: 'Ofertas' };
    
    state = {
        isLoading : true,
        isMyFeedOpen: false,

        searchBarText: '',
        
        allFeedRequests: {},
        myFeedRequests: {},
        categories: {},
    }

    textStrings = {
        searchBarPlaceHolder: 'Buscar Ofertas',
        myFeedHeader: 'Minhas Ofertas',
        allFeedHeader: 'Últimas Ofertas'
    }


    async componentDidMount() {
        // use for fetching data to show
        loadCategories((categories) => {
            var hash = {}
            for (var i = 0; i < categories.length; i++)
                hash[categories[i].ID] = categories[i];
            this.setState({categories: hash})

            loadRequests((requests) => {
                this.setState({allFeedRequests: requests, myFeedRequests: myFeedTestRequests});
                this.setState({isLoading: false});
                // console.log(requests)
            })
        });
    }
 
    onMenuButtonPress(navigation) {
        navigation.openDrawer();
    }

    onSearchBarChangeText(navigation, text) {
        this.setState({searchBarText: text})
    }

    onSearch (navigation) {
        alert('TODO: Search');
    }

    onMyFeedPress(self, navigation) {
        // !! self here is because something is overriding 'this', and
        // I don't know why! (maybe the arrow function... :/)
        self.setState({isMyFeedOpen: !self.state.isMyFeedOpen})
    }

    onMyFeedFilterPress(self, navigation) {
        alert('TODO: Filters');
    }

    onAllFeedPress(self, navigation) {
    }

    onAllFeedFilterPress(self, navigation) {
        alert('TODO: Filters');
    }


    render() {
        const navigation = this.props.navigation;


        // header
        const menuButton = (
            <TouchableHighlight
                underlayColor={UniColors.main}
                onPress={() => this.onMenuButtonPress(navigation)}
            >
                <Image source={require('../assets/icons/line-menu.png')}  style={styles.menuButton} />
            </TouchableHighlight>
        );

        const searchBar = (
            <View style = {styles.searchBarView} >
                <TextInput
                    style={styles.searchBarText}
                    placeholder={this.textStrings.searchBarPlaceHolder}
                    onChangeText={(text) => { this.onSearchBarChangeText(navigation, text) }}
                    onSubmitEditing={(event) => this.onSearch(navigation)}
                />
                <TouchableHighlight
                    underlayColor= {UniColors.transparent}
                    onPress = {(event) => this.onSearch(navigation)}
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
        const feedHeader = (text, onPress, onFilter, showFilter, showDropDown) => {
            return (
            <View style = {styles.feedBar}>
                <TouchableHighlight 
                    underlayColor = {UniColors.transparent}
                    onPress = {() => onPress(this, navigation)}
                    style={{flexGrow: 1, alignSelf: 'stretch'}}
                >
                    <View style={{flexDirection: 'row'}}>
                        {
                            showDropDown ?
                                <Image
                                    source = {require('../assets/icons/arrow-down.png')}
                                    style = {styles.feedBarLeftIcon}
                                />
                                :
                                <View style = {{marginLeft: 43}} />
                        }
                        <Text style = {styles.feedBarText}>
                            {text}
                        </Text>
                    </View>
                </TouchableHighlight>
                {
                    showFilter ?
                        <TouchableHighlight
                            underlayColor = {UniColors.transparent}
                            onPress = {() => onFilter(navigation)}
                            style = {styles.feedBarRightIcon}
                        >
                            <Image
                                source = {require('../assets/icons/controls.png')}
                            />
                        </TouchableHighlight>
                        :
                        null
                }
            </View>
        )};

        const myFeedHeader = feedHeader(
            this.textStrings.myFeedHeader,
            this.onMyFeedPress,
            this.onMyFeedFilterPress,
            this.state.isMyFeedOpen,
            !this.state.isMyFeedOpen
        );
        
        const allFeedHeader = feedHeader(
            this.textStrings.allFeedHeader,
            this.onAllFeedPress,
            this.onAllFeedFilterPress,
            !this.state.isMyFeedOpen,
            this.state.isMyFeedOpen
        );
        

        // feed
        const feedView = this.state.isLoading ?
            <ActivityIndicator style={{ marginTop: 10 }} />
            :
            populateRequestMiniCards(
                this.state.isMyFeedOpen ? this.state.myFeedRequests : this.state.allFeedRequests,
                this.state.categories
            );


        return (
            <KeyboardAwareScrollView
                contentContainerStyle={{ flex: 1 }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={false}
            >
                <View style={styles.container} >
                    <View style={styles.headerContainer}>
                        {searchHeader}
                        {myFeedHeader}
                        {
                            !this.state.isMyFeedOpen ?
                                <View style={{ marginTop: 2 }}>
                                    {allFeedHeader}
                                </View>
                                :
                                null
                        }
                    </View>
                    <ScrollView contentContainerStyle={styles.feedContainer}>
                        {feedView}
                    </ScrollView>
                </View>
            </KeyboardAwareScrollView>
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
const myFeedTestRequests = [
    {
        ID : 0,
        Name : 'Titulo Oferta',
        Description : 'Descrição bem grande o suficiente para usar todo o espaço disponível em preview limitado em espaço máximo e restrito!!!!!!!!!!!!!!!!!!!!!!!!!!',
        ExtraInfo : '',
        MinPrice : 'XXXXX',
        MaxPrice: 'XXXXX',
        Userid : 0,
        Categoryid : 0,
    },
    {
        ID : 1,
        Name : 'Aula de Cálculo Numérico',
        Description : 'Correção de exercícios e revisão teórica. Aulas em grupos de 3 a 4 pessoas',
        ExtraInfo : '',
        MinPrice : '50',
        MaxPrice: '50',
        Userid : 0,
        Categoryid : 1,
    },
    {
        ID : 2,
        Name : 'Aula de Piano',
        Description : 'Teoria da música, leitura de partituras e exercícios de dedo. Aprenda suas músicas favoritas!',
        ExtraInfo : '',
        MinPrice : '100',
        MaxPrice: '100',
        Userid : 0,
        Categoryid : 2,
    },
    {
        ID : 3,
        Name : 'Tradução Chinês - Português',
        Description : 'Tradução em chinês tradicional ou simplificado. Preço por página em português.',
        ExtraInfo : '',
        MinPrice : '30',
        MaxPrice: '30',
        Userid : 0,
        Categoryid : 3,
    },
    {
        ID : 4,
        Name : 'Aula de Mandarim',
        Description : 'Aula em grupos de 3. Aulas em mandarim (professor não fala português)',
        ExtraInfo : '',
        MinPrice : '80',
        MaxPrice: '80',
        Userid : 0,
        Categoryid : 2,
    },
    {
        ID : 4,
        Name : 'Aula de Mandarim',
        Description : 'Aula em grupos de 3. Aulas em mandarim (professor não fala português)',
        ExtraInfo : '',
        MinPrice : '80',
        MaxPrice: '80',
        Userid : 0,
        Categoryid : 12,
    },
    {
        ID : 4,
        Name : 'Aula de Mandarim',
        Description : 'Aula em grupos de 3. Aulas em mandarim (professor não fala português)',
        ExtraInfo : '',
        MinPrice : '80',
        MaxPrice: '80',
        Userid : 0,
        Categoryid : 8,
    },
    {
        ID : 4,
        Name : 'Aula de Mandarim',
        Description : 'Aula em grupos de 3. Aulas em mandarim (professor não fala português)',
        ExtraInfo : '',
        MinPrice : '80',
        MaxPrice: '80',
        Userid : 0,
        Categoryid : 9,
    },
    {
        ID : 4,
        Name : 'Aula de Mandarim',
        Description : 'Aula em grupos de 3. Aulas em mandarim (professor não fala português)',
        ExtraInfo : '',
        MinPrice : '80',
        MaxPrice: '80',
        Userid : 0,
        Categoryid : 7,
    },
]

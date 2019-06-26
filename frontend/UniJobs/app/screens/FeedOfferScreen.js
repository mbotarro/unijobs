"use strict";

import React from 'react';
import { Platform, StyleSheet, Text, TextInput, View, Image, ScrollView, TouchableHighlight, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Dimensions,AsyncStorage } from "react-native";

import { populateRequestMiniCards } from '../components/FeedMiniCards';
import { loadOffers, loadMyOffers, loadCategories } from '../actions/FeedActions'
import FeedCard from '../components/FeedCard'
import FloatActionButton from '../components/FloatActionButton'

import UniStyles from '../constants/UniStyles'
import UniColors from '../constants/UniColors'
import UniText from '../constants/UniText'
import UniData from '../constants/UniData'



export default class FeedOfferScreen extends React.Component {
    static navigationOptions = { title: 'Ofertas' };
    
    state = {
        isLoading : true,
        isMyFeedOpen: false,

        userid: null,

        searchBarText: '',
        
        allFeedOffers: {},
        myFeedOffers: {},
        categories: {},

        isOfferCardOpen: false,
        openOffer: null,
    }

    textStrings = {
        searchBarPlaceHolder: 'Buscar Ofertas',
        myFeedHeader: 'Minhas Ofertas',
        allFeedHeader: 'Últimas Ofertas'
    }

    isOffer = true

    async componentDidMount() {
        try {
            const userid = parseInt(await AsyncStorage.getItem(UniData.userid));
            this.setState({userid: userid})
            // use for fetching data to show
            loadCategories((categories) => {
                var hash = {}
                for (var i = 0; i < categories.length; i++)
                    hash[categories[i].id] = categories[i];
                this.setState({categories: hash})

                loadOffers((offers) => {
                    this.setState({allFeedOffers: offers});
                }, userid)
                loadMyOffers(userid, (myOffers) => {
                    this.setState({myFeedOffers: myOffers});
                    this.setState({isLoading: false});
                })
            });
        } catch (error) {
        }
    }

    onMenuButtonPress(navigation) {
        navigation.openDrawer();
    }

    onSearchBarChangeText(navigate, text) {
        this.setState({searchBarText: text})
    }

    onSearch (navigate) {
        alert('TODO: Search');
    }

    onMyFeedPress(self, navigate) {
        // !! self here is because something is overriding 'this', and
        // I don't know why! (maybe the arrow function... :/)
        self.setState({isMyFeedOpen: !self.state.isMyFeedOpen})
    }

    onMyFeedFilterPress(self, navigate) {
        alert('TODO: Filters');
    }

    onAllFeedPress(self, navigate) {
    }

    onAllFeedFilterPress(self, navigate) {
        alert('TODO: Filters');
    }

    onAddOfferPress(self, navigate) {
        navigate('AddOffer')
    }

    onAddRequestPress(self, navigate) {
        navigate('AddRequest')
    }

    updateFeed() {
        loadOffers((offers) => {
            this.setState({allFeedOffers: offers});
        }, this.state.userid)
    }

    render() {
        const { navigate } = this.props.navigation;

        // header
        const menuButton = (
            <TouchableHighlight
                underlayColor={UniColors.main}
                onPress={() => this.onMenuButtonPress(this.props.navigation)}
            >
                <Image source={require('../assets/icons/line-menu.png')}  style={styles.menuButton} />
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
        const feedHeader = (text, onPress, onFilter, showFilter, showDropDown) => {
            return (
            <View style = {styles.feedBar}>
                <TouchableHighlight 
                    underlayColor = {UniColors.transparent}
                    onPress = {() => onPress(this, navigate)}
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
                                this.state.isMyFeedOpen ?
                                    <Image 
                                        source = {require('../assets/icons/arrow-up.png')}
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
                            onPress = {() => onFilter(navigate)}
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
                this.state.isMyFeedOpen ? this.state.myFeedOffers : this.state.allFeedOffers,
                this.state.categories,
                (offer) => this.setState({isOfferCardOpen: true, openOffer: offer})
            );

        const openCard = 
            this.state.isOfferCardOpen ?
                <View style = {styles.openCard}>
                {
                    this.state.isLoading ?
                    <ActivityIndicator style={{ marginTop: 10 }} />
                    :
                    <FeedCard
                        offer = {this.state.openOffer}
                        categories = {this.state.categories}
                        onCreateOfferPress = {() => {}}
                        onShowOfferer = {() => {}}
                        onQuit = {() => this.setState({isOfferCardOpen: false})}
                        isOffer = {this.isOffer}
                        updateFeed={() => this.updateFeed()}
                        loggedUserid={this.state.userid}
                        myFeedOpen ={this.state.isMyFeedOpen}
                    />
                }
                </View>
                :
                null;

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
                {openCard}
                <FloatActionButton
                    onAddOfferPress={() => this.onAddOfferPress(this, navigate)}
                    onAddRequestPress={() => this.onAddRequestPress(this, navigate)}
                />
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
        zIndex:         1,
    },

    feedContainer: {
        ...Platform.select({
            android: {   
                backgroundColor: '#dfdfdf',
            }
        }),
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
        
        ...Platform.select({
            ios: {
                shadowOffset:   { width: 0, height: 2 },
                shadowRadius :  2,
                shadowColor:    UniColors.black,
                shadowOpacity:  0.16,
            },
            android: {   
                elevation: 2,
            },
          }),
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
    },

    openCard: {
        zIndex: 10,
        position: 'absolute',
        top: 0,
        backgroundColor: '#65737E80',

        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
});


// TEST !!! (TODO: REMOVE)
const myFeedTestOffers = [
    {
        id : 0,
        name : 'Titulo Solicitação',
        description : 'Descrição bem grande o suficiente para usar todo o espaço disponível em preview limitado em espaço máximo e restrito!!!!!!!!!!!!!!!!!!!!!!!!!!',
        extrainfo : 'some extrasasijhdjfashdfiusjhfdjkasdhfajklsdfhakjdfhaskjdfhaskdjfhaskjdfhasjkdfhasdjkfh',
        minprice : 'XXXXX',
        maxprice: 'XXXXX',
        expiration: '2020-06-20T03:00:13.250602Z',  //just for offer
        userid : 0,
        categoryid : 5,
        telephone: '0000-0000',                     //just for offer   
        email: 'user@user.com'                      //just for offer
    },
    {
        id : 1,
        name : 'Aula de Cálculo Numérico',
        description : 'Correção de exercícios e revisão teórica. Aulas em grupos de 3 a 4 pessoas',
        extrainfo : '',
        minprice : '50',
        maxprice: '50',
        userid : 0,
        categoryid : 1,
        expiration: '2020-06-20T03:00:13.250602Z',
        telephone: '0000-0000',   
        email: 'user@user.com'
    },
    {
        id : 2,
        name : 'Aula de Piano',
        description : 'Teoria da música, leitura de partituras e exercícios de dedo. Aprenda suas músicas favoritas!',
        extrainfo : '',
        minprice : '100',
        maxprice: '100',
        userid : 0,
        categoryid : 2,
        expiration: '2020-06-20T03:00:13.250602Z',
        telephone: '0000-0000',                 
        email: 'user@user.com'  
    },
    {
        id : 3,
        name : 'Tradução Chinês - Português',
        description : 'Tradução em chinês tradicional ou simplificado. Preço por página em português.',
        extrainfo : '',
        minprice : '30',
        maxprice: '30',
        userid : 0,
        categoryid : 3,
        expiration: '2020-06-20T03:00:13.250602Z',
        telephone: '0000-0000',   
        email: 'user@user.com' 
    },
    {
        id : 4,
        name : 'Aula de Mandarim',
        description : 'Aula em grupos de 3. Aulas em mandarim (professor não fala português)',
        extrainfo : '',
        minprice : '80',
        maxprice: '80',
        userid : 0,
        categoryid : 2,
        expiration: '2020-06-20T03:00:13.250602Z',
        telephone: '0000-0000',
        email: 'user@user.com'
    },
    {
        id : 4,
        name : 'Aula de Mandarim',
        description : 'Aula em grupos de 3. Aulas em mandarim (professor não fala português)',
        extrainfo : '',
        minprice : '80',
        maxprice: '80',
        userid : 0,
        categoryid : 12,
        expiration: '2020-06-20T03:00:13.250602Z',
        telephone: '0000-0000',  
        email: 'user@user.com'
    },
    {
        id : 4,
        name : 'Aula de Mandarim',
        description : 'Aula em grupos de 3. Aulas em mandarim (professor não fala português)',
        extrainfo : '',
        minprice : '80',
        maxprice: '80',
        userid : 0,
        categoryid : 8,
        expiration: '2020-06-20T03:00:13.250602Z',
        telephone: '0000-0000',
        email: 'user@user.com',
    },
    {
        id : 4,
        name : 'Aula de Mandarim',
        description : 'Aula em grupos de 3. Aulas em mandarim (professor não fala português)',
        extrainfo : '',
        minprice : '80',
        maxprice: '80',
        userid : 0,
        categoryid : 9,
        expiration: '2020-06-20T03:00:13.250602Z',
        telephone: '0000-0000',
        email: 'user@user.com',
    },
    {
        id : 4,
        name : 'Aula de Mandarim',
        description : 'Aula em grupos de 3. Aulas em mandarim (professor não fala português)',
        extrainfo : '',
        minprice : '80',
        maxprice: '80',
        userid : 0,
        categoryid : 7,
        expiration: '2020-06-20T03:00:13.250602Z',
        telephone: '0000-0000',
        email: 'user@user.com',
    },
]


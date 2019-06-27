"use strict";

import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, ScrollView, TouchableHighlight, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AsyncStorage } from 'react-native';
import { Dimensions } from "react-native";

import { populateRequestMiniCards } from '../components/FeedMiniCards';
import { loadMyOffers, loadCategories } from '../actions/FeedActions'
import FeedCard from '../components/FeedCard'
//import MyOfferCard from '../components/MyOfferCard'

import UniStyles from '../constants/UniStyles'
import UniColors from '../constants/UniColors'
import UniText from '../constants/UniText'
import UniData from '../constants/UniData'
import TestScreen from './TestScreen';


export default class MinhasOfertasScreen extends React.Component {
    static navigationOptions = { header: null };
    
    state = {
        isLoading:  true,

        myOffers: {},
        categories: {},
        
        isOfferCardOpen: false,
        openOffer: null,

        userid: '',
    }

    textStrings = {
        header: 'Minhas Ofertas',
    }


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

                loadMyOffers(userid, (offers) => {
                    this.setState({myOffers: offers, isLoading: false});
                    
                    this.props.navigation.addListener('willFocus', (payload) => this.refresh())
                })
            });
        } catch (error) {
        }
    }

    refresh() {
        this.setState({isLoading: true})
        
        loadMyOffers(this.state.userid,
            (offers) => this.setState({myOffers: offers, isLoading: false}))
    }
    
    onBackButtonPress(navigation) {
        navigation.goBack();
    }


    render() {
        const navigation = this.props.navigation;


        // header
        const header = (
            <View style={styles.headerContainer} >
                <TouchableHighlight
                    underlayColor={UniColors.main}
                    onPress={() => this.onBackButtonPress(navigation)}
                >
                    <Image
                        source={require('../assets/icons/arrow-left.png')}
                        style={styles.backButton}
                    />
                </TouchableHighlight>
                <Text style={styles.headerText}>{this.textStrings.header}</Text>
            </View>
        );

        // feed
        const feedView = this.state.isLoading ?
            <ActivityIndicator style={{ marginTop: 10 }} />
            :
            populateRequestMiniCards(
                this.state.myOffers,
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
                    isOffer = {true}
                    updateFeed={() => this.updateFeed()}
                    loggedUserid={this.state.userid}
                    myFeedOpen ={true}
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
            {openCard}
                <View style={styles.container} >
                    {header}
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
        zIndex:         1,
        justifyContent: 'space-between',
        flexDirection:  'row',
        alignSelf:      'stretch',
        backgroundColor:UniColors.main,
    },

    feedContainer: {
        paddingTop:     2,
        paddingBottom:  5,
        alignSelf:      'stretch',
    },

    backButton: {
        marginTop:      38,
        marginLeft:     20,
        marginBottom:   14,
    },

    headerText: {
        marginTop:      35,
        flexGrow:       1,
        width:          0,

        fontSize:       25,
        color:          UniColors.white,
        fontWeight:     UniText.semibold,
        textAlign:      'center',
    },
    
    openCard: {
        zIndex: 10,
        position: 'absolute',
        top: 0,
        backgroundColor: '#65737E80',

        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
});



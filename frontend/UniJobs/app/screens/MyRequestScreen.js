"use strict";

import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, ScrollView, TouchableHighlight, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AsyncStorage } from 'react-native';
import { Dimensions } from "react-native";

import { populateRequestMiniCards } from '../components/FeedMiniCards';
import { loadMyRequests, loadCategories } from '../actions/FeedActions'
import MyRequestCard from '../components/MyRequestCard'

import UniStyles from '../constants/UniStyles'
import UniColors from '../constants/UniColors'
import UniText from '../constants/UniText'
import UniData from '../constants/UniData'


export default class MinhasSolicitacoesScreen extends React.Component {
    static navigationOptions = { header: null };
    
    state = {
        isLoading:  true,

        myRequests: {},
        categories: {},
        
        isRequestCardOpen: false,
        openRequest: null,
    }

    textStrings = {
        header: 'Minhas Solicitações',
    }


    async componentDidMount() {
        try {
            const userid = parseInt(await AsyncStorage.getItem(UniData.userid));

            // use for fetching data to show
            loadCategories((categories) => {
                var hash = {}
                for (var i = 0; i < categories.length; i++)
                    hash[categories[i].id] = categories[i];
                this.setState({categories: hash})

                loadMyRequests(userid, (requests) => {
                    this.setState({myRequests: requests});
                    this.setState({isLoading: false});
                })
            });
        } catch (error) {
        }
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
                this.state.myRequests,
                this.state.categories,
                (request) => this.setState({isRequestCardOpen: true, openRequest: request})
                );

        const openCard = 
            this.state.isRequestCardOpen ?
            <View style = {styles.openCard}>
            {
                this.state.isLoading ?
                <ActivityIndicator style={{ marginTop: 10 }} />
                :
                <MyRequestCard
                    request = {this.state.openRequest}
                    categories = {this.state.categories}
                    onHidePress = {() => {alert("TODO: Hide Offer")}}
                    onEditPress = {() => {alert("TODO: Edit Offer")}}
                    onRemovePress = {() =>{alert("TODO: Remove Offer")}}
                    onQuit = {() => this.setState({isRequestCardOpen: false})}
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

"use strict";

import React from 'react';
import { Platform, StyleSheet, Text, TextInput, View, Image, ScrollView, TouchableHighlight, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Dimensions,AsyncStorage } from "react-native";

import { populateRequestMiniCards } from '../components/FeedMiniCards';
import { loadOffers, loadCategories } from '../actions/FeedActions'
import FeedCard from '../components/FeedCard'
import FloatActionButton from '../components/FloatActionButton'

import { searchOffers } from '../actions/SearchActions'
import FilterBar from '../components/FilterBar'

import UniStyles from '../constants/UniStyles'
import UniColors from '../constants/UniColors'
import UniText from '../constants/UniText'
import UniData from '../constants/UniData'



export default class FeedOfferScreen extends React.Component {
    static navigationOptions = { title: 'Ofertas' };
    
    state = {
        isLoading : true,

        userid: null,

        searchBarText: '',
        
        allFeedOffers: {},
        categoriesHash: {},

        isOfferCardOpen: false,
        openOffer: null,
        
        isSearching: false,
        categories: {},
        searchCategories: [],
        foundOffers: {},
    }

    textStrings = {
        searchBarPlaceHolder: 'Buscar Ofertas',
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
                this.setState({categoriesHash: hash, categories: categories})

                loadOffers(userid, (offers) => {
                    this.setState({allFeedOffers: offers, isLoading: false});
                }, userid)
            });
        } catch (error) {
        }
    }

    onMenuButtonPress(navigation) {
        navigation.openDrawer();
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
        loadOffers(this.state.userid, (offers) => {
            this.setState({allFeedOffers: offers});
        }, this.state.userid)
    }

    // =================================================================
    // search actions
    // =================================================================
    onSearchBarChangeText(navigate, text) {
        this.setState({searchBarText: text})
        if (text == '')
            this.setState({isSearching: false})
    }

    onSearch () {
        if (this.state.searchBarText == '') return

        searchOffers(this.state.searchBarText, this.state.searchCategories,
            (offers) => {
                this.setState({isSearching: true, foundOffers: offers})
            }
        )
    }

    onSearchAddCategory(categoryId) {
        this.state.searchCategories.push(categoryId)
        this.onSearch()
    }
    
    onSearchRemoveCategory(categoryId) {
        this.state.searchCategories = 
            this.state.searchCategories.filter((v, i, obj) => {return v != categoryId})
        this.onSearch()
    }


    render() {
        const { navigate } = this.props.navigation;
        const isTyping = !this.state.isSearching && !this.state.isLoading && this.state.searchBarText != ''

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
                    onSubmitEditing={(event) => this.onSearch()}
                />
                <TouchableHighlight
                    underlayColor= {UniColors.transparent}
                    onPress = {(event) => this.onSearch()}
                >
                    <Image
                        source={require('../assets/icons/search.png')}
                        style = {styles.searchBarIcon}
                    />
                </TouchableHighlight>
            </View>
        );

        const searchHeader = (
            <View>
                <View style={styles.searchHeader} >
                    {menuButton}
                    {searchBar}
                </View>
                {!this.state.isSearching || this.state.isLoading ?
                    null
                    :
                    <FilterBar
                        categories={this.state.categories}
                        onAddCategory={(categoryId) => this.onSearchAddCategory(categoryId)}
                        onRemoveCategory = {(categoryId) => this.onSearchRemoveCategory(categoryId)}
                    />
                }
                {
                    !isTyping ?
                    null
                    :
                    <View style = {styles.feedBar} >
                        <Text style = {styles.feedBarText}>
                            {'Buscar \'' + this.state.searchBarText + '\' em Ofertas'}
                        </Text>
                    </View>
                }
            </View>
        );


        // feed headers
        const feedHeader = (text, onPress, onFilter, showFilter) => (
            <View style = {styles.feedBar}>
                <TouchableHighlight 
                    underlayColor = {UniColors.transparent}
                    onPress = {() => onPress(this, navigate)}
                    style={{flexGrow: 1, alignSelf: 'stretch'}}
                >
                    <View style={{flexDirection: 'row'}}>
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
        )
        
        const allFeedHeader =
            this.state.isSearching || isTyping ?
            null
            : feedHeader(
                this.textStrings.allFeedHeader,
                this.onAllFeedPress,
                this.onAllFeedFilterPress,
                true,
            );
        

        // feed
        const feedView = 
            isTyping ?
            null
            :
            this.state.isLoading ?
                <ActivityIndicator style={{ marginTop: 10 }} />
                :
                populateRequestMiniCards(
                    this.state.isSearching ? this.state.foundOffers : this.state.allFeedOffers,
                    this.state.categoriesHash,
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
                        categories = {this.state.categoriesHash}
                        onCreateOfferPress = {() => {}}
                        onShowOfferer = {() => {}}
                        onQuit = {() => this.setState({isOfferCardOpen: false})}
                        isOffer = {this.isOffer}
                        updateFeed={() => this.updateFeed()}
                        loggedUserid={this.state.userid}
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
                        {allFeedHeader}
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

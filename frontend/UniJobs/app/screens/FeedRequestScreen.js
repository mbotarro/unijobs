"use strict";

import React from 'react';
import { Platform, StyleSheet, Text, TextInput, View, Image, ScrollView, TouchableHighlight, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Dimensions ,AsyncStorage} from "react-native";

import { populateRequestMiniCards } from '../components/FeedMiniCards';
import FloatActionButton from '../components/FloatActionButton'
import { loadRequests, loadCategories } from '../actions/FeedActions'
import { searchRequests } from '../actions/SearchActions'
import FeedCard from '../components/FeedCard'

import FilterBar from '../components/FilterBar'

import UniStyles from '../constants/UniStyles'
import UniColors from '../constants/UniColors'
import UniText from '../constants/UniText'
import UniData from '../constants/UniData'

import ActionButton from 'react-native-action-button';


export default class FeedRequestScreen extends React.Component {
    static navigationOptions = { title: 'Solicitações' };
    
    state = {
        isLoading : true,

        searchBarText: '',
        
        allFeedRequests: {},
        categoriesHash: {},

        isRequestCardOpen: false,
        openRequest: null,

        isSearching: false,
        categories: {},
        searchCategories: [],
        foundRequests: {},
    }

    textStrings = {
        searchBarPlaceHolder: 'Buscar Solicitações',
        allFeedHeader: 'Últimas Solicitações'
    }

    isOffer = false

    // =================================================================
    // data handling
    // =================================================================
    async componentDidMount() {
        try {
            const userid = parseInt(await AsyncStorage.getItem(UniData.userid));
            // use for fetching data to show
            loadCategories((categories) => {
                var hash = {}
                for (var i = 0; i < categories.length; i++)
                    hash[categories[i].id] = categories[i];
                this.setState({categoriesHash: hash, categories: categories})

                loadRequests((requests) => {
                    this.setState({allFeedRequests: requests, isLoading: false});
                    
                    this.props.navigation.addListener('willFocus', (payload) => this.refresh());
                })
            });
        } catch (error) {
        }
    }
    
    refresh() {
        this.setState({isLoading: true})

        loadRequests((requests) => {
            this.setState({allFeedRequests: requests, isLoading: false});
        })
    }

    
    // =================================================================
    // buttons actions
    // =================================================================
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

        searchRequests(this.state.searchBarText, this.state.searchCategories,
            (requests) => {
                this.setState({isSearching: true, foundRequests: requests})
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
                            {'Buscar \'' + this.state.searchBarText + '\' em Solicitações'}
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
        );

        const allFeedHeader = this.state.isSearching || isTyping ?
            null
            :
            feedHeader(
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
                    this.state.isSearching ? this.state.foundRequests : this.state.allFeedRequests,
                    this.state.categoriesHash,
                    (request) => this.setState({isRequestCardOpen: true, openRequest: request})
            );

        const openCard = 
            this.state.isRequestCardOpen ?
                <View style = {styles.openCard}>
                {
                    this.state.isLoading ?
                    <ActivityIndicator style={{ marginTop: 10 }} />
                    :
                    <FeedCard
                        request = {this.state.openRequest}
                        categories = {this.state.categoriesHash}
                        onCreateOfferPress = {() => {}}
                        onShowRequester = {() => {}}
                        onQuit = {() => this.setState({isRequestCardOpen: false})}
                        isOffer = {this.isOffer}
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
        zIndex:         1
    },

    feedContainer: {
        paddingTop:      2,
        paddingBottom:   5,
        alignSelf:      'stretch',
        ...Platform.select({
            android: {   
                backgroundColor: '#dfdfdf',
            }
        }),
    },

    searchHeader : {
        paddingTop:      19,
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

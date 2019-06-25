"use strict";

import React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native';
import { loadCategories } from '../actions/FeedActions'

import UniStyles from '../constants/UniStyles'
import UniColors from '../constants/UniColors'
import UniText from '../constants/UniText'
import UniData from '../constants/UniData'


export default class TestScreen extends React.Component {
    static navigationOptions = { title: 'Test' };
    
    state = {
        categories: {}
    }

    async componentDidMount() {
        // use for fetching data to show
        loadCategories((categories) => {
            var hash = {}
            for (var i = 0; i < categories.length; i++)
                hash[categories[i].id] = categories[i];
            this.setState({categories: hash})
        });
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container} >
                <View style={{backgroundColor: 'black', alignSelf: 'stretch', height: 10}} />
                <ScrollView style = {styles.barContainer}>

                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        alignSelf:      'stretch',
    },

    barContainer: {
        backgroundColor:UniColors.main,
        height:         40,
        alignSelf:      'stretch',
        
        shadowOffset:   { width: 0, height: 2 },
        shadowRadius :  2,
        shadowColor:    UniColors.black,
        shadowOpacity:  0.16,
        zIndex:         2,
        // ...Platform.select({
        //     ios: {
        //         shadowOffset:   { width: 0, height: 2 },
        //         shadowRadius :  2,
        //         shadowColor:    UniColors.black,
        //         shadowOpacity:  0.16,
        //     },
        //     android: {   
        //         elevation: 2,
        //     },
        //   }),
    },
});

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

                <View style = {styles.barContainer}>
                    <ScrollView horizontal={true}
                                contentContainerStyle = {{paddingHorizontal: 4}}
                                showsHorizontalScrollIndicator = {false}
                                >
                        <MiniButton text = 'Aulas Teste 1' onActivate = {() => {}} onDeactivate = {() => {}} />
                        <MiniButton text = 'Aulas Teste 2' onActivate = {() => {}} onDeactivate = {() => {}} />
                        <MiniButton text = 'Aulas Teste 2' onActivate = {() => {}} onDeactivate = {() => {}} />
                        <MiniButton text = 'Aulas Teste 2' onActivate = {() => {}} onDeactivate = {() => {}} />
                        <MiniButton text = 'Aulas Teste 2' onActivate = {() => {}} onDeactivate = {() => {}} />
                        <MiniButton text = 'Aulas Teste 2' onActivate = {() => {}} onDeactivate = {() => {}} />
                    </ScrollView>
                </View>
            </View>
        );
    }
}

class MiniButton extends React.Component {
    state = {
        isActive : false,
    }

    onPress(self, onActivate, onDeactivate) {
        self.setState({isActive: !self.state.isActive});
        if (this.setState.isActive)
            onActivate();
        else
            onDeactivate();
    }

    render() {
        const { text, onActivate, onDeactivate } = this.props;

        const active = this.state.isActive
        var buttonStyle, textStyle
        if (active) {
            buttonStyle = [buttonStyles.buttonStyle, buttonStyles.buttonActive]
            textStyle = [buttonStyles.textStyle, buttonStyles.textActive]
        }
        else {
            buttonStyle = [buttonStyles.buttonStyle, buttonStyles.buttonInactive]
            textStyle = [buttonStyles.textStyle, buttonStyles.textInactive]
        }

        return (
            <TouchableHighlight
                style = {buttonStyles.touchableStyle}
                onPress = {() => this.onPress(this, onActivate, onDeactivate)}
                underlayColor = {UniColors.transparent}
                activeOpacity = {1}
                >
                <View style = {buttonStyle}>
                    <Text style = {textStyle}>{ text }</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const buttonStyles = StyleSheet.create({
    textActive : { color:      UniColors.white },

    textInactive: { color:      UniColors.dark },

    textStyle: {
        fontSize:   UniText.normal,
        fontWeight: UniText.semilight,

        textAlign:  'center',
        alignSelf:  'center',
    },

    buttonActive : { backgroundColor:    UniColors.dark },

    buttonInactive: { backgroundColor:    UniColors.light },

    buttonStyle: {
        alignContent:       'center',
        alignSelf:          'flex-start', 

        paddingVertical:    4,
        paddingHorizontal:  12,
        borderRadius:       12,
    },

    touchableStyle : {
        flexDirection:  'column',
        alignSelf:      'stretch',
        justifyContent: 'center',
        marginHorizontal: 4,
    }
});

const styles = StyleSheet.create({
    container: {
        alignSelf:      'stretch',
    },

    barContainer: {
        backgroundColor:UniColors.white,
        height:         40,
        alignSelf:      'stretch',
        
        ...Platform.select({
            ios: {
                shadowOffset:   { width: 0, height: 2 },
                shadowRadius :  3,
                shadowColor:    UniColors.black,
                shadowOpacity:  0.16,
            },
            android: {   
                elevation: 3,
            },
          }),
    },
});

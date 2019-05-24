// for this one, if KeyboardAwareScrollView not installed:
// npm i react-native-keyboard-aware-scroll-view --save

"use strict";

import React from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import UniStyles from '../constants/UniStyles'

export default class TextInputScrollScreen extends React.Component {
    static navigationOptions = {
        title: 'TextInput (Scrolling)',
    };

    nextScreen = 'IconScreen';

    render() {
        const { navigate } = this.props.navigation;

        return (
            <KeyboardAwareScrollView
                contentContainerStyle={styles.container}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={false}
            >

                <TextInput
                    style={UniStyles.textInput}
                    placeholder="type something"
                    keyboardType='email-address'
                    autoCorrect={false}
                    onChangeText={() => { }}
                    onSubmitEditing={() => navigate(this.nextScreen)}
                />

                <View style={{ height: 100 }} />

                <TextInput
                    style={UniStyles.textInput}
                    placeholder="type something"
                    keyboardType='email-address'
                    autoCorrect={false}
                    onChangeText={() => { }}
                    onSubmitEditing={() => navigate(this.nextScreen)}
                />


                <View style={{ height: 100 }} />

                <TextInput
                    style={UniStyles.textInput}
                    placeholder="type something"
                    keyboardType='email-address'
                    autoCorrect={false}
                    onChangeText={() => { }}
                    onSubmitEditing={() => navigate(this.nextScreen)}
                />

            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
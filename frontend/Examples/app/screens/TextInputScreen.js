"use strict";

import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, KeyboardAvoidingView } from 'react-native';

import UniStyles from '../constants/UniStyles'

export default class TextInputScreen extends React.Component {
    static navigationOptions = {
        title: 'TextInput',
    };

    render() {
        const { navigate } = this.props.navigation;

        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <TextInput
                    style={UniStyles.textInput}
                    placeholder="usuario (e-mail)"
                    keyboardType='email-address'
                    autoCorrect={false}
                    onChangeText={() => { }}
                    onSubmitEditing={() => navigate('IconScreen')}
                />
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10, 
    },
});
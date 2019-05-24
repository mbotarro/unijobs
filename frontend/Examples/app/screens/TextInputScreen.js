"use strict";

import React from 'react';
import { StyleSheet, TextInput, View, KeyboardAvoidingView } from 'react-native';

import UniStyles from '../constants/UniStyles'

export default class TextInputScreen extends React.Component {
    static navigationOptions = {
        title: 'TextInput (Padding)',
    };

    nextScreen = 'TextInputScroll';

    render() {
        const { navigate } = this.props.navigation;

        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding'><TextInput
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
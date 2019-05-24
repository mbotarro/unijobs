"use strict";

import React from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';

import Button from '../components/Button'
import UniStyles from '../constants/UniStyles'

export default class IconScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={
                    { alignContent: 'center', flexDirection: 'row', alignSelf: 'stretch', height: 50 }}>
                    <Image
                        style={{ width: 50, height: 50, alignSelf: 'center' }}
                        source={require('../assets/icons/facebook.png')}
                    />
                    <Text style={[UniStyles.text, { justifyContent: 'center', alignSelf: 'center' }]}> twitter </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
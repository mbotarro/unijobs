"use strict";

import React from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { AsyncStorage } from 'react-native';

import UniStyles from '../constants/UniStyles'
import UniData from '../constants/UniData'

import SearchBar from '../components/SearchBar'

export default class HomeScreen extends React.Component {
    static navigationOptions = { header: null };

    state = {
        username: '',
        password: '',
    }

    async componentDidMount() {
        try {
            const username = await AsyncStorage.getItem(UniData.username);
            if (username !== null)
                this.setState({ username: username });
            
            const password = await AsyncStorage.getItem(UniData.password);
            if (password !== null) 
                this.setState({ password: password });
        } catch (error) {
        }
    }

    render() {
        return (
            <SearchBar />
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    },
});
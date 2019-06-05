"use strict";

import React from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';


import UniStyles from '../constants/UniStyles'
import UniData from '../constants/UniData'



export default class TestScreen extends React.Component {
    static navigationOptions = { header: null };

    state = {
        // use for store data
    }


    async componentDidMount() {
        // use for fetching data to show
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={UniStyles.text}>
                    Welcome to UniJobs!
                </Text>
            </View>
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
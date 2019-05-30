"use strict";

import React from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';


import UniStyles from '../constants/UniStyles'
import UniData from '../constants/UniData'



export default class TestScreen extends React.Component {
    static navigationOptions = { header: null };

    state = {
        username: 'none',
        valid: 'none',
    }


    async componentDidMount() {
        const response = fetch('http://ec2-54-205-214-239.compute-1.amazonaws.com:8080/users/authenticate', {
            method: 'POST',
            body: JSON.stringify({
                email: 'estevam@estevam',
                password: 'senhateste',
            }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({username: responseJson.email, valid: responseJson.valid});
        }).catch((error) => {
            console.log("API CALL ERROR");
            alert(error.message);
        })

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={UniStyles.text}>
                    Welcome to UniJobs! {'\n' + this.state.username + '\n' + this.state.valid}
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
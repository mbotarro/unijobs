/*
//inside render->return
const MenuButton = () => (
    <Button
        text={this.textStrings.login}
        buttonStyle={{ paddingHorizontal: 77 }}
        onPress={() => this.onDrawerMenu(navigate)}
    />
);
                <View style={{ marginTop: 10 }}>
                        <MenuButton />
                </View>
//before render

    onDrawerMenu(navigate) {
        alert('TODO: Autentication');

        AsyncStorage.setItem(UniData.username, this.state.username.toLowerCase());
        AsyncStorage.setItem(UniData.password, this.state.password.toLowerCase());
        navigate('DrawerMenu');
    };
*/
"use strict";

import React from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { AsyncStorage } from 'react-native';

import UniStyles from '../constants/UniStyles'
import UniData from '../constants/UniData'

export default class FeedOfertasScreen extends React.Component {
    static navigationOptions = { header: null };

    state = {
        username: '',
    }

    async componentDidMount() {
        try {
            const username = await AsyncStorage.getItem(UniData.username);
            if (username !== null)
                this.setState({ username: username });
        } catch (error) {
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={UniStyles.text}>
                    Welcome to UniJobs! {'\n' + this.state.username}
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
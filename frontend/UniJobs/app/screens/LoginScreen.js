"use strict";

import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableHighlight } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AsyncStorage } from 'react-native';

import Button from '../components/Button'
import UniStyles from '../constants/UniStyles'
import UniColors from '../constants/UniColors'
import UniData from '../constants/UniData'

import { tryLogin } from '../actions/LoginActions'


export default class LoginScreen extends React.Component {
    static navigationOptions = { header: null };

    state = {
        username: '',
        password: '',
    }

    /* components text strings */
    textStrings = {
        username: 'usuário (e-mail)',
        password: 'senha',
        login: 'login',
        socialNetworkHeadline: 'ou conecte-se com',
        registrationHeadline: 'ainda não tem uma conta?',
        registration: 'registre-se',
    }


    /* components callbacks */
    onLogin(navigate) {
        tryLogin(this.state.username.toLowerCase(), this.state.password,
            (email, valid) => {
                alert(email + ' ' + valid);
                if (valid) {
                    AsyncStorage.setItem(UniData.username, email).then(() => 
                    navigate('Home')
                    ).catch();
                }
            }
        );
    };

    onFacebookLogin(navigate) {
        alert("TODO : Facebook Login");
    };

    onTwitterLogin(navigate) {
        alert("TODO : Twitter Login");
    };

    onRegister(navigate) {
        alert("TODO : Registration Form");
    };



    /* components render */
    render() {
        const { navigate } = this.props.navigation;

        // Header components
        const Header = () => (
            <View style={styles.topBar}>
                <Text style={styles.logoText}> UniJOBS </Text>
            </View>
        );

        // Traditional Login components
        const EmailField = () => (
            <TextInput
                style={UniStyles.textInput}
                placeholder={this.textStrings.username}
                keyboardType='email-address'
                autoCorrect={false}
                onChangeText={(email) => this.state.username = email}
            />
        );

        const PasswordField = () => (
            <TextInput
                style={[UniStyles.textInput, { marginTop: 10 }]}
                placeholder={this.textStrings.password}
                secureTextEntry={true}
                autoCorrect={false}
                onChangeText={(password) => this.state.password = password}
            />
        );

        const LoginButton = () => (
            <Button
                text={this.textStrings.login}
                buttonStyle={{ paddingHorizontal: 83, paddingVertical: 10, marginTop: 20 }}
                onPress={() => this.onLogin(navigate)}
            />
        );

        // Social Media Login components
        const SocialMediaIcon = (name) => {
            switch (name) {
                case 'facebook': return require('../assets/icons/facebook.png');
                case 'twitter': return require('../assets/icons/twitter.png');
            }
        };

        const SocialMediaCallback = (name) => {
            switch (name) {
                case 'facebook': return this.onFacebookLogin;
                case 'twitter': return this.onTwitterLogin;
            }
        }

        const SocialNetworkLogin = ({ name }) => {
            return (
                <TouchableHighlight
                    onPress={SocialMediaCallback(name)}
                    underlayColor={UniColors.light}
                >
                    <View style={{ alignContent: 'center', flexDirection: 'row', alignSelf: 'stretch' }}>
                        <Image
                            style={styles.extLoginIcon}
                            source={SocialMediaIcon(name)}
                        />
                        <Text style={[UniStyles.text, { marginLeft: 36, textAlign: 'center', alignSelf: 'center' }]}> {name} </Text>
                    </View>
                </TouchableHighlight>
            )
        };

        // Registration components
        const RegistrationButton = () => (
            <Button
                text={this.textStrings.registration}
                buttonStyle={[{ marginTop: 8}, { paddingHorizontal: 30, paddingVertical: 10 }]}
                onPress={() => this.onRegister(navigate)}
            />
        );

        // FINAL RENDER
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={{ flex: 1 }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={false}
            >
                <Header />
                <View style={styles.container}>
                    <View style={{ marginTop: 54 }}>
                        <EmailField />
                        <PasswordField />
                        <LoginButton />
                    </View>

                    <View style={{ marginTop: 35, marginHorizontal: 64 }}>
                        <Text style={[UniStyles.text, { alignSelf: 'center' }]}>
                            {this.textStrings.socialNetworkHeadline}
                        </Text>

                        <View style={{ marginTop: 3 }} />
                        <SocialNetworkLogin name='facebook' />
                        <View style={{ marginTop: 10 }} />
                        <SocialNetworkLogin name='twitter' />

                    </View>

                    <View style={{ marginTop: 29, marginBottom: 52 }}>
                        <Text style={[UniStyles.text, { alignSelf: 'center' }]}>
                            {this.textStrings.registrationHeadline}
                        </Text>
                        <RegistrationButton />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        alignSelf: 'center'
    },

    topBar: {
        backgroundColor: UniColors.main,
        flex: 1
    },

    logoText: {
        fontSize: 66,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 0,
        marginBottom: 20,

        color: UniColors.white,
        fontWeight: 'bold',
    },

    extLoginIcon: {
        width: 45,
        height: 45
    },
});
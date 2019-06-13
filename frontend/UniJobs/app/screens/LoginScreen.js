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
        username: 'Usuário (e-mail)',
        password: 'Senha',
        login: 'Entrar',
        registrationHeadline: 'Ainda não tem uma conta?',
        registration: 'Registre-se',
    }


    /* components callbacks */
    onLogin(navigate) {
        tryLogin(this.state.username.toLowerCase(), this.state.password,
            (email, id, valid) => {
                if (true) {
                    AsyncStorage.setItem(UniData.username, email)
                    .then(
                        AsyncStorage.setItem(UniData.userid, id.toString())
                        .then(navigate('TabStack'))
                    );
                }
                else {
                    alert('Email / Password missmatch');
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
                buttonStyle={{ marginHorizontal: 64, paddingVertical: 10, marginTop: 20 }}
                onPress={() => this.onLogin(navigate)}
            />
        );

        const FacebookLogin = () => (
            <SocialNetworkLoginButton name='facebook' onPress = {() => this.onFacebookLogin(navigate)} />
        );

        const TwitterLogin = () => (
            <SocialNetworkLoginButton name='twitter' onPress = {() => this.onTwitterLogin(navigate)} />
        );

        // Registration components
        const RegistrationButton = () => (
            <TouchableHighlight
                underlayColor={UniColors.light}
                buttonStyle={[{ marginTop: 8 }, { paddingHorizontal: 30, paddingVertical: 10 }]}
                onPress={() => this.onRegister(navigate)}
            >
                <View>
                    <Text style={[UniStyles.text, { alignSelf: 'center' }]}>
                        {this.textStrings.registrationHeadline}
                    </Text>
                    <Text style={[
                        UniStyles.text,
                        {
                            alignSelf: 'center',
                            fontWeight: 'bold',
                            textDecorationLine: 'underline',
                            marginTop: 5
                        }
                    ]}>
                        {this.textStrings.registration}
                    </Text>
                </View>
            </TouchableHighlight>
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

                    <View style={{ marginTop: 51, marginHorizontal: 64 }}>
                        <FacebookLogin />
                        <View style={{ marginTop: 10 }} />
                        <TwitterLogin />
                    </View>

                    <View style={{ marginTop: 50, marginBottom: 44 }}>
                        <RegistrationButton />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        );
    }
};



class SocialNetworkLoginButton extends React.Component {
    render() {
        const { name, onPress } = this.props;

        // Social Media Login components
        const SocialMediaIcon = (name) => {
            switch (name) {
                case 'facebook': return require('../assets/icons/facebook.png');
                case 'twitter': return require('../assets/icons/twitter.png');
            }
        };

        const SocialNetworkColor = (name) => {
            switch (name) {
                case 'facebook': return '#475993';
                case 'twitter': return '#50ABF1';
            }
        }

        const SocialNetworkText = (name) => {
            switch (name) {
                case 'facebook': return 'Conexão com Facebook';
                case 'twitter': return 'Conexão com Twitter';
            }
        }

        return (
            <TouchableHighlight
                onPress={onPress}
                underlayColor={UniColors.light}
            >
                <View style={{
                    alignContent: 'center',
                    flexDirection: 'row',
                    alignSelf: 'stretch',
                    paddingVertical: 10,
                    backgroundColor: SocialNetworkColor(name),
                    borderRadius: 20,
                }}
                >

                    <Image
                        style={[styles.extLoginIcon, {marginLeft: 20}]}
                        source={SocialMediaIcon(name)}
                    />
                    <Text style={[
                        UniStyles.text,
                        {
                            marginLeft: 36,
                            textAlign: 'center',
                            alignSelf: 'center',
                            color: UniColors.white,
                            fontWeight: 'bold',
                        }]}
                    >
                        {SocialNetworkText(name)}
                    </Text>
                </View>
            </TouchableHighlight>
        )
    };
};


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
        fontSize: 60,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 0,
        marginBottom: 20,

        color: UniColors.white,
        fontWeight: 'bold',
    },

    extLoginIcon: {
        width: 20,
        height: 20,
    },
});

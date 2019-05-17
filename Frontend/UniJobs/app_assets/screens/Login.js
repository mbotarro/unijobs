import React from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import CustomButton from '../custom_components/CustomButton'
import Space from '../custom_components/Space'


export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.email = '';
        this.password = '';
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.topBar}>
                    <Text style = {styles.logoText}> UniJOBS </Text>
                </View>
                <View style={styles.container}>
                    <Space height={40}/>

                    <TextInput
                        style=         {styles.input}
                        placeholder =  "usuario (e-mail)"
                        keyboardType = 'email-address'
                        autoCorrect =  {false}
                        onChangeText = {(email) => this.email = email}
                    />

                    <Space />

                    <TextInput
                        style=         {styles.input}
                        placeholder =  "senha"
                        secureTextEntry= {true}
                        autoCorrect =  {false}
                        onChangeText = {password => this.password = password}
                    />
        
                    <Space />

                    <CustomButton 
                        text="login"
                        buttonStyle={styles.submitButton}
                        textStyle={styles.submitButtonText}
                        onPress={() => {
                            alert("Welcome to UniJobs!");
                        }}
                    />
                    
                    <Space height = {44}/>

                    <Text style={styles.text}> ou conecte-se com: </Text>

                    <Space height = {17}/>

                    <View style={{alignContent:'center', flexDirection: 'row', alignSelf: 'stretch', height: 50}}>
                        <Image
                            style= {styles.extLoginIcon}
                            source={require('../textures/facebook.png')}
                        />
                        <Text style={styles.extLoginText}> facebook </Text>
                    </View>

                    <Space height = {10}/>

                    <View style={{alignContent:'center', flexDirection: 'row', alignSelf: 'stretch', height: 50}}>
                        <Image
                            style= {styles.extLoginIcon}
                            source={require('../textures/twitter.png')}
                        />
                        <Text style={styles.extLoginText}> twitter </Text>
                    </View>

                    <Space height = {37}/>
                    <Text style={styles.text}> ainda não tem uma conta? </Text>

                    <Space height = {15}/>

                    <CustomButton 
                        text="registre-se"
                        buttonStyle={styles.registerButton}
                        textStyle={styles.registerButtonText}
                        onPress={() => {
                            alert("Welcome to UniJobs!");
                        }}
                    />
                    
                    <Space height = {25}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center'
    },

    topBar: {
        backgroundColor: '#008B8B',
        flex: 1
    },

    logoText: {
        fontSize: 60,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 0,
        marginBottom: 30,

        color: '#ffffff',
        fontWeight: 'bold',
    },
    
    input: {
        borderColor: '#50514F',
        borderRadius: 25,
        borderWidth: 1,
        padding: 7,
        
        height: 50,
        width: 290,
        
        fontSize: 20,
        color: '#50514F',
        textAlign: 'center',
    },

    text: {
        fontSize: 20,
        color: '#50514F',
        textAlign: 'center',
        alignSelf: 'center'
    },

    submitButton: {
        backgroundColor: '#008B8B',

        borderColor: '#008B8B',
        borderRadius: 20,
        borderWidth: 0,
        padding: 7,

        height: 40,
        width: 200,

        justifyContent: 'center',
        alignSelf: 'center'
    },

    submitButtonText: {
        fontSize: 20,
        color: '#ffffff',
        textAlign: 'center'
    },

    extLoginIcon: {
        width: 50,
        height: 50
    },

    extLoginText: {
        fontSize: 20,
        color: '#50514F',
        marginLeft: 34,
        textAlign: 'center',
        alignSelf: 'center'
    },

    registerButton: {
        backgroundColor: '#008B8B',

        borderColor: '#008B8B',
        borderRadius: 20,
        borderWidth: 0,
        padding: 7,

        height: 40,
        width: 130,

        justifyContent: 'center',
        alignSelf: 'center'
    },

    registerButtonText: {
        fontSize: 20,
        color: '#ffffff',
        textAlign: 'center'
    }
});
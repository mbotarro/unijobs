"use strict";

import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, ScrollView, TouchableHighlight, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AsyncStorage } from 'react-native';
import { Dimensions } from "react-native";

import UniStyles from '../constants/UniStyles'
import UniColors from '../constants/UniColors'
import UniText from '../constants/UniText'
import UniData from '../constants/UniData'


export default class AboutUsScreen extends React.Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            descriptionText: 'Aplicativo desenvolvido por alunos do curso de Engenharia de Computação da Universidade de São Paulo como projeto de Engenharia de Software.\n\nProjeto realizado em parceria com a Monitora Soluções Tecnológicas.',
            professorText:'Simone do Rocio Senger de Souza.',
            studentsText:'Bruna Yukari Fujii Yoshida \nEstevam Arantes \nJoão Victor Almeida \nMoisés Botarro  \nOsmar Chen \nPaulo Pinheiro Lemgruber Jeunon Sousa \nVictor Tornisiello',
        };
      }
    onBackButtonPress(navigation) {
        navigation.goBack();
    }


    render() {
        const navigation = this.props.navigation;


        // header
        const header = (
            <View style={styles.headerContainer} >
                <TouchableHighlight
                    underlayColor={UniColors.main}
                    onPress={() => this.onBackButtonPress(navigation)}
                >
                    <Image
                        source={require('../assets/icons/arrow-left.png')}
                        style={styles.backButton}
                    />
                </TouchableHighlight>
                <Text style={styles.headerText}>Sobre</Text>
                <Image style={styles.avatar} source={require('../assets/icons/LogoICMCpeq.png')}/>
                
            </View>
        );
        const aboutView =(
            <View >
                <Text style={[styles.normal,{marginTop:40,marginHorizontal:20}]}>{this.state.descriptionText}</Text>
                <Text style={[styles.highlightText,{marginTop:15,marginHorizontal:20}]}>{`\nSob orientação da professora:`}</Text>
                <Text style={[styles.normal,{marginTop:10,marginHorizontal:20}]}>{this.state.professorText}</Text>
                <Text style={[styles.highlightText,{marginTop:15,marginHorizontal:20}]}>{`\nAlunos:`}</Text>
                <Text style={[styles.normalText,{marginTop:10,marginHorizontal:20}]}>{this.state.studentsText}</Text>
            </View>
        )
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={{ flex: 1 }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={false}
            >
                <View style={styles.container} >
                    {header}
                    <ScrollView contentContainerStyle={styles.aboutContainer}>
                        {aboutView}
                    </ScrollView>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex:           1,
        alignSelf:      'stretch',
    },

    headerContainer: {
        zIndex:         1,
        justifyContent: 'space-between',
        flexDirection:  'column',
        //alignSelf:      'stretch',
        backgroundColor:UniColors.main,
        height:250,

    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: UniColors.white,
        backgroundColor:UniColors.white,
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:110
    },
    aboutContainer: {
        paddingTop:     2,
        paddingBottom:  5,
        alignSelf:      'stretch',
    },

    backButton: {
        marginTop:      38,
        marginLeft:     20,
        marginBottom:   14,
    },

    headerText: {
        marginTop:      0,
        flexGrow:       1,
        width:          90,
        alignSelf: 'center',
        fontSize:       25,
        color:          UniColors.white,
        fontWeight:     UniText.semibold,
        textAlign:      'center',
    },
    highlightText:{
        fontSize:       17,
        color:          UniColors.main,
        fontWeight:     UniText.semibold,
    },
    normalText:{
        fontSize:       15,
        color:          UniColors.black,
        fontWeight:     UniText.regular,
    }
    
});
"use strict";

import React from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';

import Button from '../components/Button'
import UniStyles from '../constants/UniStyles'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
    header: null,
  };
  
  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style = {styles.container}>
        <Text style = {UniStyles.text}>This is a text sample!</Text>
        <Button text = 'Next! :D' onPress={() => navigate('TextInput', {name: 'Jane'})}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex:1
  },
});

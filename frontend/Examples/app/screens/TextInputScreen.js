"use strict";

import React from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';

import Button from '../components/Button'
import UniStyles from '../constants/UniStyles'

export default class TextInputScreen extends React.Component {
    static navigationOptions = {
        title: 'TextInput',
    };

  render() {
    const {navigate} = this.props.navigation;
    
    return (
      <View style={styles.container}>
        <TextInput
            style =        {UniStyles.textInput}
            placeholder =  "usuario (e-mail)"
            keyboardType = 'email-address'
            autoCorrect =  {false}
            onChangeText = {() => {}}
            onSubmitEditing = {() => navigate('IconScreen')}
        />
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
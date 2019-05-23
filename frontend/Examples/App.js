"use strict";

import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import Button from './app/components/Button'
import UniStyles from './app/constants/UniStyles'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Button text = 'UniTest' onPress={() => alert("Welcome to UniJobs!")}/>
        <TextInput
                        style=         {UniStyles.textInput}
                        placeholder =  "usuario (e-mail)"
                        keyboardType = 'email-address'
                        autoCorrect =  {false}
                        onChangeText = {() => {}}
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

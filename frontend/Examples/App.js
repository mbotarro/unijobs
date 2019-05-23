import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from './app/components/Button'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Button text = 'UniTest' onPress={() => alert("Welcome to UniJobs!")}/>
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

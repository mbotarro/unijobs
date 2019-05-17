import React from 'react';
import { StyleSheet, Text, View, TextInput, AppRegistry, Image } from 'react-native';
import Login from './app_assets/screens/Login'

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Login />
    );
  }
}
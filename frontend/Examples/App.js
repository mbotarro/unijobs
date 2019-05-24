import AppNavigator from './app/navigation/AppNavigator'

export default AppNavigator

// "use strict";

// import React from 'react';
// import { StyleSheet, Text, TextInput, View, Image } from 'react-native';

// import Button from './app/components/Button'
// import UniStyles from './app/constants/UniStyles'

// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Open up App.js to start working on your app!</Text>
//         <Button text = 'UniTest' onPress={() => alert("Welcome to UniJobs!")}/>
//         <TextInput
//             style =        {UniStyles.textInput}
//             placeholder =  "usuario (e-mail)"
//             keyboardType = 'email-address'
//             autoCorrect =  {false}
//             onChangeText = {() => {}}
//         />
//         <View style={
//             {alignContent:'center', flexDirection: 'row', alignSelf: 'stretch', height: 50}}>
//             <Image
//                 style= {{width:50, height:50, alignSelf: 'center'}}
//                 source={require('./app/assets/icons/facebook.png')}
//             />
//             <Text style={styles.extLoginText}> twitter </Text>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React, { Component } from 'react';
import {Plataform, Image, View, TextInput, Alert, TouchableOpacity, Button, StyleSheet, Text, Picker} from 'react-native';
 

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }

    _onPressButton() {
        Alert.alert('You tapped the button!!')
    }

    render() {

        const RegistrationButton = () => (
            <Button
                text={'menu'}
                buttonStyle={{ paddingHorizontal: 77 }}
                onPress={() => this._onPressButton()}
            />
        );

        return (
            <View>
                <View style={{flexDirection: 'row', width: window.width, margin: 10,
                    padding: 4, borderWidth: 1, borderRadius: 6, borderColor:'#888', backgroundColor:'transparent'}}
                >
                    <View style={{marginRight: 4}}>
                        <TouchableOpacity activeOpacity={0.5}>
                            {/*We can use any component which is used to shows something inside 
                                TouchableOpacity. It shows the item inside in horizontal orientation */}
                            <Image
                                //We are showing the Image from online
                                source={require('../assets/icons/hamburgerbutton.png')}
                                //You can also show the image from you project directory like below
                                //source={require('./Images/facebook.png')}
                                //Image Style
                                style={styles.ImageIconStyle}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{alignSelf: 'center'}}>
                        <TextInput
                            style={{backgroundColor: 'transparent'}}
                            placeholder="Search here!"
                            onChangeText={(text) => this.setState({text})}
                        />
                    </View>
                </View>

                <View style={{flexDirection: 'row', width: window.width, margin: 10,
                    padding: 4, borderWidth: 1, borderRadius: 6, borderColor:'#888', backgroundColor:'transparent'}}
                >
                    <Picker
                        selectedValue={this.state.PickerValue}
                        style={{width:'100%'}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({PickerValue: itemValue})
                        }>
                        <Picker.Item label="Meu feed" value="Meu feed" />
                        <Picker.Item label="Teste" value='teste' />
                    </Picker>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
    },
    GooglePlusStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#dc4e41',
      borderWidth: 0.5,
      borderColor: '#fff',
      height: 40,
      width: 220,
      borderRadius: 5,
      margin: 5,
    },
    FacebookStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#485a96',
      borderWidth: 0.5,
      borderColor: '#fff',
      height: 40,
      width: 220,
      borderRadius: 5,
      margin: 5,
    },
    ImageIconStyle: {
      padding: 5,
      height: 40,
      width: 40,
      resizeMode: 'stretch',
    },
    TextStyle: {
      color: '#fff',
      marginBottom: 4,
      marginRight: 20,
    },
    SeparatorLine: {
      backgroundColor: '#fff',
      width: 1,
      height: 40,
    },
    headerText: {
        fontSize: 20,
        margin: 10,
        fontWeight: "bold"
    },
    menuContent: {
        color: "#000",
        fontWeight: "bold",
        padding: 2,
        fontSize: 20
    }
});
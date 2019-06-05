"use strict"

import React from 'react'
import { StyleSheet, Text, View} from 'react-native'
import UniStyles from '../constants/UniStyles'

export default class UserOptionsScreen extends React.Component {
    static navigationOptions = { header: null }

    render() {
        return (
            <View style={UniStyles.container}>
                <Text>
                    Tela de Modificar Perfil
                </Text>
            </View>
        )
    }
}
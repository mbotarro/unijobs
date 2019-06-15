import React, { Component } from 'react';
import { StyleSheet, Image } from "react-native"
import PropTypes from 'prop-types';

import UniColors from '../constants/UniColors'

import ActionButton from 'react-native-action-button';


export default class MenuButton extends Component {

    render() {

        const { onAddRequestPress, onAddOfferPress } = this.props

        return (
            <ActionButton buttonColor={UniColors.main} offsetX={20} offsetY={20} shadowStyle={styles.ActionButtonShadow}>
                <ActionButton.Item buttonColor={UniColors.main} title="Oferta" onPress={onAddOfferPress}>
                    <Image 
                        source={require('../assets/icons/shopping-label.png')}
                        style={styles.ImageIconStyle}
                    />
                </ActionButton.Item>
                <ActionButton.Item buttonColor={UniColors.main} title="Solicitação" onPress={onAddRequestPress}>
                    <Image 
                        source={require('../assets/icons/help.png')}
                        style={[styles.ImageIconStyle, {height: 25, width: 25}]}
                    />
                </ActionButton.Item>
            </ActionButton>
        )
    }
}

MenuButton.propTypes = {
    onAddOfferPress: PropTypes.func.isRequired,
    onAddRequestPress: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
    ActionButtonShadow: {
        shadowColor: "#000",
        shadowOpacity: 1,
        shadowRadius: 100.00,

        elevation: 20,
    },
    ImageIconStyle: {
        padding: 5,
        height: 20,
        width: 20,
        resizeMode: 'stretch',
    },
})
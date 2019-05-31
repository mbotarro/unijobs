import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, ViewPropTypes } from 'react-native';

import UniColors from '../constants/UniColors'
import UniText from '../constants/UniText'


export default class Button extends Component {
    render() {
        const { text, onPress, buttonStyle, textStyle } = this.props;
        return (
            <TouchableOpacity
                style={[styles.buttonStyle, buttonStyle]}
                onPress={() => onPress()}
            >    
                <Text style={[styles.textStyle, textStyle]}>
                    {text}
                </Text>

            </TouchableOpacity>
        );
    }
}


Button.propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    buttonStyle: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
};


const styles = StyleSheet.create({
    textStyle: {
        fontSize: UniText.normal,
        color: UniColors.white,
        textAlign: 'center'
    },

    buttonStyle: {
        flexDirection:      'row',      // this makes the button
        alignSelf:          'center',   // resize itself to the content's size

        paddingVertical:    10,
        paddingHorizontal:  20,
        backgroundColor:    UniColors.main,
        borderRadius:       20,
    }
});

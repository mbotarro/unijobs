import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import UniColors from '../constants/UniColors'
import UniText from '../constants/UniText'


export default class ItemMiniCard extends Component {
    render() {
        const { image, titleText, contentText, categoryText, priceText, onPress } = this.props;

        return (
            <TouchableOpacity
                style={styles.container}
                onPress={() => onPress()}
            >
                <View style = {styles.imageContainer}>
                    {image}
                </View>
                <View style = {styles.textContainer}>
                    <Text style={styles.titleText}>
                        {titleText}
                    </Text>
                    <Text style={styles.contentText}>
                        {contentText}
                    </Text>
                    <View style = {styles.bottomTextContainer}>
                        <Text style={styles.categoryText}>
                            {categoryText}
                        </Text>
                        <Text style={styles.priceText}>
                            {priceText}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}


ItemMiniCard.propTypes = {
    titleText:      PropTypes.string.isRequired,
    contentText:    PropTypes.string.isRequired,
    categoryText:   PropTypes.string.isRequired,
    priceText:      PropTypes.string.isRequired,
    onPress:        PropTypes.func.isRequired,
};


const styles = StyleSheet.create({
    container: {
        height:             130,
        borderRadius:       20,
        
        marginHorizontal:   7,
        alignContent:       'center',
        flexDirection:      'row',
        alignSelf:          'stretch',

        backgroundColor:    UniColors.white,
        
        shadowOffset:       { width: 0, height: 2 },
        shadowRadius :      6,
        shadowColor:        UniColors.black,
        shadowOpacity:      0.16,
    },

    imageContainer: {
        marginLeft:     15,
        alignSelf:      'center',
    },

    textContainer: {
        marginLeft:     20,
        marginRight:    115,
        alignSelf:      'center',
    },

    titleText: {
        height:     17,
        
        fontSize:   UniText.small,
        color:      UniColors.main,
        textAlign:  'left',
        fontWeight: UniText.semibold,
    },

    contentText: {
        marginTop:  5,
        height:     51,

        fontSize:   UniText.small,
        color:      UniColors.dark_grey,
        textAlign:  'left',
    },

    bottomTextContainer: {
        marginTop:      3,

        flexDirection:  'row',
        alignSelf:      'stretch',
        justifyContent: 'space-between',
    },

    categoryText: {
        fontSize:   UniText.small,
        color:      UniColors.dark_grey,
        textAlign:  'left',
        fontWeight: UniText.semibold,
    },

    priceText: {
        fontSize:   UniText.small,
        color:      UniColors.dark_grey,
        textAlign:  'right',
        fontWeight: UniText.semibold,
    }
});

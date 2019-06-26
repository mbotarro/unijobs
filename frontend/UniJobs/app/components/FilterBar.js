"use strict";

import React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native';

import UniColors from '../constants/UniColors'
import UniText from '../constants/UniText'


export default class FilterBar extends React.Component {
    render() {
        const { categories, onAddCategory, onRemoveCategory } = this.props;

        const miniButtons = categories.map((cat, index) => (
            <View key={index} style={{ marginHorizontal: 4, flexDirection: 'row', alignSelf: 'stretch' }}>
                <MiniButton text={cat.name.replace('.', ' ')}
                    onActivate={() => { onAddCategory(cat.id) }}
                    onDeactivate={() => { onRemoveCategory(cat.id) }} />
            </View>
        ));

        return (
            <View style={styles.barContainer}>
                <ScrollView horizontal={true}
                    contentContainerStyle={{ paddingHorizontal: 4 }}
                    showsHorizontalScrollIndicator={false}
                >
                    {miniButtons}
                </ScrollView>
            </View>
        );
    }
}

class MiniButton extends React.Component {
    state = {
        isActive: false,
    }

    onPress(self, onActivate, onDeactivate) {
        if (!self.state.isActive)
            onActivate();
        else
            onDeactivate();

        self.setState({ isActive: !self.state.isActive });
    }

    render() {
        const { text, onActivate, onDeactivate } = this.props;

        const active = this.state.isActive
        var buttonStyle, textStyle
        if (active) {
            buttonStyle = [buttonStyles.buttonStyle, buttonStyles.buttonActive]
            textStyle = [buttonStyles.textStyle, buttonStyles.textActive]
        }
        else {
            buttonStyle = [buttonStyles.buttonStyle, buttonStyles.buttonInactive]
            textStyle = [buttonStyles.textStyle, buttonStyles.textInactive]
        }

        return (
            <TouchableHighlight
                style={buttonStyles.touchableStyle}
                onPress={() => this.onPress(this, onActivate, onDeactivate)}
                underlayColor={UniColors.transparent}
                activeOpacity={1}
            >
                <View style={buttonStyle}>
                    <Text style={textStyle}>{text}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const buttonStyles = StyleSheet.create({
    textActive: { color: UniColors.white },

    textInactive: { color: UniColors.dark },

    textStyle: {
        fontSize: UniText.normal,
        fontWeight: UniText.semilight,

        textAlign: 'center',
        alignSelf: 'center',
    },

    buttonActive: { backgroundColor: UniColors.dark },

    buttonInactive: { backgroundColor: UniColors.light },

    buttonStyle: {
        alignContent: 'center',
        alignSelf: 'flex-start',

        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 12,
    },

    touchableStyle: {
        flexDirection: 'column',
        alignSelf: 'stretch',
        justifyContent: 'center',
    }
});

const styles = StyleSheet.create({
    barContainer: {
        backgroundColor: UniColors.white,
        height: 40,
        alignSelf: 'stretch',

        ...Platform.select({
            ios: {
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 3,
                shadowColor: UniColors.black,
                shadowOpacity: 0.16,
            },
            android: {
                elevation: 3,
            },
        }),
    },
});

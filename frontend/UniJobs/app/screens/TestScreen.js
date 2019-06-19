"use strict";

import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, ScrollView, TouchableHighlight } from 'react-native';

import UniStyles from '../constants/UniStyles'
import UniColors from '../constants/UniColors'
import UniText from '../constants/UniText'
import UniData from '../constants/UniData'

import ORHistoryCard from '../components/ORHistoryCard'


export default class TestScreen extends React.Component {
    static navigationOptions = { title: 'Test' };
    
    state = {
        // use for store data
    }

    async componentDidMount() {
        // use for fetching data to show
    }

    isOffer = false

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container} >
                {/* <ORHistoryCard
                    onHidePress={() => alert('hide')}
                    onEditPress={() => alert('edit')}
                    onRemovePress={() => alert('remove')}
                    isOffer={this.isOffer}
                /> */}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex:           1,
        alignSelf:      'stretch',
    },
});

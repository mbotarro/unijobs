"use strict";

import React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native';
import { loadCategories } from '../actions/FeedActions'

import UniStyles from '../constants/UniStyles'
import UniColors from '../constants/UniColors'
import UniText from '../constants/UniText'
import UniData from '../constants/UniData'

import FilterBar from '../components/FilterBar'


export default class TestScreen extends React.Component {
    static navigationOptions = { title: 'Test' };
    
    state = {
        isLoading: true,
        categories: {},
        searchData : {
            text: '',
            categories: [],
        }
    }

    onAddCategory(categoryId) {
        this.state.searchData.categories.push(categoryId)
    }

    onRemoveCategory(categoryId) {
        this.state.searchData.categories = 
            this.state.searchData.categories.filter((v, i, obj) => {return v != categoryId})
    }

    async componentDidMount() {
        // use for fetching data to show
        loadCategories((categories) => {
            // var hash = {}
            // for (var i = 0; i < categories.length; i++)
            //     hash[categories[i].id] = categories[i];
            this.setState({categories: categories, isLoading: false})
        });
    }

    render() {
        const { navigate } = this.props.navigation;

        const feedBar = this.state.isLoading ? null :
            <FilterBar
                categories={this.state.categories}
                onAddCategory={(categoryId) => this.onAddCategory(categoryId)}
                onRemoveCategory = {(categoryId) => this.onRemoveCategory(categoryId)}
                />
        

        return (
            <View style={styles.container} >
                {feedBar}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignSelf:      'stretch',
    },
});

import React, { Component } from 'react';
import { View, Image } from 'react-native';
import ItemMiniCard from './ItemMiniCard'

import UniStyles from '../constants/UniStyles'
import UniData from '../constants/UniData'
import UniColors from '../constants/UniColors'


function populateRequestMiniCards(requests, categories) {
    return (
        requests.map((req, index) => (
        <View key = {index} style = {{marginTop: 3}} >
            {populateRequestMiniCard(req, categories)}
        </View>
    )));
}

function populateRequestMiniCard(request, categories) {
    const category  = categories[request.Categoryid];

    const categoryName = category ? category.Name.replace('.', ' de ') : 'UNDEFINED';
    
    const image     =   <Image
                            source = {getCategoryImage(request.Categoryid)}
                            style={{ width: 80, height: 80}}
                        />;

    
    var price     = 'R$' + request.MinPrice;
    if (request.MaxPrice > request.MinPrice)
        price += ' - ' + request.MaxPrice;
    
    return (
        <ItemMiniCard
            image           = {image}
            titleText       = {request.Name}
            contentText     = {request.Description}
            categoryText    = {categoryName}
            priceText       = {price}
            onPress         = {() => { }}
        />);
};

function getCategoryImage(id) {
    switch (id) {
        case 1 : return require('../assets/_test_categories/the-sum-of.png');
        case 2 : return require('../assets/_test_categories/piano.png');
        case 3 : return require('../assets/_test_categories/translate.png');
    }
    
    return require('../assets/_test_categories/rectangle.png');
};



module.exports = { populateRequestMiniCards };

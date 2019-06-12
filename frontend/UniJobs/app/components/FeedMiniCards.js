import React, { Component } from 'react';
import { View, Image } from 'react-native';
import ItemMiniCard from './ItemMiniCard'

import UniStyles from '../constants/UniStyles'
import UniData from '../constants/UniData'
import UniColors from '../constants/UniColors'


function populateRequestMiniCards(requests, categories, onMiniCardOpen) {
    return (
        requests.map((req, index) => (
        <View key = {index} style = {{marginTop: 3}} >
            {populateRequestMiniCard(req, categories, onMiniCardOpen)}
        </View>
    )));
}

function populateRequestMiniCard(request, categories, onMiniCardOpen) {
    const category  = categories[request.Categoryid];

    const categoryName = category ? category.Name.replace('.', ' de ') : 'UNDEFINED';
    
    const image     =   <Image
                            source = {category.image}
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
            onPress         = {() => onMiniCardOpen(request)}
        />);
};



module.exports = { populateRequestMiniCards };

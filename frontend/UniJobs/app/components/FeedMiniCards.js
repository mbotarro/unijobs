import React, { Component } from 'react';
import { View, Image } from 'react-native';
import ItemMiniCard from './ItemMiniCard'
//used for requests and offers
function populateRequestMiniCard(request, categories, onMiniCardOpen) {
    const category  = categories[request.categoryid];
    
    const categoryName = category ? category.name.replace('.', ' de ') : 'UNDEFINED';
    
    const image     =   <Image
                        source = {category.image}
                        style={{ width: 65, height: 65}}
                        />;
    
    var price     = 'R$' + request.minprice;
    if (request.maxprice > request.minprice)
        price += ' - ' + request.maxprice;
    
    return (
        <ItemMiniCard
            image           = {image}
            titleText       = {request.name}
            contentText     = {request.description}
            categoryText    = {categoryName}
            priceText       = {price}
            onPress         = {() => onMiniCardOpen(request)}
        />);
};

function populateRequestMiniCards(requests, categories, onMiniCardOpen) {
    return (
        requests.map((req, index) => (
            <View key = {index} style = {{marginTop: 3}} >
            {populateRequestMiniCard(req, categories, onMiniCardOpen)}
        </View>
    ))
    );
}

module.exports = { populateRequestMiniCards};

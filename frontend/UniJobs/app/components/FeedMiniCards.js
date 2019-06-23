import React, { Component } from 'react';
import { View, Image } from 'react-native';
import ItemMiniCard from './ItemMiniCard'

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
    
function populateOfferMiniCard(offer, categories, onMiniCardOpen) {
    const category  = categories[offer.categoryid];
    
    const categoryName = category ? category.name.replace('.', ' de ') : 'UNDEFINED';
    
    const image     =   <Image
                        source = {category.image}
                        style={{ width: 65, height: 65}}
                        />;
    
    var price     = 'R$' + offer.minprice;
    if (offer.maxprice > offer.minprice)
        price += ' - ' + offer.maxprice;
    
    return (
        <ItemMiniCard
        image           = {image}
        titleText       = {offer.name}
        contentText     = {offer.description}
        categoryText    = {categoryName}
        priceText       = {price}
        onPress         = {() => onMiniCardOpen(offer)}
        />);
};

function populateOfferMiniCards(offers, categories, onMiniCardOpen) {
    return (
        offers.map((off, index) => (
            <View key = {index} style = {{marginTop: 3}} >
            {populateOfferMiniCard(off, categories, onMiniCardOpen)}
        </View>
        ))
    );
}
module.exports = { populateRequestMiniCards, populateOfferMiniCards };

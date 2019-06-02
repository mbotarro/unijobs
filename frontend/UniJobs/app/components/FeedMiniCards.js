import React, { Component } from 'react';
import { View, Image } from 'react-native';
import ItemMiniCard from './ItemMiniCard'

import UniStyles from '../constants/UniStyles'
import UniData from '../constants/UniData'
import UniColors from '../constants/UniColors'

function populateRequestMiniCards(requests) {
    return (
        requests.map((req, index) => (
        <View key = {index} style = {{marginTop: 5}} >
            {populateRequestMiniCard(req)}
        </View>
    )));
}

function populateRequestMiniCard(request) {
    const image     =   <Image
                            source = {getCategoryImage(request.CategoryId)}
                            style={{ width: 80, height: 80}}
                        />;

    const category  = getCategoryName(request.CategoryId);
    const price     = 'R$' + request.MinPrice;
    if (request.MaxPrice > request.MinPrice)
        price += ' - ' + request.MaxPrice;
    
    return (
        <ItemMiniCard
            image           = {image}
            titleText       = {request.Name}
            contentText     = {request.Description}
            categoryText    = {category}
            priceText       = {price}
            onPress         = {() => { }}
        />);
};


function getCategoryName(id) {
    switch (id) {
        case 0 : return 'Categoria';
        case 1 : return 'Aulas de Exatas';
        case 2 : return 'Aulas Extracurriculares';
        case 3 : return 'Outros';
    }
};

function getCategoryImage(id) {
    switch (id) {
        case 0 : return require('../assets/_test_categories/rectangle.png')
        case 1 : return require('../assets/_test_categories/the-sum-of.png');
        case 2 : return require('../assets/_test_categories/piano.png');
        case 3 : return require('../assets/_test_categories/translate.png');
    }
};



module.exports = { populateRequestMiniCards };

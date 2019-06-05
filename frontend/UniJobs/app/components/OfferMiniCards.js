import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import UniStyles from '../constants/UniStyles'
import UniData from '../constants/UniData'
import UniColors from '../constants/UniColors'
import UniText from '../constants/UniText'

import PropTypes from 'prop-types'


function populateRequestOfferCards(requests) {
    return (
        requests.map((req, index) => (
                <View key = {index} style = {{marginTop: 3}}>
                    <OfferMiniCard 
                        image={req.Image}
                        title={req.Title}
                        userId={req.ID}
                        price={req.Price}
                        description={req.Description}
                    />
                </View>
            )
        )
    );
}

class OfferMiniCard extends React.Component {
    render() {

        const {image, title, userId, price, description} = this.props

        return(
            <TouchableOpacity>
                <View style={{flexDirection: 'row', width: window.width, justifyContent: 'space-between',
                    marginHorizontal: 25, marginVertical: 0
                }}>
                    <Image
                        source={{uri: 'https://scontent.fbsb9-1.fna.fbcdn.net/v/t1.0-9/380610_3187067755653_628186151_n.jpg?_nc_cat=109&_nc_oc=AQlJxxAQwZVYqktXB7SGCnEli6fbB_jlBln5JziI8nIAfKwgDlJc_vS2qxly5TDDIlk&_nc_ht=scontent.fbsb9-1.fna&oh=f2eed9d5d1e213b414025bad0b4dac04&oe=5D8E1840'}}
                        style={[{marginHorizontal: 15, marginVertical: 10, width: 50, height: 50, alignSelf: 'center'}]}
                    />
                    <View style={{flexDirection: 'column', flex: 1, justifyContent: 'flex-start'}}>
                        <Text style={{marginHorizontal: 12, textAlign: 'left', marginTop: 8, color: '#00A5F2', fontSize: UniText.small, fontWeight: '600'}}>Aulas de Cálculo 1</Text>
                        <Text style={{marginHorizontal: 12, textAlign: 'left', fontSize: UniText.small}} numberOfLines = {1}>Tem medo do Guidorizzi? Eu também ...</Text>
                        <Text style={{marginHorizontal: 12, textAlign: 'left', fontSize: UniText.small, fontWeight: '600'}}>R$ 100</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}


OfferMiniCard.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

module.exports = {populateRequestOfferCards}
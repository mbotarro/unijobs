import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import UniStyles from '../constants/UniStyles'
import UniData from '../constants/UniData'
import UniColors from '../constants/UniColors'
import UniText from '../constants/UniText'

import PropTypes from 'prop-types'


function populateROCards(requests, isOffer) {
    return (
        requests.map((req, index) => {
            if(isOffer) {
                return (
                    <View key = {index} style = {{marginTop: 3, flex: 1}}>
                        <ORMiniCard 
                            image={req.image}
                            mainText={req.Name}
                            secondText={req.telephone}
                            thirdText={req.email}
                            userId={req.id}
                            isOffer={isOffer}
                        />
                    </View>
                )
            } else {
                return (
                    <View key = {index} style = {{marginTop: 3, flex: 1}}>
                        <ORMiniCard 
                            image={req.image}
                            title={req.Title}
                            userId={req.id}
                            price={req.Price}
                            description={req.description}
                            isOffer={isOffer}
                        />
                    </View>
                )
            }
        })
    );
}

class ORMiniCard extends React.Component {

    _onTouch() {
        alert('TOUCHED A CARD, HAVE TO PAY...')
    }

    render() {

        const {image, mainText, secondText, thirdText, userId, isOffer} = this.props

        
        const imgBorderRadius = isOffer ? 25 : 10

        return(
            <TouchableOpacity onPress={this._onTouch}>
                <View style={{flexDirection: 'row', width: window.width, justifyContent: 'space-between',
                    marginHorizontal: 25, marginVertical: 0
                }}>
                    <Image
                        source={{uri: 'https://scontent.fqsc1-1.fna.fbcdn.net/v/t1.0-9/11096522_771344399648889_5338287702752396658_n.jpg?_nc_cat=101&_nc_oc=AQnlvMQxz6LOHWo05wXhzlVTq10vzzJPoP5qrnMHmN6zRkWIp0jRnyXwg0N3ze7kQzM&_nc_ht=scontent.fqsc1-1.fna&oh=6cc578d97b92748023e687ccdfec981f&oe=5D8E943E'}}
                        style={[{marginHorizontal: 15, marginVertical: 10, width: 50, height: 50, alignSelf: 'center', borderRadius: imgBorderRadius}]}
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


ORMiniCard.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

module.exports = {populateRequestOfferCards: populateROCards}
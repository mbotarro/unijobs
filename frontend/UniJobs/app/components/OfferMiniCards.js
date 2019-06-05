import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

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

export default class OfferMiniCard extends React.Component {
    render() {

        const {image, title, userId, price, description} = this.props

        return(
            <View style={{flexDirection: 'row', width: window.width, justifyContent: 'space-between',
                borderBottomColor: '#ACACAC', borderBottomWidth: 2, marginHorizontal: 25, marginVertical: 0
            }}>
                <Image
                    source={{uri: 'https://scontent.fqsc1-1.fna.fbcdn.net/v/t1.0-9/20729327_1168149799953296_8838092191541694934_n.jpg?_nc_cat=104&_nc_oc=AQmT313LRkvKv48lUd4VRdNJZc4YDo9rtGcGUbSSBzZs5aS33UB9O2_zue4PP57VrEkmjwScnDuktRnrRs7xIo9D&_nc_ht=scontent.fqsc1-1.fna&oh=9ce3152e54b88a4b0a6124039a9c90e1&oe=5D8F03D9'}}
                    style={[{marginHorizontal: 15, marginVertical: 10, width: 50, height: 50, alignSelf: 'center'}]}
                />
                <View style={{flexDirection: 'column', flex: 1, justifyContent: 'flex-start'}}>
                    <Text style={{marginHorizontal: 12, textAlign: 'left', marginTop: 8, color: '#00A5F2', fontSize: UniText.small, fontWeight: '600'}}>Aulas de Cálculo 1</Text>
                    <Text style={{marginHorizontal: 12, textAlign: 'left', fontSize: UniText.small}} numberOfLines = {1}>Tem medo do Guidorizzi? Eu também ...</Text>
                    <Text style={{marginHorizontal: 12, textAlign: 'left', fontSize: UniText.small, fontWeight: '600'}}>R$ 100</Text>
                </View>
            </View>
        )
    }
}


// OfferMiniCard.propTypes = {
//     title: PropTypes.string.isRequired,
//     price: PropTypes.string.isRequired,
//     userId: PropTypes.string.isRequired,
//     image: PropTypes.string.isRequired,
//     description: PropTypes.func.isRequired,
// };

// module.exports = {populateRequestOfferCards}
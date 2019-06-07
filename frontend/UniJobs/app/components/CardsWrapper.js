import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';

import UniStyles from '../constants/UniStyles'
import UniData from '../constants/UniData'
import UniText from '../constants/UniText'
import Button from '../components/Button'


export default class CardsWrapper extends React.Component {

    _onQuit() {
        alert('Volta k bb')
    }

    render() {
        const { request, categories, ButtonWrapper, Cards } = this.props

        var price = 'R$' + request.MinPrice;
        if (request.MaxPrice > request.MinPrice)
            price += ' - ' + request.MaxPrice;

        const category = categories[request.Categoryid];
        const categoryName = category ? category.Name : 'UNDEFINED';

        const Images = (name) => {
            switch (name) {
                case 'exit': return require('../assets/icons/exit.png');
                case 'profile': return {uri: 'https://scontent.fcgh26-1.fna.fbcdn.net/v/t1.0-9/11083590_812546692160411_9062729632029555370_n.jpg?_nc_cat=107&_nc_eui2=AeEjjtOMxbQTsNq72Zzt_Vvkfn6YPnTS2nayksH3Wtm1hVJBzKBgEzXM8hKKhqtCKYMi2IG_XP0zvxOEW7jCYWE5_BWsY5gQz9Gfc4IsxswSTA&_nc_oc=AQntkHn0DtIsoUU5ao7AUVdJBIlCuznYgIXxmYiWMS01ucnyIgZ4p8r1Vri7Xg4mNmk&_nc_ht=scontent.fcgh26-1.fna&oh=7a7631f35661b4c19933b29b717a3b6e&oe=5D86D0FD'};
            }
        };

        const QuitButton = () => (
            <TouchableOpacity onPress={this._onQuit} style={{padding: iconStyles.exitIcon.width * 2.2, marginLeft: -25, marginTop: -25}}>
                <Image
                    source={Images('exit')}
                    style={[iconStyles.exitIcon]}
                />
            </TouchableOpacity>
        )

        const PageHeader = () => {
            return(
                <View style={{flexDirection: 'row', width: window.width, justifyContent: 'space-between', marginVertical: 15, marginHorizontal: 10}}>
                    <View style={{alignSelf: 'center', justifyContent: 'flex-start'}}>
                        <QuitButton/>
                    </View>
                    <Text style={textStyles.textTitle}>{request.Name}</Text>
                    <View style={{justifyContent: 'flex-end', width: iconStyles.exitIcon.width, height: iconStyles.exitIcon.height,
                        marginRight: iconStyles.exitIcon.marginLeft, alignSelf: 'center'}}
                    />
                </View>
            )
        }

        const RequestDescription = () => {
            return(
                <View style={{flexDirection: 'row', width: window.width, justifyContent: 'space-between', marginTop: -25}}>
                    <View style={[containerStyles.photoPriceContainer]}>
                        <Image
                            source={Images('profile')}
                            style={[iconStyles.profileImage]}
                        />
                        <View style={{flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
                            <Text style={[textStyles.categoryText, {marginVertical: 5}]}>{categoryName}</Text>
                            <Text style={[textStyles.categoryText]}>{price}</Text>
                        </View>
                    </View>
                    <Text style={[textStyles.mainDescText]}>
                        {(request.Description.length > 290) ? (((request.Description).substring(0,290-3)) + '...') : request.Description}
                    </Text>
                </View>
            )
        }

        return (
            <View style={[containerStyles.container]}>
                <View style={{width: 60, height: 5, backgroundColor: 'white', borderRadius: 3, marginTop: 30, alignSelf: 'center'}}/>
                <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
                    <View style={[containerStyles.whiteContainer]}>
                        <PageHeader/>
                        <RequestDescription/>
                        <Cards/>
                        <ButtonWrapper/>
                    </View>
                </ScrollView>
            </View>
        )
    }
}


const containerStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    whiteContainer: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 5,
        marginTop: 5,
        marginBottom: 20,
        borderRadius: 20,
        flexDirection: 'column',
    },
    photoPriceContainer: {
        flexDirection: 'column',
        marginVertical: 10,
        marginRight: 10,
        marginLeft: 15,
        alignContent: 'center',
        justifyContent: 'center',
    },  
    cardsContainer: {
        marginTop: 20,
        marginBottom: 30,
        flexDirection: 'column',
        flex: 1,
    },
});

const iconStyles = StyleSheet.create({
    exitIcon: {
        width: 14,
        height: 14,
        resizeMode: 'stretch',
        marginLeft: 5,
    },
    profileImage: {
        width: 85,
        height: 85,
        alignSelf: 'center',
        borderRadius: 15,
    },
})

const textStyles = StyleSheet.create({
    textTitle: {
        fontSize: UniText.big,
        fontWeight: 'bold',
        color: '#00A5F2',
    },
    categoryText: {
        width: 0.95*iconStyles.profileImage.width,
        textAlign: 'center',
        fontSize: UniText.small,
        fontWeight: '500',
    },
    mainDescText: {
        flex: 1,
        marginRight: 20,
        marginLeft: 20,
        marginTop: 5,
        fontSize: UniText.small,
        textAlign: 'justify'
    },
    cardsViewTitle: {
        fontSize: UniText.big,
        color: '#00A5F2',
        textAlign: 'center',
        marginBottom: 15,
    }
})

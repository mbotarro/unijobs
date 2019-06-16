import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';

import UniText from '../constants/UniText'


export default class CardsWrapper extends React.Component {

    render() {
        const { request, categories, ButtonWrapper, Cards, onQuit, isOffer } = this.props

        var price = 'R$' + request.minprice;
        if (request.maxprice > request.minprice)
            price += ' - ' + request.maxprice;

        const category = categories[request.categoryid];
        const categoryName = category ? category.name.replace('.', ' de ') : 'UNDEFINED';

        const Images = (name) => {
            switch (name) {
                case 'exit': return require('../assets/icons/exit.png');
                case 'profile': return category.image;
            }
        };

        const QuitButton = () => (
            <TouchableOpacity onPress={onQuit} style={{padding: iconStyles.exitIcon.width * 2.2, marginLeft: -25, marginTop: -25}}>
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
                    <Text style={textStyles.textTitle}>{request.name}</Text>
                    <View style={{justifyContent: 'flex-end', width: iconStyles.exitIcon.width, height: iconStyles.exitIcon.height,
                        marginRight: iconStyles.exitIcon.marginLeft, alignSelf: 'center'}}
                    />
                </View>
            )
        }

        OfferInfo = () => {return(null)}
        if(isOffer) {
            OfferInfo = () => {
                return (
                    <View style={{flexDirection: 'column', marginLeft: 15, marginRight: 10, marginBottom: 15}}>
                        <View style={{flexDirection: 'row', marginBottom: 5}}>
                            <Text style={[textStyles.offerInfoText, {color: '#00A5F2'}]}>
                                Disponível até:
                            </Text>
                            <Text style={{marginLeft: 25, fontSize: UniText.small}}>
                                DD / MM / AAAA
                            </Text>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                            <Text  style={[textStyles.offerInfoText, {color: '#00A5F2'}]}>
                                Informações Adicionais
                            </Text>
                            <Text numberOfLines={1} style={{fontSize: UniText.small}}>
                                Informações adicionais que não podem passar de 1 linha!!
                            </Text>
                        </View>
                    </View>
                )
            }
        }

        const CardDescription = () => {
            return(
                <View style={{flexDirection: 'column'}}>
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
                            {(request.description.length > 290) ? (((request.description).substring(0,290-3)) + '...') : request.description}
                        </Text>
                    </View>
                    <OfferInfo/>
                </View>
            )
        }

        return (
            <View style={[containerStyles.container]}>
                <View style={{width: 60, height: 5, backgroundColor: 'white', borderRadius: 3, marginTop: 30, alignSelf: 'center'}}/>
                <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
                    <View style={[containerStyles.whiteContainer]}>
                        <PageHeader/>
                        <CardDescription/>
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
    },
    offerInfoText: {
        fontSize: UniText.small,
    }
})

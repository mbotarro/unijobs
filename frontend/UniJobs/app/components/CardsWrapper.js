import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';

import UniText from '../constants/UniText'
import UniColors from '../constants/UniColors'


export default class CardsWrapper extends React.Component {

    render() {
        //request is used for request and offers
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
                    <View style={{
                        justifyContent: 'flex-end',
                        width: iconStyles.exitIcon.width,
                        height: iconStyles.exitIcon.height,
                        marginRight:iconStyles.exitIcon.marginLeft,
                        alignSelf: 'center'
                    }}
                    />
                </View>
            )
        }

        OfferInfo = () => {return(null)}
        if(isOffer) {
            //experition format :   2020-06-20T03:00:13.250602Z , output format : DD / MM / AAAA às 19hrs
            var date = request.expiration.substring(8,10) + ' / ' + request.expiration.substring(5,7) + ' / ' + request.expiration.substring(0,4)+ '  às   '+ request.expiration.substring(11,13)+ ' hrs';
            OfferInfo = () => {
                return (
                    <View style={{flexDirection: 'column', marginHorizontal: 26}}>
                        <View style={{flexDirection: 'row', marginBottom: 5}}>
                            <Text style={[textStyles.requestInfoText, {color: '#00A5F2'}]}>
                                Disponível até:
                            </Text>
                            <Text style={{marginLeft: 25, color: UniColors.dark_grey, fontSize: UniText.small, fontWeight: UniText.semibold}}>
                                {date}
                            </Text>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                            <Text  style={[textStyles.requestInfoText, {color: '#00A5F2'}]}>
                                Informações Adicionais
                            </Text>
                            <Text numberOfLines={1} style={{color: UniColors.dark_grey, fontSize: UniText.small}}>
                                {request.extrainfo}
                            </Text>
                        </View>
                    </View>
                )
            }
        }

        const CardDescription = () => {
            return(



                <View style={{flexDirection: 'column'}}>
                    <Text style={[textStyles.mainDescText]}>
                        {(request.description.length > 290) ? (((request.description).substring(0,290-3)) + '...') : request.description}
                    </Text>    
                    <View style={{flexDirection: 'row', alignSelf: 'stretch', marginHorizontal: 26, marginTop: 15, marginBottom: 28}}>
                            <Image
                                source={Images('profile')}
                                style={[iconStyles.profileImage]}
                            />
                            <Text style={[textStyles.categoryText, {marginLeft: 10, flexGrow: 1}]}>{categoryName}</Text>
                            <Text style={[textStyles.categoryText, {fontWeight: UniText.semibold}]}>{price}</Text>
                    </View>
                    <OfferInfo />
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
        marginTop: 13,
    },
    whiteContainer: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 5,
        marginTop: 6,
        marginBottom: 20,
        borderRadius: 20,
        flexDirection: 'column',
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
        width: 30,
        height: 30,
        alignSelf: 'center',
    },
})

const textStyles = StyleSheet.create({
    textTitle: {
        fontSize: UniText.big,
        fontWeight: UniText.semibold,
        color: UniColors.main,
    },
    categoryText: {
        color: UniColors.main,
        fontSize: UniText.normal,
        alignSelf: 'center',
    },
    mainDescText: {
        flex: 1,
        color: UniColors.dark, 
        marginHorizontal: 26,
        fontSize: UniText.normal,

        textAlign: 'justify'
    },
    cardsViewTitle: {
        fontSize: UniText.big,
        color: '#00A5F2',
        textAlign: 'center',
        marginBottom: 15,
    },
    requestInfoText: {
        fontSize: UniText.normal,
    }
})

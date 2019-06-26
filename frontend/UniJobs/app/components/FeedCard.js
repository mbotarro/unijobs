import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

import { getUserData, getUserPicture } from '../actions/LoginActions'

import UniText from '../constants/UniText'
import Button from './Button'
import ButtonWithIcon from './ButtonWithIcon'

import CardsWrapper from './CardsWrapper'
import {makeMatch} from '../actions/FeedActions'

export default class FeedCard extends React.Component {
    state = {
        isLoading: true,
        userid: null,
        userdata: null,
        userpicture: null,
    }

    constructor (props) {
        super(props);
        this.state.userid = this.props.isOffer? this.props.offer.userid : this.props.request.userid
    }

    async componentDidMount() {
        getUserData (this.state.userid, (userdata) => {
            getUserPicture(this.state.userid, (userpicture) => {
                this.setState({isLoading: false, userdata: userdata, userpicture: userpicture});
            });
        });
    }

    doMatch(offer, updateFeed, loggedUserid) {
        makeMatch(offer.id, loggedUserid, () => {offer.matched = true})
        updateFeed()
    }

    render() {
        const { offer, request, categories, onCreateOfferPress, onShowRequester, onQuit, isOffer, updateFeed, loggedUserid } = this.props; 

        const ActionButton = (text, onPress, color) => (
            <Button
                text={text}
                buttonStyle={{ marginHorizontal: 64, paddingVertical: 10, marginTop: 10, backgroundColor: color }}
                onPress={() => onPress()}
            />
        )

        const CardViewText = () => {
            if (isOffer) {
                return(
                    <View style={{flexDirection: 'column', flex: 1}}>
                        <Text numberOfLines={1} style={[textStyles.userOfferName]}>{this.state.userdata.username}</Text>
                        <Text numberOfLines={1} style={{fontSize: UniText.small}}>{this.state.userdata.telephone}</Text>
                        <Text numberOfLines={1} style={{fontSize: UniText.small}}>{this.state.userdata.email}</Text>
                    </View>
                )
            }

            return (
                <Text numberOfLines={1} style={[textStyles.userRequestName]}>{this.state.userdata.username}</Text>
            )
        }

        const CardView = () => {
            if (((isOffer && offer.matched) || isOffer === false) && this.state.isLoading === false){
                return(
                    <View style={[containerStyles.cardsContainer]}>
                        <TouchableOpacity onPress={onShowRequester}>
                            <View style={{
                                flexDirection: 'row', width: window.width, alignItems: 'center',
                                marginHorizontal: 25
                            }}>
                                <View style={{ justifyContent: 'center' }}>
                                    <Image
                                        source={this.state.userpicture}
                                        style={[{ marginHorizontal: 15, width: 50, height: 50, alignSelf: 'center', borderRadius: 25 }]}
                                    />
                                </View>
                                <CardViewText/>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            }

            return(null)
        }

        const CreateOfferButtom = ActionButton('Criar Oferta', onCreateOfferPress, '#0BA5F2');
        const createRoundButton = (isCheck, onPress) => {
            if(isCheck){
                imageSource = require('../assets/icons/check-mark.png')
                color = '#4ED124'
                imageSize = 20
            } else {
                imageSource = require('../assets/icons/exit_white.png')
                color = '#FF431B'
                imageSize = 15
            }
            return (
                <TouchableOpacity onPress={onPress} style={{backgroundColor: color, borderRadius: 35}}>
                    <View style={{justifyContent: 'center', alingItems: 'center', height: 55, width: 55}}>
                        <Image
                            source={imageSource}
                            style={[{height: imageSize, width: imageSize, alignSelf: 'center'}]}
                        />
                    </View>
                </TouchableOpacity>
            )
        }

        const ButtonWrapper = () => {
            if (isOffer) {
                if (offer.matched){
                    return (
                        null
                    )
                }
                return (
                    <View 
                        style={{
                            flexDirection: 'row', marginHorizontal: 15, alignItems: 'center', 
                            justifyContent: 'space-evenly', marginBottom: 30, marginTop: 10
                        }}
                    >
                        {createRoundButton(false, () => {onQuit()})}
                        {createRoundButton(true, () => {this.doMatch(offer, updateFeed, loggedUserid)})}
                    </View>
                )
            } else {
                return (
                    <View style={{ flexDirection: 'column', marginBottom: 30 }}>
                        {CreateOfferButtom}
                    </View>
                )
            }
        }

        return (
            <CardsWrapper
                request={this.props.isOffer?offer:request}
                categories={categories}
                ButtonWrapper={ButtonWrapper}
                Cards={CardView}
                onQuit = {onQuit}
                isOffer = {isOffer}
            />
        )
    }
}


const containerStyles = StyleSheet.create({
    cardsContainer: {
        marginTop: 10,
        marginBottom: 30,
        flexDirection: 'column',
        flex: 1,
    },
});

const textStyles = StyleSheet.create({
    userRequestName: {
        marginBottom: 5,
        alignSelf: 'center',
        marginHorizontal: 12,
        textAlign: 'left',
        marginTop: 8,
        color: '#00A5F2',
        fontSize: UniText.small,
        fontWeight: '600'
    },
    userOfferName: {
        alignSelf: 'flex-start',
        textAlign: 'left',
        color: '#00A5F2',
        fontSize: UniText.small,
        fontWeight: '400'
    }
})

const myFeedCategoriesTest = [
    { Name: 'category1' },
    { Name: 'category2' },
    { Name: 'category3' },
    { Name: 'category4' },
    { Name: 'category5' },
    { Name: 'category6' },
    { Name: 'category7' },
]

const myFeedTestRequests = [
    {
        ID: 0,
        Name: 'Titulo Solicitação',
        Description: 'Descrição bem grande o suficiente para usar todo o espaço disponível em preview limitado em espaço máximo e restrito!!!!!!!!!!!!!!!!!!!!!!!!!!',
        ExtraInfo: '',
        MinPrice: 'XXXXX',
        MaxPrice: 'XXXXX',
        Userid: 0,
        Categoryid: 0,
    },
    {
        ID: 1,
        Name: '***Aula de Cálculo Numérico***',
        Description: 'Correção de exercícios e revisão teórica. Aulas em grupos de 3 a 4 pessoas',
        ExtraInfo: '',
        MinPrice: '50',
        MaxPrice: '50',
        Userid: 0,
        Categoryid: 1,
    },
    {
        ID: 2,
        Name: 'Aula de Piano',
        Description: 'Teoria da música, leitura de partituras e exercícios de dedo. Aprenda suas músicas favoritas!',
        ExtraInfo: '',
        MinPrice: '100',
        MaxPrice: '100',
        Userid: 0,
        Categoryid: 2,
    },
    {
        ID: 3,
        Name: 'Tradução Chinês - Português',
        Description: 'Tradução em chinês tradicional ou simplificado. Preço por página em português.',
        ExtraInfo: '',
        MinPrice: '30',
        MaxPrice: '30',
        Userid: 0,
        Categoryid: 3,
    }
]
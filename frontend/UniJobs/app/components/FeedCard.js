import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

import { getUserData, getUserPicture } from '../actions/LoginActions'

import UniText from '../constants/UniText'
import UniColors from '../constants/UniColors'

import Button from './Button'
import ButtonWithIcon from './ButtonWithIcon'

import CardsWrapper from './CardsWrapper'
import {makeMatch} from '../actions/FeedActions'
import { isNullOrUndefined } from 'util';

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
        const { offer, request, categories, onCreateOfferPress, onShowRequester, onQuit, isOffer, updateFeed, loggedUserid ,myFeedOpen} = this.props; 

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
                        <Text numberOfLines={1} style={[textStyles.userName]}>{this.state.userdata.username}</Text>
                        <Text numberOfLines={1} style={{fontSize: UniText.small, color: UniColors.dark_grey, marginTop: 2}}>{offer.telephone}</Text>
                        <Text numberOfLines={1} style={{fontSize: UniText.small, color: UniColors.dark_grey, marginTop: 2}}>{offer.email}</Text>
                    </View>
                )
            }

            return (
                <View style={{flexDirection: 'column', flex: 1}}>
                    <Text numberOfLines={1} style={[textStyles.userName]}>{this.state.userdata.username}</Text>
                </View>
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
            else if(isOffer && myFeedOpen && this.state.isLoading === false){
                return(
                    <View>
                        {getInterested(offer)}
                    </View>
                    

                )
            }

            return(null)
        }

        const CreateOfferButtom = ActionButton('Criar Oferta', onCreateOfferPress, '#0BA5F2');
        const createRoundButton = (isCheck, onPress) => {
            if(isCheck){
                imageSource = require('../assets/icons/check-mark.png')
                color = '#2FCE4D'
                imageSize = 20
            } else {
                imageSource = require('../assets/icons/exit_white.png')
                color = '#F73B3B'
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
                if (myFeedOpen||offer.matched){
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

function getInterested(offer) {
    if(typeof offer.interestedusers === 'undefined'||offer.interestedusers.length === 0){
        return(
            <View>
                <Text style={{color: '#00A5F2',marginHorizontal: 15,marginBottom:20,marginLeft:25}}>
                    Nenhum interessado até o momento.
                </Text>
            </View>
        );
    }

    return (
        <View style={{marginBottom:20}}>
            <Text style={{color: '#00A5F2',marginTop: 15,marginLeft:25}}>
                Tiveram interesse na sua oferta!
            </Text>
            {offer.interestedusers.map((person, index) => (             
                <View key = {index} style = {{marginTop: 3}} >
                    {interestedPerson(person)}
                </View>
            ))}
        </View>
            
    );
}
function interestedPerson(person){
    return(
        <View style={[containerStyles.cardsContainer]}>
            <TouchableOpacity >
                <View style={{
                    flexDirection: 'row', width: window.width, alignItems: 'center',
                    marginHorizontal: 20,
                }}>
                    <View style={{ justifyContent: 'center' }}>
                        <Image
                            source={require('../assets/_users/student.png')}
                            style={[{ marginHorizontal: 15, width: 50, height: 50, alignSelf: 'center', borderRadius: 25 }]}
                        />
                    </View>
                    <View style={{flexDirection: 'column', flex: 1}}>
                        <Text numberOfLines={1} style={[textStyles.userOfferName]}>{person.username}</Text>
                        <Text numberOfLines={1} style={{fontSize: UniText.small}}>{person.telephone}</Text>
                        <Text numberOfLines={1} style={{fontSize: UniText.small}}>{person.email}</Text>
                    </View>

                </View>
            </TouchableOpacity>
        </View>
    )
}

const containerStyles = StyleSheet.create({
    cardsContainer: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'column',
        flex: 1,
    },
});

const textStyles = StyleSheet.create({
    userName: {
        alignSelf: 'flex-start',
        textAlign: 'left',
        color: UniColors.main,
        fontSize: UniText.small,
        fontWeight: UniText.semibold
    }
})


import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

import UniStyles from '../constants/UniStyles'
import UniData from '../constants/UniData'
import UniText from '../constants/UniText'
import Button from '../components/Button'

import {OfferMiniCard} from '../components/OfferMiniCards' 

export default class OfferCardScreen extends React.Component {
    static navigationOptions = {title: '???'};

    _onTouchRequester() {
        alert('You want to know the requester... naughty personx')
    }

    _onCreatOfferPress() {
        alert('NOW THERE IS NO TURNING BACK...')
    }

    render() {

        const {navigation} = this.props.navigation

        const testText = 'Descrição bem grande o suficiente para usar todo o espaço disponível em preview limitado em espaço maximo e restrito !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Esse espaço é ainda maior quando vc abre a solicitação e faz com que mais informação importante seja dita.sadfasdfasdfasdf'

        const Images = (name) => {
            switch (name) {
                case 'exit': return require('../assets/icons/exit.png');
                case 'profile': return {uri: 'https://scontent.fbsb9-1.fna.fbcdn.net/v/t1.0-9/426056_4489254589510_757001532_n.jpg?_nc_cat=101&_nc_oc=AQlQUXcAo9rf4C-S53BUVzn0OxTouzx4E31KsnLXkMGL3HuBYwRL9bHJ8uyeXEcgtjE&_nc_ht=scontent.fbsb9-1.fna&oh=6f1621de613155e2155a6743c913bdeb&oe=5D938675'};
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

        const ActionButton = (text, onPress, color) => {
            return (
                <Button
                    text={text}
                    buttonStyle={{ marginHorizontal: 64, paddingVertical: 10, marginTop: 10, backgroundColor: color}}
                    onPress={() => onPress()}
                />
            )
        };

        const PageHeader = () => {
            return(
                <View style={{flexDirection: 'row', width: window.width, justifyContent: 'space-between', marginVertical: 15, marginHorizontal: 10}}>
                    <View style={{alignSelf: 'center', justifyContent: 'flex-start'}}>
                        <QuitButton/>
                    </View>
                    <Text style={textStyles.textTitle}>********* This is a test ********</Text>
                    <View style={{justifyContent: 'flex-end'}} />
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
                            <Text style={[textStyles.categoryText, {marginVertical: 5}]}> Maior das categorias </Text>
                            <Text style={[textStyles.categoryText]}>R$ MIN - MAX</Text>
                        </View>
                    </View>
                    <Text style={[textStyles.mainDescText]}>
                        {((testText).length > 290) ? (((testText).substring(0,290-3)) + '...') : testText}
                    </Text>
                </View>
            )
        }

        const CardView = () => {
            return (
                <View style={[containerStyles.cardsContainer]}>
                    <TouchableOpacity onPress={this._onTouchRequester}>
                        <View style={{flexDirection: 'row', width: window.width, justifyContent: 'space-between', alignItems: 'center',
                            marginHorizontal: 25
                        }}>
                            <View style={{justifyContent: 'center'}}>
                                <Image
                                    source={{uri: 'https://scontent.fbsb9-1.fna.fbcdn.net/v/t1.0-9/380610_3187067755653_628186151_n.jpg?_nc_cat=109&_nc_oc=AQlJxxAQwZVYqktXB7SGCnEli6fbB_jlBln5JziI8nIAfKwgDlJc_vS2qxly5TDDIlk&_nc_ht=scontent.fbsb9-1.fna&oh=f2eed9d5d1e213b414025bad0b4dac04&oe=5D8E1840'}}
                                    style={[{marginHorizontal: 15, width: 50, height: 50, alignSelf: 'center', borderRadius: 25}]}
                                />
                            </View>
                            <Text numberOfLines={1} style={{marginBottom: 5, alignSelf: 'center', marginHorizontal: 12, textAlign: 'left', marginTop: 8, color: '#00A5F2', fontSize: UniText.normal, fontWeight: '600'}}>Nome do usuário ridiculamente</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }


        const CreateOfferButtom = ActionButton('Criar Oferta', this._onCreatOfferPress, '#0BA5F2');

        return (
            <View style={[containerStyles.greyContainer]}>
                <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
                    <View style={[containerStyles.whiteContainer]}>
                        <PageHeader/>
                        <RequestDescription/>
                        <CardView/>
                        <View style={{flexDirection: 'column', marginBottom: 30}}>
                            {CreateOfferButtom}
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const containerStyles = StyleSheet.create({
    greyContainer: {
        flex: 1,
        backgroundColor: '#B1B8BE',
    },
    whiteContainer: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 5,
        marginTop: 40,
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
        marginRight: 25,
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
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

import UniStyles from '../constants/UniStyles'
import UniData from '../constants/UniData'
import UniText from '../constants/UniText'
import Button from '../components/Button'

import CardsWrapper from '../components/CardsWrapper'

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

        const ActionButton = (text, onPress, color) => {
            return (
                <Button
                    text={text}
                    buttonStyle={{ marginHorizontal: 64, paddingVertical: 10, marginTop: 10, backgroundColor: color}}
                    onPress={() => onPress()}
                />
            )
        };

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
                            <Text numberOfLines={1} style={[textStyles.userName]}>Nome do usuário ridiculamente</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }

        ButtonWrapper = () => {
            return (
                <View style={{flexDirection: 'column', marginBottom: 30}}>
                    {CreateOfferButtom}
                </View>
            )
        }


        const CreateOfferButtom = ActionButton('Criar Oferta', this._onCreatOfferPress, '#0BA5F2');

        return (
            <CardsWrapper
                request={myFeedTestRequests[1]}
                categories={myFeedCategoriesTest}
                ButtonWrapper={ButtonWrapper}
                Cards={CardView}
            />
        )
    }
}

const containerStyles = StyleSheet.create({ 
    cardsContainer: {
        marginTop: 20,
        marginBottom: 30,
        flexDirection: 'column',
        flex: 1,
    },
});

const textStyles = StyleSheet.create({
    userName: {
        marginBottom: 5,
        alignSelf: 'center',
        marginHorizontal: 12,
        textAlign: 'left',
        marginTop: 8,
        color: '#00A5F2',
        fontSize: UniText.normal,
        fontWeight: '600'
    }
})

const myFeedCategoriesTest = [
    {Name: 'category1'},
    {Name: 'category2'},
    {Name: 'category3'},
    {Name: 'category4'},
    {Name: 'category5'},
    {Name: 'category6'},
    {Name: 'category7'},
]

const myFeedTestRequests = [
    {
        ID : 0,
        Name : 'Titulo Solicitação',
        Description : 'Descrição bem grande o suficiente para usar todo o espaço disponível em preview limitado em espaço máximo e restrito!!!!!!!!!!!!!!!!!!!!!!!!!!',
        ExtraInfo : '',
        MinPrice : 'XXXXX',
        MaxPrice: 'XXXXX',
        Userid : 0,
        Categoryid : 0,
    },
    {
        ID : 1,
        Name : '***Aula de Cálculo Numérico***',
        Description : 'Correção de exercícios e revisão teórica. Aulas em grupos de 3 a 4 pessoas',
        ExtraInfo : '',
        MinPrice : '50',
        MaxPrice: '50',
        Userid : 0,
        Categoryid : 1,
    },
    {
        ID : 2,
        Name : 'Aula de Piano',
        Description : 'Teoria da música, leitura de partituras e exercícios de dedo. Aprenda suas músicas favoritas!',
        ExtraInfo : '',
        MinPrice : '100',
        MaxPrice: '100',
        Userid : 0,
        Categoryid : 2,
    },
    {
        ID : 3,
        Name : 'Tradução Chinês - Português',
        Description : 'Tradução em chinês tradicional ou simplificado. Preço por página em português.',
        ExtraInfo : '',
        MinPrice : '30',
        MaxPrice: '30',
        Userid : 0,
        Categoryid : 3,
    }
]
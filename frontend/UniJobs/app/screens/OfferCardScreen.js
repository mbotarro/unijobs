import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

import UniStyles from '../constants/UniStyles'
import UniData from '../constants/UniData'
import UniText from '../constants/UniText'
import Button from '../components/Button'

import {populateRequestOfferCards} from '../components/OfferMiniCards' 

export default class OfferCardScreen extends React.Component {
    static navigationOptions = {title: '???'};

    state = {
        isLoading: true,
        allOffersRequests: {},
    }

    textStrings = {
        offerCardsHeader : 'Ofertas criadas à partir da sua solicitação'
    }

    async componentDidMount() {
        this.setState({isLoading: false})
        this.setState({allOffersRequests: testRequests})
    }

    _onQuit() {
        alert('YOUR QUITTER!!!')
    }

    onHidePress() {
        alert('Hide')
    }

    onEditPress() {
        alert('Edit')
    }

    onRemovePress() {
        alert('Remove')
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

        const offerCards = this.state.isLoading ? <ActivityIndicator style = {{marginTop: 10}}/> :
            populateRequestOfferCards(this.state.allOffersRequests);
        const CardsView = () => {
            return (
                <View style={[containerStyles.cardsContainer]}>
                    <Text style={[textStyles.cardsViewTitle]}>{this.textStrings.offerCardsHeader}</Text>
                    {offerCards}
                </View>
            )
        }

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

        RequestDescription = () => {
            return(
                <View style={{flexDirection: 'row', width: window.width, justifyContent: 'space-between'}}>
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

        const HideButton = ActionButton('Ocultar', this.onHidePress, '#0BA5F2');
        const EditButton = ActionButton('Editar', this.onEditPress, '#0BA5F2');
        const RemoveButton = ActionButton('Remover', this.onRemovePress, '#EF513A');

        return (
            <View style={[containerStyles.greyContainer]}>
                <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
                    <View style={[containerStyles.whiteContainer]}>
                        <PageHeader/>
                        <RequestDescription/>
                        <CardsView/>
                        <View style={{flexDirection: 'column', marginBottom: 30}}>
                            {HideButton}
                            {EditButton}
                            {RemoveButton}
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
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

const testRequests = [
    {
        ID: '0',
        Image: 'https://scontent.fqsc1-1.fna.fbcdn.net/v/t1.0-9/20729327_1168149799953296_8838092191541694934_n.jpg?_nc_cat=104&_nc_oc=AQmT313LRkvKv48lUd4VRdNJZc4YDo9rtGcGUbSSBzZs5aS33UB9O2_zue4PP57VrEkmjwScnDuktRnrRs7xIo9D&_nc_ht=scontent.fqsc1-1.fna&oh=9ce3152e54b88a4b0a6124039a9c90e1&oe=5D8F03D9',
        Title: 'Aulas de Cálculo 1',
        Description: 'This is a test discription 1',
        Price: '100',
    },
    {
        ID: '1',
        Image: 'https://scontent.fqsc1-1.fna.fbcdn.net/v/t1.0-9/20729327_1168149799953296_8838092191541694934_n.jpg?_nc_cat=104&_nc_oc=AQmT313LRkvKv48lUd4VRdNJZc4YDo9rtGcGUbSSBzZs5aS33UB9O2_zue4PP57VrEkmjwScnDuktRnrRs7xIo9D&_nc_ht=scontent.fqsc1-1.fna&oh=9ce3152e54b88a4b0a6124039a9c90e1&oe=5D8F03D9',
        Title: 'Aulas de topologia básica',
        Description: 'This is a test discription 2',
        Price: '60',
    },
    {
        ID: '2',
        Image: 'https://scontent.fqsc1-1.fna.fbcdn.net/v/t1.0-9/20729327_1168149799953296_8838092191541694934_n.jpg?_nc_cat=104&_nc_oc=AQmT313LRkvKv48lUd4VRdNJZc4YDo9rtGcGUbSSBzZs5aS33UB9O2_zue4PP57VrEkmjwScnDuktRnrRs7xIo9D&_nc_ht=scontent.fqsc1-1.fna&oh=9ce3152e54b88a4b0a6124039a9c90e1&oe=5D8F03D9',
        Title: 'Exercícios resolvidos de intergral',
        Description: 'This is a test discription 3',
        Price: '25',
    },
    {
        ID: '3',
        Image: 'https://scontent.fqsc1-1.fna.fbcdn.net/v/t1.0-9/20729327_1168149799953296_8838092191541694934_n.jpg?_nc_cat=104&_nc_oc=AQmT313LRkvKv48lUd4VRdNJZc4YDo9rtGcGUbSSBzZs5aS33UB9O2_zue4PP57VrEkmjwScnDuktRnrRs7xIo9D&_nc_ht=scontent.fqsc1-1.fna&oh=9ce3152e54b88a4b0a6124039a9c90e1&oe=5D8F03D9',
        Title: 'Monitoria de Análise',
        Description: 'This is a test discription 4',
        Price: '140',
    },
]

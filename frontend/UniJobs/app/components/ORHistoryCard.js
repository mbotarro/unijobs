import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import UniStyles from '../constants/UniStyles'
import UniData from '../constants/UniData'
import UniText from '../constants/UniText'
import Button from './Button'

import {populateRequestOfferCards} from './ORMiniCards'
import CardsWrapper from './CardsWrapper'

export default class ORHistoryCard extends React.Component {
    static navigationOptions = {title: '???'};

    state = {
        isLoading: true,
        allOffersRequests: {},
    }

    textStrings = {
        offerCardsHeader : 'Ofertas criadas à partir da sua solicitação',
        interestCardsHeader: 'Pessoas Interessadas',
    }

    async componentDidMount() {
        this.setState({isLoading: false})
        this.setState({allOffersRequests: myFeedTestRequests})
    }

    render() {
        const {
            request, categories, 
            onHidePress, onEditPress, onRemovePress, 
            onQuit, isOffer
        } = this.props

        // const { navigate } = this.props.navigation

        const ActionButton = (text, onPress, color) => {
            return (
                <Button
                    text={text}
                    buttonStyle={{ marginHorizontal: 64, paddingVertical: 10, marginTop: 10, backgroundColor: color}}
                    onPress={() => onPress()}
                />
            )
        };

        const HideButton = ActionButton('Ocultar', onHidePress, '#0BA5F2');
        const EditButton = ActionButton('Editar', onEditPress, '#0BA5F2');
        const RemoveButton = ActionButton('Remover', onRemovePress, '#EF513A');

        const ButtonWrapper = () => {
            return (
                <View style={{flexDirection: 'column', marginBottom: 30}}>
                    {HideButton}
                    {EditButton}
                    {RemoveButton}
                </View>
            )
        }

        const cards = this.state.isLoading ? <ActivityIndicator style = {{marginTop: 10}}/> :
            populateRequestOfferCards(this.state.allOffersRequests, isOffer);
        const CardsView = () => {
            titleText = isOffer ? this.textStrings.interestCardsHeader : this.textStrings.offerCardsHeader
            return (
                <View style={[containerStyles.cardsContainer]}>
                    <Text style={[textStyles.cardsViewTitle]}>{titleText}</Text>
                    {cards}
                </View>
            )
        }

        return (
            <CardsWrapper
                request={myFeedTestRequests[0]}
                categories={myFeedCategoriesTest}
                ButtonWrapper={ButtonWrapper}
                Cards={CardsView}
                isOffer={isOffer}
            />
        );
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
        description: 'This is a test discription 1',
        Price: '100',
    },
    {
        ID: '1',
        Image: 'https://scontent.fqsc1-1.fna.fbcdn.net/v/t1.0-9/20729327_1168149799953296_8838092191541694934_n.jpg?_nc_cat=104&_nc_oc=AQmT313LRkvKv48lUd4VRdNJZc4YDo9rtGcGUbSSBzZs5aS33UB9O2_zue4PP57VrEkmjwScnDuktRnrRs7xIo9D&_nc_ht=scontent.fqsc1-1.fna&oh=9ce3152e54b88a4b0a6124039a9c90e1&oe=5D8F03D9',
        Title: 'Aulas de topologia básica',
        description: 'This is a test discription 2',
        Price: '60',
    },
    {
        ID: '2',
        Image: 'https://scontent.fqsc1-1.fna.fbcdn.net/v/t1.0-9/20729327_1168149799953296_8838092191541694934_n.jpg?_nc_cat=104&_nc_oc=AQmT313LRkvKv48lUd4VRdNJZc4YDo9rtGcGUbSSBzZs5aS33UB9O2_zue4PP57VrEkmjwScnDuktRnrRs7xIo9D&_nc_ht=scontent.fqsc1-1.fna&oh=9ce3152e54b88a4b0a6124039a9c90e1&oe=5D8F03D9',
        Title: 'Exercícios resolvidos de intergral',
        description: 'This is a test discription 3',
        Price: '25',
    },
    {
        ID: '3',
        Image: 'https://scontent.fqsc1-1.fna.fbcdn.net/v/t1.0-9/20729327_1168149799953296_8838092191541694934_n.jpg?_nc_cat=104&_nc_oc=AQmT313LRkvKv48lUd4VRdNJZc4YDo9rtGcGUbSSBzZs5aS33UB9O2_zue4PP57VrEkmjwScnDuktRnrRs7xIo9D&_nc_ht=scontent.fqsc1-1.fna&oh=9ce3152e54b88a4b0a6124039a9c90e1&oe=5D8F03D9',
        Title: 'Monitoria de Análise',
        description: 'This is a test discription 4',
        Price: '140',
    },
]

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
        username : 'Titulo Solicitação',
        telephone : 'Descrição bem grande o suficiente para usar todo o espaço disponível em preview limitado em espaço máximo e restrito!!!!!!!!!!!!!!!!!!!!!!!!!!',
        ExtraInfo : '',
        description: 'asdfsadfasdfasdf',
        email : 'XXXXX',
        maxprice: 'XXXXX',
        Userid : 0,
        Categoryid : 0,
    },
    {
        ID : 1,
        name : 'Aula de Cálculo Numérico',
        description : 'Correção de exercícios e revisão teórica. Aulas em grupos de 3 a 4 pessoas',
        ExtraInfo : '',
        minprice : '50',
        maxprice: '50',
        Userid : 0,
        categoryid : 1,
    },
    {
        ID : 2,
        name : 'Aula de Piano',
        description : 'Teoria da música, leitura de partituras e exercícios de dedo. Aprenda suas músicas favoritas!',
        ExtraInfo : '',
        minprice : '100',
        maxprice: '100',
        Userid : 0,
        Categoryid : 2,
    },
    {
        ID : 3,
        name : 'Tradução Chinês - Português',
        description : 'Tradução em chinês tradicional ou simplificado. Preço por página em português.',
        ExtraInfo : '',
        minprice : '30',
        maxprice: '30',
        Userid : 0,
        Categoryid : 3,
    },
    {
        ID : 4,
        name : 'Aula de Mandarim',
        description : 'Aula em grupos de 3. Aulas em mandarim (professor não fala português)',
        ExtraInfo : '',
        minprice : '80',
        maxprice: '80',
        Userid : 0,
        Categoryid : 2,
    },
    {
        ID : 4,
        name : 'Aula de Mandarim',
        description : 'Aula em grupos de 3. Aulas em mandarim (professor não fala português)',
        ExtraInfo : '',
        minprice : '80',
        maxprice: '80',
        Userid : 0,
        Categoryid : 1,
    },
    {
        ID : 4,
        name : 'Aula de Mandarim',
        description : 'Aula em grupos de 3. Aulas em mandarim (professor não fala português)',
        ExtraInfo : '',
        minprice : '80',
        maxprice: '80',
        Userid : 0,
        Categoryid : 3,
    },
    {
        ID : 4,
        name : 'Aula de Mandarim',
        description : 'Aula em grupos de 3. Aulas em mandarim (professor não fala português)',
        ExtraInfo : '',
        minprice : '80',
        maxprice: '80',
        Userid : 0,
        Categoryid : 2,
    },
    {
        ID : 4,
        name : 'Aula de Mandarim',
        description : 'Aula em grupos de 3. Aulas em mandarim (professor não fala português)',
        ExtraInfo : '',
        minprice : '80',
        maxprice: '80',
        Userid : 0,
        Categoryid : 5,
    },
]
import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, ScrollView } from 'react-native';

import UniStyles from '../constants/UniStyles'
import UniData from '../constants/UniData'
import Button from '../components/Button'

export default class OfferCardScreen extends React.Component {
    static navigationOptions = { header: null };

    state = {
        // use for store data
    }

    _onQuit() {
        alert('YOUR QUITTER!!!')
    }

    render() {

        const Images = (name) => {
            switch (name) {
                case 'exit': return require('../assets/icons/exit2.png');
            }
        };

        const QuitButton = () => (
            <TouchableOpacity activeOpacity={0.5} onPress={this._onQuit}>
                <Image
                    source={Images('exit')}
                    style={styles.extLoginIcon}
                />
            </TouchableOpacity>
        )

        return (
            <View style={{flexDirection: 'column'}}>
                <View style={{flexDirection: 'row', width: window.width, justifyContent: 'space-between', marginVertical: 15, marginHorizontal: 10}}>
                    <View style={{alignSelf: 'center', justifyContent: 'flex-start'}}>
                        <QuitButton/>
                    </View>
                    <Text>************ This is a test ************</Text>
                    <View style={{justifyContent: 'flex-end', backgroundColor: 'red'}} />
                </View>

                <View style={{flexDirection: 'row', width: window.width, justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'column', margin: 10, alignContent: 'center', justifyContent: 'center'}}>
                        <Image
                            source={Images('exit')}
                            style={[styles.extLoginIcon, {alignSelf: 'center', height: 130, width: 130}]}
                        />
                        <View style={{flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
                            <Text style={{textAlign: 'center'}}> Maior das categorias </Text>
                            <Text style={{textAlign: 'center'}}>R$ MIN - MAX</Text>
                        </View>
                    </View>
                    <Text style={{flex: 1, margin: 10}}>
                        Descrição bem grande o suficiente para usar todo o espaço disponível em preview limitado em espaço maximo e restrito
                        !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Esse espaço é ainda maior quando vc abre a solicitação
                        e faz com que mais informação importante seja dita.
                    </Text>
                </View>

                <View style={{flexDirection: 'column'}}>
                    <Text style={{textAlign: 'center'}}> Ofertas criadas à partir da sua solicitação </Text>
                    <ScrollView scrollEnabled={true}>
                        <OfferMiniCard/>
                        <OfferMiniCard/>
                        <OfferMiniCard/>
                        <OfferMiniCard/>
                        <OfferMiniCard/>
                    </ScrollView>
                </View>

                {/* <View style={{flexDirection: 'column'}}>
                    <Button/>
                    <Button/>
                    <Button/>
                </View> */}
            </View>
        );
    }
}


class OfferMiniCard extends React.Component {

    render() {

        const Images = (name) => {
            switch (name) {
                case 'exit': return require('../assets/icons/exit2.png');
            }
        };

        return(
            <View style={{flexDirection: 'row', width: window.width, justifyContent: 'space-between',
                borderBottomColor: '#ACACAC', borderBottomWidth: 2, marginHorizontal: 25, marginVertical: 0
            }}>
                <Image
                    source={Images('exit')}
                    style={[styles.extLoginIcon, {marginHorizontal: 20, marginVertical: 20, width: 50, height: 50, alignSelf: 'center'}]}
                />
                <View style={{flexDirection: 'column', flex: 1, justifyContent: 'flex-start'}}>
                    <Text style={{marginHorizontal: 20, marginVertical: 5, textAlign: 'left'}}> asdf </Text>
                    <Text style={{marginHorizontal: 20, marginVertical: 5, textAlign: 'left'}}> asdf </Text>
                    <Text style={{marginHorizontal: 20, marginVertical: 5, textAlign: 'left'}}> asdf </Text>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
    },
    textTitle: {

    },
    titleBarView: {
        flex: 1,
        flexDirection: 'row',
    },
    extLoginIcon: {
        width: 15,
        height: 15,
        resizeMode: 'stretch',
    },
});
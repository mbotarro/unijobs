"use strict";

import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, Picker, TouchableHighlight} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CheckBox  from 'react-native-check-box'
import { Header } from 'react-native-elements'
import { AsyncStorage } from 'react-native';

import Button from '../components/Button'
import UniColors from '../constants/UniColors'
import UniText from '../constants/UniText'

import UniData from '../constants/UniData'

import { loadCategories } from '../actions/FeedActions'
import { tryAddOffer } from '../actions/AddOfferRequestActions'

export default class AddSolicitationScreen extends React.Component {
    static navigationOptions = { header: null };

    state = {
        isLoading: true,

        title: '',

        categories: {},
        selectedCategoryId: 1,
        
        description: '',
        minPrice: '',
        maxPrice: '',
        checkedEmail:false,
        checkedTelefone:false,
        userid: '',
        date: '',
        info: '',
    }

    async componentDidMount(){
        try{
            const userid = parseInt(await AsyncStorage.getItem(UniData.userid));
            this.setState({userid: userid})

            loadCategories((categories) => {
                this.setState({categories: categories, isLoading: false})
            });
        } 
        catch (error) {
            console.log('Error retrieving data - AddOfferScreen')
        }
    };

    onAdd(){
        if (this.state.title == '')
            alert ('Título não pode ser vazio')
        else if (this.state.description == '')
            alert ('Descrição não pode ser vazia')
        else if (this.state.minPrice == '')
            alert('Preço mínimo é necessário')
        else if (parseInt(this.state.minPrice) > parseInt(this.state.maxPrice))
            alert('Preço mínimo deve ser menor que o máximo')
        else {
            var dateObj = new Date(this.state.date)
            if (!(dateObj instanceof Date) || isNaN(dateObj))
                alert('Data inválida')
            else
                tryAddOffer(this.state.userid,
                            this.state.title, 
                            this.state.selectedCategoryId,
                            this.state.description, 
                            parseInt(this.state.minPrice), 
                            parseInt(this.state.maxPrice),
                            this.state.checkedEmail,
                            this.state.checkedTelefone,
                            dateObj.toISOString(),
                            this.state.info,
                            () => {
                                this.leaveScreen(this.props.navigation)
                            }
                );
        }
    };

    
    leaveScreen(navigation) {
        this.setState({title: '', selectedCategoryId: this.state.categories[0].id,
            description: '', minPrice: '', maxPrice: '', checkedEmail: false, checkedTelefone: false,
            date: '', info: ''})
        navigation.goBack()
    }

    render() {
        const header = (
            <View style={styles.headerContainer} >
                <TouchableHighlight
                    underlayColor={UniColors.main}
                    onPress={() => this.leaveScreen(this.props.navigation)}
                >
                    <Image
                        source={require('../assets/icons/arrow-left.png')}
                        style={styles.backButton}
                    />
                </TouchableHighlight>
                <Text style={styles.headerText}>{'Adicionar Oferta'}</Text>
            </View>
        );
        
        const AddButton = () => (
            <Button
                text={'Adicionar'}
                buttonStyle={[{ marginTop: 26, marginBottom: 15 }, { paddingHorizontal: 18 }]}
                onPress={() => this.onAdd()}
            />
        );

        return (
            <View style={{ flex: 1 }}>
                { header }
                <KeyboardAwareScrollView
                    contentContainerStyle={{ flex: 1 }}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    scrollEnabled={true}
                >
                    <View style={styles.container}>

                        <View style={{ marginTop: 36 }}>
                            {/*Title Box*/}
                            <TextInput
                                style={styles.titleInput}
                                value={this.state.title}
                                multiline={false}
                                placeholder={'Título'}
                                onChangeText={(title) => this.setState({ title: title })}
                            />
                            <Picker
                                selectedValue={this.state.selectedCategoryId}
                                onValueChange={(itemValue, itemPosition) => { this.setState({ selectedCategoryId: itemValue }) }}
                                style={[styles.categoryBox, { marginTop: 30, overflow: 'hidden', height: 38, justifyContent: 'center', paddingVertical: 10 }]}
                                itemStyle={{ fontSize: UniText.big, fontWeight: UniText.semibold, color: UniColors.dark }}
                            >
                                {
                                    this.state.isLoading ? null :
                                        this.state.categories.map((cat, index) => (
                                            <Picker.Item key={index} label={cat.name.replace('.', ' ')} value={cat.id} />
                                        )
                                        )
                                }
                            </Picker>
                            {/*Description Box*/}
                            <Text style={[styles.title, { marginTop: 20 }]}> Descrição </Text>
                            <TextInput
                                style={[styles.descriptionInput, { marginTop: 5 }]}
                                value={this.state.description}
                                multiline={true}
                                autoCorrect={true}
                                onChangeText={(description) => this.setState({ description: description })}
                            />
                        </View>

                        {/*Price Boxes*/}
                        <View style={{ flexDirection: 'row', alignSelf: 'stretch', flexGrow: 1, marginTop: 25 }}>
                            <TextInput
                                style={[styles.priceInput]}
                                value={this.state.minPrice}
                                placeholder={'Preço Mínimo'}
                                autoCorrect={false}
                                onChangeText={(minPrice) => this.setState({ minPrice: minPrice })}
                                keyboardType={'numeric'}
                            />
                            <View style={{ width: 100 }} />
                            <TextInput
                                style={[styles.priceInput]}
                                value={this.state.maxPrice}
                                placeholder={'Preço Máximo'}
                                autoCorrect={false}
                                onChangeText={(maxPrice) => this.setState({ maxPrice: maxPrice })}
                                keyboardType={'numeric'}
                            />
                        </View>

                        {/*Contact Options*/}
                        <Text style={[styles.title, { marginTop: 25 }]}> Contato </Text>
                        <View style={[{ flexDirection: 'row' }, { marginTop: 10 }]}>
                            <CheckBox
                                style={{ marginLeft: 4 }}
                                onClick={() => this.setState({ checkedEmail: !this.state.checkedEmail })}
                                isChecked={this.state.checkedEmail}
                                checkedImage={<Image source={require('../assets/icons/checked.png')} />}
                                unCheckedImage={<Image source={require('../assets/icons/unchecked.png')} />}

                            />
                            <Text style={styles.contactLabel}> E-mail </Text>
                            <CheckBox
                                style={{ marginLeft: 50 }}
                                onClick={() => this.setState({ checkedTelefone: !this.state.checkedTelefone })}
                                isChecked={this.state.checkedTelefone}
                                checkedImage={<Image source={require('../assets/icons/checked.png')} />}
                                unCheckedImage={<Image source={require('../assets/icons/unchecked.png')} />}

                            />
                            <Text style={styles.contactLabel}> Telefone </Text>
                        </View>
                        {/*Date Box*/}
                        <TextInput
                            style={[styles.infoInput, { marginTop: 27 }]}
                            value = {this.state.date}
                            placeholder={'Data Limite (DD/MM/AA)'}
                            autoCorrect={false}
                            keyboardType={'numbers-and-punctuation'}
                            onChangeText={(date) => this.setState({ date: date })}
                        />
                        {/*Aditional Information Box*/}
                        <TextInput
                            style={[styles.infoInput, { marginTop: 10 }]}
                            value = {this.state.info}
                            placeholder={'Informações Adicionais'}
                            autoCorrect={true}
                            onChangeText={(info) => this.setState({ info: info })}
                        />
                        {/*Add Button*/}
                        <AddButton />
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}



const styles = StyleSheet.create({

    container: {
        alignContent: 'center',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        marginLeft: 28,
        marginRight: 28,
    },

    headerContainer: {
        zIndex:         1,
        justifyContent: 'space-between',
        flexDirection:  'row',
        alignSelf:      'stretch',
        backgroundColor:UniColors.main,
    },

    backButton: {
        marginTop:      38,
        marginLeft:     20,
        marginBottom:   14,
    },

    headerText: {
        marginTop:      35,
        flexGrow:       1,
        width:          0,

        fontSize:       25,
        color:          UniColors.white,
        fontWeight:     UniText.semibold,
        textAlign:      'center',
    },

    title:  {
        fontSize: 17,
        fontWeight: UniText.bold,
        color: UniColors.main,
    },

    contactLabel: {
        marginLeft: 10,
        fontSize: 15,
        color: UniColors.dark,
    },

    titleInput: {
        borderBottomWidth: 0.2, 
        borderBottomColor: UniColors.dark_grey,
        fontSize: UniText.big,
        fontWeight: UniText.regular,
        color: UniColors.dark,
    },

    descriptionInput: {
        borderColor:    '#F4F5F6',
        borderRadius:   17,
        backgroundColor: '#F4F5F6',
    
        height:     147,
        borderWidth: 10,
        paddingHorizontal: 10,

        alignSelf: 'stretch',

        fontSize:   UniText.normal,
        color:      UniColors.dark,
        textAlign:  'justify',
    },

    priceInput: {
        borderColor:    UniColors.dark_grey,
        borderRadius:   20,
        backgroundColor: '#F4F5F6',
    
        padding:    10,
        height:     40,

        alignSelf: 'stretch',
        flex: 1,
    
        fontSize:   UniText.normal,
        color:      UniColors.dark,
        textAlign:  'center',
    },

    categoryBox: {
        borderRadius:   25,
        backgroundColor: '#F4F5F6',
        alignSelf: 'stretch',
    },

    infoInput: {
        borderColor:    UniColors.dark_grey,
        borderRadius:   20,
        backgroundColor: '#F4F5F6',
    
        padding:    10,
        height:     40,

        alignSelf: 'stretch',
    
        fontSize:   UniText.normal,
        color:      UniColors.dark,
        textAlign:  'left',
    },
});

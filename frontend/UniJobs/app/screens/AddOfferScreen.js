"use strict";

import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, Picker, KeyboardAvoidingView} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CheckBox  from 'react-native-check-box'
import { Header } from 'react-native-elements'
import { AsyncStorage } from 'react-native';

import Button from '../components/Button'
import UniColors from '../constants/UniColors'
import UniText from '../constants/UniColors'

import { tryAddOffer } from '../actions/AddOfferRequestActions'

export default class AddSolicitationScreen extends React.Component {
    static navigationOptions = { header: null };

    state = {
        title: '',
        category: 'categoria',
        categoryIndex: 0,
        description: '',
        minPrice: '',
        maxPrice: '',
        checkedEmail:false,
        checkedTelefone:false,
        date: '',
        info: '',
    }

    onAdd(){

        var dateObj = new Date(this.state.date).toISOString();

        tryAddOffer(this.state.title.toLowerCase(), 
                    this.state.categoryIndex, 
                    this.state.description.toLowerCase(), 
                    Number(this.state.minPrice), 
                    Number(this.state.maxPrice),
                    this.state.checkedEmail,
                    this.state.checkedTelefone,
                    dateObj,
                    this.state.info.toLowerCase(),
                    );
 
        this.setState({title: '', category: 'categoria', description: '', minPrice: '', maxPrice: '', 
                       checkedEmail: false, checkedTelefone: false, date: '', info: ''});
        
        this.props.navigation.goBack();
    };

    render() {
        const { navigate } = this.props.navigation;

        const CategoryMenu = () => (
            <View style={[styles.categoryBox, {marginTop: 25}]}>
                <Picker
                    selectedValue={this.state.category}
                    onValueChange={(itemValue, itemPosition) =>  this.setState({category: itemValue, categoryIndex: itemPosition})}
                >   
                    <Picker.Item label='Categoria' value='categoria' />
                    <Picker.Item label='Aulas de Exatas' value='exatas'/>
                    <Picker.Item label='Aulas de Humanas' value='humanas'/>
                    <Picker.Item label='Aulas de Biológicas' value='biológicas'/>
                    <Picker.Item label='Aulas Extracurriculares' value='extra'/>
                    <Picker.Item label='Mudanças' value='mudanças'/>
                    <Picker.Item label='Domésticos' value='domésticos'/>
                    <Picker.Item label='Entrega' value='entrega'/>
                    <Picker.Item label='PetCare' value='petcare'/>
                    <Picker.Item label='Cuidador de Idosos' value='cuidador'/>
                    <Picker.Item label='Culinária' value='culinária'/>
                    <Picker.Item label='Outros' value='outros'/>
                </Picker>
            </View>
        );

        const ContactOptionEmail = () => (
            <CheckBox
                style={{marginLeft: 4}}
                onClick={() => this.setState({checkedEmail:!this.state.checkedEmail})}
                isChecked={this.state.checkedEmail}
                checkedImage={<Image source={require('../assets/icons/checked.png')}/>}
                unCheckedImage={<Image source={require('../assets/icons/unchecked.png')}/>}
                
            />
        );

        const ContactOptionTelefone = () => (
            <CheckBox
                style={{marginLeft: 50}}
                onClick={() => this.setState({checkedTelefone:!this.state.checkedTelefone})}
                isChecked={this.state.checkedTelefone}
                checkedImage={<Image source={require('../assets/icons/checked.png')}/>}
                unCheckedImage={<Image source={require('../assets/icons/unchecked.png')}/>}
                
            />
        );

        const AddButton = () => (
            <Button
                text={'Adicionar'}
                buttonStyle={[{ marginTop: 15, marginBottom: 10}, { paddingHorizontal: 18}]}
                onPress={() => this.onAdd()}
            />
        );

        return (
            <KeyboardAvoidingView behavior='padding'>
                <Header 
                    backgroundColor={UniColors.main}
                    leftComponent={{ icon: 'navigate-before', color: '#FFFFFF', onPress: () => this.props.navigation.goBack() }}
                    centerComponent={{text: 'Adicionar Oferta', style: styles.headerText}}
                />  

                <View style={styles.container}>

                    <View style={{marginTop: 20}}>
                        {/*Title Box*/}
                        <TextInput
                            style={styles.titleInput} 
                            multiline={true}
                            placeholder={'Título'}
                            onChangeText = {(title) => this.state.title = title}
                        />
                        <CategoryMenu />
                        {/*Description Box*/}
                        <Text style={[styles.title, {marginTop: 15}]}> Descrição </Text>
                        <TextInput
                            style = {[styles.descriptionInput, {textAlignVertical: 'top'}, {marginTop: 5}]}
                            multiline = {true}
                            autoCorrect = {true}
                            onChangeText={(description) => this.setState({description})}
                        /> 
                    </View>

                    {/*Price Boxes*/}
                    <View style = {{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        <TextInput
                            style = {[styles.infoInput, {marginTop: 25}]}
                            placeholder = {'Preço Mínimo'}
                            autoCorrect = {false}
                            onChangeText = {(minPrice) => this.state.minPrice = minPrice}
                        />
                        <TextInput
                            style = {[styles.infoInput, {marginTop: 25}]}
                            placeholder = {'Preço Máximo'}
                            autoCorrect = {false}
                            onChangeText = {(maxPrice) => this.state.maxPrice = maxPrice}
                        />
                    </View>
                    
                    {/*Contact Options*/}
                    <Text style={[styles.title, {marginTop: 15}]}> Contato </Text>
                    <View style = {[{flexDirection: 'row'}, {marginTop: 10}]}>           
                        <ContactOptionEmail />
                        <Text style={styles.contactLabel}> E-mail </Text>
                        <ContactOptionTelefone />
                        <Text style={styles.contactLabel}> Telefone </Text>
                    </View>

                    <View>
                        {/*Date Box*/}
                        <TextInput
                            style = {[styles.infoInput, {marginTop: 15}]}
                            placeholder = {'Data Limite (DD/MM/AA)'}
                            autoCorrect = {false}
                            onChangeText = {(date) => this.state.date = date}
                        />
                        {/*Aditional Information Box*/}
                        <TextInput
                            style = {[styles.infoInput, {marginTop: 10}]}
                            placeholder = {'Informações Adicionais'}
                            autoCorrect = {false}
                            onChangeText = {(info) => this.state.info = info}
                        />
                    </View>

                    {/*Add Button*/}
                    <AddButton />
                    
                </View>
            </KeyboardAvoidingView>
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

    headerText: {
        fontSize: 20,
        color: UniColors.white,
        fontWeight: 'bold',
    },

    title:  {
        fontSize: 17,
        fontWeight: 'bold',
        color: UniColors.main,
    },

    contactLabel: {
        fontSize: 15,
        color: UniColors.dark,
    },

    titleInput: {
        borderBottomWidth: 0.2, 
        borderBottomColor: UniColors.dark_grey,
        fontSize: UniText.nomral,
        color: UniColors.dark,
    },

    descriptionInput: {
        borderColor:    UniColors.dark_grey,
        borderRadius:   17,
        backgroundColor: '#F4F5F6',
    
        height:     147,
        padding:    10,

        alignSelf: 'stretch',

        fontSize:   UniText.normal,
        color:      UniColors.dark,
        textAlign:  'left',
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

    categoryBox: {
        borderRadius:   25,
        backgroundColor: '#F4F5F6',
        alignSelf: 'stretch',
    },
});

"use strict";

import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, Picker, KeyboardAvoidingView} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CheckBox  from 'react-native-check-box'
import { Header } from 'react-native-elements'
import { AsyncStorage } from 'react-native';

import Button from '../components/Button'
import UniColors from '../constants/UniColors'
import UniText from '../constants/UniText'


export default class AddSolicitationScreen extends React.Component {
    static navigationOptions = { header: null };

    state = {
        checkedemail:false,
        checkedtelefone:false,
        title: '',
        category: 'categoria',
        categoryIndex: 0,
        description: '',
        price: '',
        date: '',
        info: '',
    }

    onAdd(navigate){
        navigate('AddSolicitation');
    }

    onBack(navigate){
        navigate('AddSolicitation');
    }

    render() {
        const { navigate } = this.props.navigation;

        const CategoryMenu = () => (
                <Picker
                    selectedValue={this.state.category}
                    onValueChange={(itemValue, itemPosition) =>  this.setState({category: itemValue, categoryIndex: itemPosition})}
                    style={[styles.categoryBox, {marginTop: 25, overflow: 'hidden', height: 40, justifyContent: 'center', paddingVertical: 10}]}
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
        );

        const ContactOptionEmail = () => (
            <CheckBox
                style={{marginLeft: 4}}
                onClick={() => this.setState({checkedemail:!this.state.checkedemail})}
                isChecked={this.state.checkedemail}
                checkedImage={<Image source={require('../assets/icons/checked.png')}/>}
                unCheckedImage={<Image source={require('../assets/icons/unchecked.png')}/>}
                
            />
        );

        const ContactOptionTelefone = () => (
            <CheckBox
                style={{marginLeft: 50}}
                onClick={() => this.setState({checkedtelefone:!this.state.checkedtelefone})}
                isChecked={this.state.checkedtelefone}
                checkedImage={<Image source={require('../assets/icons/checked.png')}/>}
                unCheckedImage={<Image source={require('../assets/icons/unchecked.png')}/>}
                
            />
        );

        const AddButton = () => (
            <Button
                text={'Adicionar'}
                buttonStyle={[{ marginTop: 15, marginBottom: 10}, { paddingHorizontal: 18}]}
                onPress={() => this.onAdd(navigate)}
            />
        );

        return (
            <KeyboardAvoidingView behavior='padding'>
                <Header 
                    backgroundColor={UniColors.main}
                    leftComponent={{ icon: 'navigate-before', color: '#FFFFFF', onPress: () => this.onBack(navigate) }}
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
                        {/*Price Box*/}
                        <TextInput
                            style = {[styles.infoInput, {marginTop: 10}]}
                            placeholder = {'Valor'}
                            autoCorrect = {false}
                            onChangeText = {(price) => this.state.price = price}
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
                    <View>
                        <AddButton />
                    </View>
                    
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
        fontWeight: UniText.semibold,
    },

    title:  {
        fontSize: 17,
        fontWeight: UniText.bold,
        color: UniColors.main,
    },

    contactLabel: {
        fontSize: 15,
        color: UniColors.dark,
    },

    titleInput: {
        borderBottomWidth: 0.2, 
        borderBottomColor: UniColors.dark_grey,
        fontSize: UniText.big,
        fontWeight: UniText.semibold,
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

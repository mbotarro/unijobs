"use strict";

import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, Picker, KeyboardAvoidingView} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CheckBox from 'react-native-check-box';
import { Header } from 'react-native-elements';
import { AsyncStorage } from 'react-native';

import Button from '../components/Button'
import UniColors from '../constants/UniColors'
import UniText from '../constants/UniText'
import UniData from '../constants/UniData'

import { loadCategories } from '../actions/FeedActions'
import { tryAddRequest } from '../actions/AddOfferRequestActions'


export default class AddSolicitationScreen extends React.Component {
    static navigationOptions = { header: null };

    state = {
        isLoading: true,

        title: '',

        categories: {},
        selectedCategoryId: 0,
        
        description: '',
        minPrice: '',
        maxPrice: '',
        checkedEmail:false,
        checkedTelefone:false,
        userid: '',
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
            console.log('Error retrieving data - AddRequestScreen')
        }
    };

    onAdd(){
        tryAddRequest(this.state.userid,
                      this.state.title.toLowerCase(), 
                      this.state.categoryIndex, 
                      this.state.description.toLowerCase(), 
                      Number(this.state.minPrice), 
                      Number(this.state.maxPrice),
                      () => {
                        this.setState({title: '', category: 'categoria', description: '', minPrice: '', maxPrice: '', 
                                       checkedEmail: false, checkedTelefone: false});
                        this.props.navigation.goBack();
                      }
        );   
    };

    render() {
        const { navigate } = this.props.navigation;

        if (this.state.isLoading) return null

        const CategoryMenu = () => (
            <View style={[styles.categoryBox, {marginTop: 25}]}>
                <Picker
                    selectedValue={this.state.category}
                    onValueChange={(itemValue, itemPosition) =>  this.setState({selectedCategoryId: itemValue})}
                >      
                    { 
                        this.state.categories.map((cat, index) => (
                            <Picker.Item label={cat.name.replace('.', ' ')} value={index} key = {index} />
                        ))
                    }
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
                buttonStyle={[{ marginTop: 15, marginBottom: 15}, { paddingHorizontal: 18}]}
                onPress={() => this.onAdd()}
                //onPress={() => this.props.navigation.goBack()}
            />
        );

        return (
            <KeyboardAvoidingView behavior='padding'>    
                
                <Header 
                    backgroundColor={UniColors.main}
                    leftComponent={{ icon: 'navigate-before', color: '#FFFFFF', onPress: () => this.props.navigation.goBack() }}
                    centerComponent={{text: 'Adicionar Solicitação', style: styles.headerText}}
                />           
                               
                <View style={styles.container}>
                    
                    <View style = {{marginTop: 25}}>
                        {/*Title Box*/}
                        {/* <Text> {this.state.title} </Text> */}
                        <TextInput
                            style={styles.titleInput} 
                            multiline={true}
                            placeholder={'Título'}
                            onChangeText = {(title) => this.state.title = title}
                        />
                        {/* <Text> {this.state.categoryIndex} </Text> */}
                        <CategoryMenu /> 
                        {/*Description Box*/}
                        {/* <Text> {this.state.description} </Text> */}
                        <Text style={[styles.title, {marginTop: 25}]}> Descrição </Text>
                        <TextInput
                            style = {[styles.descriptionInput, {textAlignVertical: 'top'}, {marginTop: 5}]}
                            multiline = {true}
                            autoCorrect = {true}
                            onChangeText={(description) => this.setState({description})}
                        />
                    </View>

                    {/*Price Boxes*/}
                    {/* <Text> {this.state.minPrice} </Text>
                    <Text> {this.state.maxPrice} </Text> */}
                    <View style = {{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        <TextInput
                            style = {[styles.priceInput, {marginTop: 25}]}
                            placeholder = {'Preço Mínimo'}
                            autoCorrect = {false}
                            onChangeText = {(minPrice) => this.state.minPrice = minPrice}
                        />
                        <TextInput
                            style = {[styles.priceInput, {marginTop: 25}]}
                            placeholder = {'Preço Máximo'}
                            autoCorrect = {false}
                            onChangeText = {(maxPrice) => this.state.maxPrice = maxPrice}
                        />
                    </View>
                    
                    {/*Contact Options*/}
                    {/* <Text> {(this.state.checkedEmail).toString()} </Text> */}
                    {/* <Text> {(this.state.checkedTelefone).toString()} </Text> */}
                    <Text style={[styles.title, {marginTop: 25}]}> Contato </Text>
                    <View style = {[{flexDirection: 'row'}, {marginTop: 10}]}>           
                        <ContactOptionEmail />
                        <Text style={styles.contactLabel}> E-mail </Text>
                        <ContactOptionTelefone />
                        <Text style={styles.contactLabel}> Telefone </Text>
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

    priceInput: {
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

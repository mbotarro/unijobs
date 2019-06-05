import React from 'react'
import { StyleSheet, Text, View, Image,TouchableHighlight } from 'react-native'
import { NavigationActions } from 'react-navigation'
import UniStyles from '../constants/UniStyles'
import UniColors from '../constants/UniColors'
import UniData from '../constants/UniData'
import Button from '../components/Button'
import { AsyncStorage } from 'react-native';
export default class SideDrawer extends React.Component {
    static navigationOptions = { header: null}
    state = {
        username: '',
    }

    async componentDidMount() {
        try {
            const username = await AsyncStorage.getItem(UniData.username);
            if (username !== null)
                this.setState({ username: username });
        } catch (error) {
        }
    }


    /* components callbacks */
    onUserOptions(navigate){
        navigate('UserOptions')
    }
    onMinhasOfertas(navigate) {
        navigate('MyOffers')
    }
    onMinhasSolicitacoes(navigate) {
        navigate('MyRequests')
    }

    onHistoricoInteresses(navigate) {
        navigate('MyInterests')
    }

    onConfiguracoes(navigate) {
        navigate('Settings')
    }

    onSair(navigate) {
        alert("TODO : Logout do Usuario");
        navigate('Login')
    }


    render(){
        const { navigate } = this.props.navigation;
        // SideMenu Components
        const Header = () => {
            return (
                <TouchableHighlight
                    onPress={() => this.onUserOptions(navigate)}
                    //underlayColor={UniColors.light}
                >
                    <View style={styles.headerContent}>
                        
                        <Image style={[UniStyles.useravatar,{marginLeft: 15}]} source={require('../assets/icons/user.png')}/>
                        <Text style={[UniStyles.username,{marginLeft: 15}]}>
                            usuário
                        </Text>
                        <Text style={[UniStyles.username,{marginLeft: 15}]}>
                            {this.state.username}
                        </Text>
                        
                    </View>
                </TouchableHighlight>
            )
        };
        const MinhasOfertas = () => (
            <View style={{flexDirection: 'row', flex: 1,marginTop :15 ,marginBottom:5,alignContent:'flex-start'}}>
                <Image style={[UniStyles.icons,{marginLeft: 15}]} source={require('../assets/icons/gift.png')}/>
                <Button
                    text='Minhas ofertas'
                    buttonStyle={[{backgroundColor:'transparent'}]}
                    onPress={() => this.onMinhasOfertas(navigate)}
                />
            </View>
        )
        const MinhasSolicitacoes = () => (
            <View style={{flexDirection: 'row', flex: 1,marginTop :5 ,marginBottom:5}}>
                <Image style={[UniStyles.icons,{marginLeft: 15}]} source={require('../assets/icons/clipboards.png')}/>
                <Button
                    text='Minhas solicitações'
                    buttonStyle={[{backgroundColor:'transparent'}]}
                    onPress={() => this.onMinhasSolicitacoes(navigate)}
                />
            </View>
        )
        const HistoricoInteresses = () => (
            <View style={{flexDirection: 'row', flex: 1,marginTop :5 ,marginBottom:5}}>
                <Image style={[UniStyles.icons,{marginLeft: 15}]} source={require('../assets/icons/history.png')}/>
                <Button
                    text='Histórico de interesses'
                    buttonStyle={[{backgroundColor:'transparent'}]}
                    onPress={() => this.onHistoricoInteresses(navigate)}
                />
            </View>
            
    
        )
        const Configuracoes = () => (
            <View style={{flexDirection: 'row', flex: 1,marginTop :5 ,marginBottom:5}}>
                <Image style={[UniStyles.icons,{marginLeft: 15}]} source={require('../assets/icons/settings.png')}/>
                <Button
                    text='Configurações'
                    buttonStyle={[{backgroundColor:'transparent'}]}
                    onPress={() => this.onConfiguracoes(navigate)}
                />
            </View>
        )
        const Sair = () => (
            <View style={{flexDirection: 'row', flex: 1,marginTop :180 ,marginBottom:10}}>
                <Image style={[UniStyles.icons,{marginLeft: 15}]} source={require('../assets/icons/return.png')}/>
                <Button
                    text='Sair'
                    buttonStyle={[{ paddingHorizontal: 18, backgroundColor:'transparent' }]}
                    onPress={() => this.onSair(navigate)}
                />
            </View>
        )
        return(
            <View style={styles.SideDrawercontainer}>
                <Header/>
                <MinhasOfertas/>
                <MinhasSolicitacoes/>
                <HistoricoInteresses/>
                <Configuracoes/>
                <Sair/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    SideDrawercontainer: {
      flex: 1,
      backgroundColor: UniColors.dark,
    },
    DrawerItem: {
      fontSize: 18,
      fontWeight: 'bold',
      color: UniColors.dark_grey ,
      padding: 15,
      margin: 5,
      borderRadius: 2,
      borderColor: UniColors.dark,
      borderWidth: 1,
      textAlign: 'center'
    },
    headerContent:{
        backgroundColor: UniColors.main,
        padding:18,
        //alignItems: 'center',
      },
  })

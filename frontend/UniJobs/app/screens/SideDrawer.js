import React from 'react'
import { StyleSheet, Text, View, Image,TouchableHighlight } from 'react-native'
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
        navigate('MinhasOfertas')
    }
    onMinhasSolicitacoes(navigate) {
        navigate('MinhasSolicitacoes')
    }

    onHistoricoInteresses(navigate) {
        navigate('HistoricoInteresses')
    }

    onConfiguracoes(navigate) {
        navigate('Configuracoes')
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
                        <Image style={[UniStyles.useravatar]} source={require('../assets/icons/user.png')}/>
                        <View style={[{flexDirection: 'column',paddingTop:28}]}>
                            <Text style={[UniStyles.username]}>
                                usuário
                            </Text>
                            <Text style={[UniStyles.username]}>
                                {this.state.username}
                            </Text>
                        </View>
                    </View>
                </TouchableHighlight>
            )
        }; 
        const MinhasOfertas = () => (
            <View style={styles.DrawerItem}>
                <Image style={UniStyles.icons} source={require('../assets/icons/gift.png')}/>
                <Button
                    text='Minhas ofertas'
                    buttonStyle={[{backgroundColor:'transparent'}]}
                    onPress={() => this.onMinhasOfertas(navigate)}
                />
            </View>
        )
        const MinhasSolicitacoes = () => (
            <View style={styles.DrawerItem}>
                <Image style={UniStyles.icons} source={require('../assets/icons/clipboards.png')}/>
                <Button
                    text='Minhas solicitações'
                    buttonStyle={[{backgroundColor:'transparent'}]}
                    onPress={() => this.onMinhasSolicitacoes(navigate)}
                />
            </View>
        )
        const HistoricoInteresses = () => (
            <View style={styles.DrawerItem}>
                <Image style={UniStyles.icons} source={require('../assets/icons/history.png')}/>
                <Button
                    text='Histórico de interesses'
                    buttonStyle={[{backgroundColor:'transparent'}]}
                    onPress={() => this.onHistoricoInteresses(navigate)}
                />
            </View>
            
    
        )
        const Configuracoes = () => (
            <View style={styles.DrawerItem}>
                <Image style={UniStyles.icons} source={require('../assets/icons/settings.png')}/>
                <Button
                    text='Configurações'
                    textStyle = {{alignSelf:  'center'}}
                    buttonStyle={[{backgroundColor:'transparent'}]}
                    onPress={() => this.onConfiguracoes(navigate)}
                />
            </View>
        )
        const Sair = () => (
            <View style={[styles.DrawerItem,{marginTop:260}]}>
                <Image style={UniStyles.icons} source={require('../assets/icons/return.png')}/>
                <Button
                    text='Sair'
                    buttonStyle={{backgroundColor:'transparent' }}
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
        height: 40,
        flexDirection: 'row',
        marginTop :15 ,
        marginBottom:15,
        alignContent:'flex-start', //pack flex itens from the start
        alignItems:'center',
    },
    headerContent:{
        flexDirection: 'row',
        backgroundColor: UniColors.main,
        paddingTop: 20,
        alignItems:'flex-start', //set the alignSelf for all children
      },
  })

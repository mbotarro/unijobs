import React from 'react'
import { StyleSheet, Text, View, Image,TouchableHighlight } from 'react-native'
import { NavigationActions } from 'react-navigation'
import UniStyles from '../constants/UniStyles'
import UniColors from '../constants/UniColors'
import Button from '../components/Button'

export default class SideDrawer extends React.Component {
    static navigationOptions = { header: null}
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
                    underlayColor={UniColors.light}
                >
                    <View style={styles.headerContent}>
                        <Image style={UniStyles.useravatar} source={require('../assets/icons/user.png')}/>
                        
                        <Text style={UniStyles.username}>
                            Usuário
                        </Text>
                        
                    </View>
                </TouchableHighlight>
            )
        };
        const MinhasOfertas = () => (
            <Button
                text='Minhas ofertas'
                buttonStyle={[{ marginTop: 15, marginBottom: 10 },{width:250},{backgroundColor:'transparent'}]}
                onPress={() => this.onMinhasOfertas(navigate)}
            />
        )
        const MinhasSolicitacoes = () => (
            <Button
                text='Minhas solicitações'
                buttonStyle={[{ marginTop: 10, marginBottom: 10 },{width:250},{backgroundColor:'transparent'}]}
                onPress={() => this.onMinhasSolicitacoes(navigate)}
            />
        )
        const HistoricoInteresses = () => (
            <Button
                text='Histórico de interesses'
                buttonStyle={[{ marginTop: 10, marginBottom: 10 },{width:250},{backgroundColor:'transparent'}]}
                onPress={() => this.onHistoricoInteresses(navigate)}
            />
        )
        const Configuracoes = () => (
            <Button
                text='Configurações'
                buttonStyle={[{ marginTop: 10, marginBottom: 10 },{width:250},{backgroundColor:'transparent'}]}
                onPress={() => this.onConfiguracoes(navigate)}
            />
        )
        const Sair = () => (
            <Button
                text='Sair'
                buttonStyle={[{ marginTop: 180}, { paddingHorizontal: 18 }]}
                onPress={() => this.onSair(navigate)}
            />
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
        padding:30,
        alignItems: 'center',
      },
  })

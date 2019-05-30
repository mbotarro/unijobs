import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { NavigationActions } from 'react-navigation'
import UniStyles from '../constants/UniStyles'
import UniColors from '../constants/UniColors'
import Button from '../components/Button'

export default class SideDrawer extends React.Component {
    static navigationOptions = { header: null }
    
    /* components callbacks */
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
        const MinhasOfertas = () => (
            <Button
                text='Minhas ofertas'
                buttonStyle={[{ marginTop: 15, marginBottom: 10 },{width:250}]}
                onPress={() => this.onMinhasOfertas(navigate)}
            />
        )
        const MinhasSolicitacoes = () => (
            <Button
                text='Minhas solicitações'
                buttonStyle={[{ marginTop: 10, marginBottom: 10 },{width:250}]}
                onPress={() => this.onMinhasSolicitacoes(navigate)}
            />
        )
        const HistoricoInteresses = () => (
            <Button
                text='Histórico de interesses'
                buttonStyle={[{ marginTop: 10, marginBottom: 10 },{width:250}]}
                onPress={() => this.onHistoricoInteresses(navigate)}
            />
        )
        const Configuracoes = () => (
            <Button
                text='Configurações'
                buttonStyle={[{ marginTop: 10, marginBottom: 10 },{width:250}]}
                onPress={() => this.onConfiguracoes(navigate)}
            />
        )
        const Sair = () => (
            <Button
                text='Sair'
                buttonStyle={[{ marginTop: 150 , marginBottom: 10 }, { paddingHorizontal: 18 }]}
                onPress={() => this.onSair(navigate)}
            />
        )
        return(
            <View >
                <View style={styles.headerContent}>
                    <Image style={UniStyles.useravatar} source={require('../assets/icons/user.png')}/>
                    
                    <Text style={UniStyles.username}>
                        Usuário
                    </Text>
                </View>
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
    container: {
      flex: 1,
      backgroundColor: '#f6f6f6',
      paddingTop: 40,
      paddingHorizontal: 20
    },
    /*
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
    },*/
    headerContent:{
        backgroundColor: UniColors.main,
        padding:30,
        alignItems: 'center',
      },
  })

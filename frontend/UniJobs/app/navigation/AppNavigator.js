import { createStackNavigator, createAppContainer, createDrawerNavigator, createBottomTabNavigator } from "react-navigation"
import UniStyles from "../constants/UniStyles"
import UniColors from "../constants/UniColors"

import FeedOfertasScreen from "../screens/FeedOfertasScreen"
import FeedSolicitacoesScreen from "../screens/FeedSolicitacoesScreen"

import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"
import SideDrawer from "../screens/SideDrawer"

import UserOptionsScreen from "../screens/UserOptionsScreen"
import MinhasOfertasScreen from "../screens/MinhasOfertasScreen"
import MinhasSolicitacoesScreen from "../screens/MinhasSolicitacoesScreen"
import HistoricoInteressesScreen from "../screens/HistoricoInteressesScreen"
import ConfiguracoesScreen from "../screens/ConfiguracoesScreen"

const TabNavigator = createBottomTabNavigator(
{
    //Screens that contain drawer and bottomtab 
    Ofertas:{screen: FeedOfertasScreen},
    Solicitacoes: {screen: FeedSolicitacoesScreen},
},
{
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
        activeTintColor: UniColors.main,
        activeBackgroundColor: UniColors.white,
        inactiveTintColor: UniColors.dark_grey,
        inactiveBackgroundColor: UniColors.white,
        labelStyle: {
            fontSize: 16,
            padding: 10
        }
    },
})

const DrawerStack = createDrawerNavigator(
{
    //Screens that only contain drawer 
    MinhasOfertas:{screen: MinhasOfertasScreen},
    MinhasSolicitacoes:{screen: MinhasSolicitacoesScreen},
    HistoricoInteresses:{screen: HistoricoInteressesScreen},
    Configuracoes:{screen:ConfiguracoesScreen},
    UserOptions:{screen:UserOptionsScreen},
    TabStack:{screen: TabNavigator},
}, 
{   
    initialRouteName: 'TabStack',
    contentComponent: SideDrawer,
})

const LoginStack = createStackNavigator({
    //Screen without Drawer and bottomTab  
    Login: { screen: LoginScreen },
    Register: {screen: RegisterScreen},
})


//Navigator of all the Screens of the App
const AppNavigator = createStackNavigator({
    loginStack: {screen: LoginStack,},
    drawerStack: {screen: DrawerStack,}
},{
    //initialRouteName:'drawerStack',
    //Default config for all screens
    headerMode:'none', //remove blank header with return button
})

export default createAppContainer(AppNavigator)

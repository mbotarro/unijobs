import { createStackNavigator, createAppContainer, createDrawerNavigator, createBottomTabNavigator } from "react-navigation"




import FeedOfertasScreen from "../screens/FeedOfertasScreen"
import FeedSolicitacoesScreen from "../screens/FeedSolicitacoesScreen"


import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"
import SideDrawer from "../screens/SideDrawer"

import MinhasOfertasScreen from "../screens/MinhasOfertasScreen"
import MinhasSolicitacoesScreen from "../screens/MinhasSolicitacoesScreen"
import HistoricoInteressesScreen from "../screens/HistoricoInteressesScreen"
import ConfiguracoesScreen from "../screens/ConfiguracoesScreen"
//import TabNavigator from "./TabNavigator"

const LoginStack = createStackNavigator({
    //Screen without Drawer and bottomTab  
    Login: { screen: LoginScreen },
    Register: {screen: RegisterScreen},
})

const TabNavigator = createBottomTabNavigator(
{
    //Screens that contain drawer and bottomtab 
    FeedOfertas:{screen: FeedOfertasScreen},
    FeedSolicitacoes: {screen: FeedSolicitacoesScreen},
},
{
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
        activeTintColor: 'tomato',
        activeBackgroundColor: 'darkgreen',
        inactiveTintColor: 'white',
        inactiveBackgroundColor: 'green',
        labelStyle: {
            fontSize: 16,
            padding: 10
        }
        },
        initialRouteName: 'FeedOfertas',
})

const DrawerStack = createDrawerNavigator(
{
    //Screens that only contain drawer 
    MinhasOfertas:{screen: MinhasOfertasScreen},
    MinhasSolicitacoes:{screen: MinhasSolicitacoesScreen},
    HistoricoInteresses:{screen: HistoricoInteressesScreen},
    Configuracoes:{screen:ConfiguracoesScreen},
    TabStack:{screen: TabNavigator},
}, 
{
    contentComponent: SideDrawer,
})

//Navigator of all the Screens of the App
const AppNavigator = createStackNavigator({
    loginStack: {screen: LoginStack,},
    drawerStack: {screen: DrawerStack,}
},{
    //Default config for all screens
    headerMode:'none', //remove blank header with return button
})

export default createAppContainer(AppNavigator)

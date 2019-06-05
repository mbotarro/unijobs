import { createStackNavigator, createAppContainer, createDrawerNavigator, createBottomTabNavigator } from "react-navigation"
import UniStyles from "../constants/UniStyles"
import UniColors from "../constants/UniColors"

import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"
import SideDrawer from "../screens/SideDrawer"

import UserOptionScreen from "../screens/UserOptionScreen"
import MyOfferScreen from "../screens/MyOfferScreen"
import MyRequestScreen from "../screens/MyRequestScreen"
import MyInterestScreen from "../screens/MyInterestScreen"
import SettingScreen from "../screens/SettingScreen"

import FeedNavigator from  "./FeedNavigator"



const DrawerStack = createDrawerNavigator(
{
    //Screens that only contain drawer 
    MyOffers: { screen: MyOfferScreen },
    MyRequests: { screen: MyRequestScreen },
    MyInterests: { screen: MyInterestScreen },
    Settings: { screen:SettingScreen },
    UserOptions: { screen:UserOptionScreen },
    TabStack: {
        screen: FeedNavigator,
        navigationOptions: { header: null },
    },
},
{   
    initialRouteName: 'TabStack',
    contentComponent: SideDrawer,
})

const LoginStack = createStackNavigator({
    Login: { screen: LoginScreen },
    Register: { screen: RegisterScreen },
})


//Navigator of all the Screens of the App
const AppNavigator = createStackNavigator({
    loginStack: { screen: LoginStack },
    drawerStack: { screen: DrawerStack }
},{
    //initialRouteName:'drawerStack',
    //Default config for all screens
    headerMode:'none', //remove blank header with return button
})

export default createAppContainer(AppNavigator)

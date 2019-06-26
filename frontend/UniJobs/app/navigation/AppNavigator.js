import { createStackNavigator, createAppContainer, createDrawerNavigator, createBottomTabNavigator } from "react-navigation"

import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"
import SideDrawer from "../screens/SideDrawer"

import UserOptionScreen from "../screens/UserOptionScreen"
import MyOfferScreen from "../screens/MyOfferScreen"
import MyRequestScreen from "../screens/MyRequestScreen"
import MyInterestScreen from "../screens/MyInterestScreen"
import SettingScreen from "../screens/SettingScreen"
import AddOfferScreen from "../screens/AddOfferScreen"
import AddRequestScreen from "../screens/AddRequestScreen"

import FeedNavigator from  "./FeedNavigator"
import TestScreen from "../screens/TestScreen";



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
    AddOffer: { screen: AddOfferScreen },
    AddRequest: { screen: AddRequestScreen },
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
    drawerStack: { screen: DrawerStack },
},{
    //initialRouteName:'drawerStack',
    //Default config for all screens
    headerMode:'none', //remove blank header with return button
})

export default createAppContainer(AppNavigator)

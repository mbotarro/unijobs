import { createStackNavigator, createAppContainer } from "react-navigation";

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import TestScreen from "../screens/TestScreen";
import OfferCardScreen from "../screens/OfferCardScreen";

const AppNavigator = createStackNavigator({
    // Only for testing
    Test: {
        screen: OfferCardScreen,
    },
    Login: {
        screen: LoginScreen,
    },
    Home: {
        screen: HomeScreen,
    }
},{
    headerMode: 'none',
});

export default createAppContainer(AppNavigator);
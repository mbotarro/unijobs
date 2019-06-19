import { createStackNavigator, createAppContainer } from "react-navigation";

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import AddSolicitationScreen from "../screens/AddSolicitationScreen"
import AddOfferScreen from "../screens/AddOfferScreen"

const AppNavigator = createStackNavigator({
    AddSolicitation: {
      screen: AddSolicitationScreen,
    },
    AddOffer: {
      screen: AddOfferScreen,
    },
    Login: {
        screen: LoginScreen,
    },
    Home: {
        screen: HomeScreen,
    }

});

export default createAppContainer(AppNavigator);

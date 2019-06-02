import { createStackNavigator, createAppContainer } from "react-navigation";

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import TestScreen from "../screens/TestScreen";

const AppNavigator = createStackNavigator({
    // Only for testing
    Test: {
        screen: TestScreen,
    },
    Login: {
        screen: LoginScreen,
    },
    Home: {
        screen: HomeScreen,
    },
});

export default createAppContainer(AppNavigator);
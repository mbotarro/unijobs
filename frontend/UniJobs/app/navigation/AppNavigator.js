import { createStackNavigator, createAppContainer } from "react-navigation";

import LoginScreen from "../screens/LoginScreen";
import TabsNav from "./TabsNav"

const AppNavigator = createStackNavigator({
    Login: {
        screen: LoginScreen,
    },
    Home: {
        screen: TabsNav,
    },
});

export default createAppContainer(AppNavigator);
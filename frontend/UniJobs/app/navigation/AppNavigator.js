import { createStackNavigator, createAppContainer } from "react-navigation";

import LoginScreen from "../screens/LoginScreen";
import FeedNavigator from "./FeedNavigator";

const AppNavigator = createStackNavigator({
    // Only for testing
    Feed: {
        screen: FeedNavigator,
        navigationOptions: { header: null },
    },

    Login: {
        screen: LoginScreen,
    },
});

export default createAppContainer(AppNavigator);
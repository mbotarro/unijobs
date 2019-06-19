import {createBottomTabNavigator} from "react-navigation";

import HomeScreen from "../screens/HomeScreen"
import TestScreen from "../screens/TestScreen"

var TabsNav = createBottomTabNavigator(
    {
        Home: {screen: HomeScreen},
        Test: {screen: TestScreen},
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
        }
    }
);

export default TabsNav;
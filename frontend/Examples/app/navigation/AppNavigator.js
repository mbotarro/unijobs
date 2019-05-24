import { createStackNavigator, createAppContainer } from "react-navigation";

import HomeScreen from "../screens/HomeScreen";
import TextInputScreen from "../screens/TextInputScreen"
import IconScreen from "../screens/IconScreen"

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  TextInput: {
      screen: TextInputScreen,
  },
  IconScreen : {
      screen: IconScreen,
  },
});

export default createAppContainer(AppNavigator);
import React from 'react'
import { View, } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

import UniText from "../constants/UniText";
import UniColors from "../constants/UniColors";

import TestScreen from "../screens/TestScreen";
import HomeScreen from "../screens/HomeScreen";
import FeedRequestScreen from "../screens/FeedRequestScreen"


export default FeedNavigator = createBottomTabNavigator({
    FeedRequest : {
        screen : FeedRequestScreen,
    },
    Home: {
        screen: HomeScreen,
    },
    Test: {
        screen: TestScreen,
    },
},
{
    tabBarOptions: {
        activeTintColor: UniColors.main,
        inactiveTintColor: UniColors.dark_grey,
        
        labelStyle: { fontSize: UniText.normal },

        style: { height: 40, paddingBottom: 10 },
    },
    
    defaultNavigationOptions: {
        tabBarIcon: ({ focused, horizontal, tintColor }) => (
            focused ? <View style={{
                backgroundColor: tintColor,
                height: 3,
                borderRadius: 3,
                alignSelf: 'stretch',
                marginBottom: 10,
            }} />
            :
            null
        ),
    },
});
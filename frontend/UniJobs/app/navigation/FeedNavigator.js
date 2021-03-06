import React from 'react'
import { View, } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

import UniText from "../constants/UniText";
import UniColors from "../constants/UniColors";

import TestScreen from "../screens/TestScreen";
import FeedRequestScreen from "../screens/FeedRequestScreen"
import FeedOfferScreen from "../screens/FeedOfferScreen"
import AddOfferScreen from '../screens/AddOfferScreen';


export default FeedNavigator = createBottomTabNavigator({
    FeedOffer : {
        screen: FeedOfferScreen,
    },
    FeedRequest : {
        screen: FeedRequestScreen,
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
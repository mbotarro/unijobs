"use strict";

import UniColors from './UniColors'
import UniText from './UniText'
import { StyleSheet} from 'react-native'

const textInput = {
    borderColor:    UniColors.dark_grey,
    borderRadius:   25,
    borderWidth:    1,

    height:     50,
    width:      290,

    fontSize:   UniText.normal,
    color:      UniColors.dark,
    textAlign:  'center',
}

const text = {
    fontSize:   20,
    color:      UniColors.dark_grey
}



const container = {
    flex: 1,
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
}

const useravatar= {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
}

const username={
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
}

module.exports = {
    textInput,
    text,
    container,
    useravatar,
    username,
}


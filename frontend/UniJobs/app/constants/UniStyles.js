"use strict";

import UniColors from './UniColors'
import UniText from './UniText'

const textInput = {
    borderColor:    UniColors.dark_grey,
    borderRadius:   25,
    borderWidth:    1,

    height:     50,
    width:      290,

    fontSize:   UniText.normal,
    color:      UniColors.dark,
    textAlign:  'center',
};

const text = {
    fontSize:   15,
    color:      UniColors.dark_grey
}

const icons ={
    width: 20,
    height: 20,
    alignSelf: 'center',

}

const container = {
    flex: 1,
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
}

const useravatar= {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "white",
    marginTop:10,
    marginBottom:10,
}

const username={
    fontSize:15,
    color:UniColors.white,
    fontWeight:'100',
    
}

module.exports = {
    textInput,
    text,
    container,
    useravatar,
    username,
    icons,
}

"use strict";

import UniColors from './UniColors'
import UniText from './UniText'

const textInput = {
    backgroundColor: UniColors.light,

    borderRadius:   25,

    height:     45,
    width:      307,
    marginHorizontal: 53,

    fontSize:   UniText.normal,
    color:      UniColors.dark,
    textAlign:  'center',
};

const text = {
    fontSize:   UniText.normal,
    color:      UniColors.dark_grey
}

module.exports = {
    textInput,
    text,
};

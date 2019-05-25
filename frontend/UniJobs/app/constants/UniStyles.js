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
    fontSize:   20,
    color:      UniColors.dark_grey
}

module.exports = {
    textInput,
    text,
};

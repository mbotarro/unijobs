// React imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, ViewPropTypes } from 'react-native';

// UniJobs imports
import UniColors from '../constants/UniColors'
import UniText from '../constants/UniText'


// Note que o botão é customizável pelo usuário!
// basta enviar buttonStyle como props!

class Button extends Component {
	render() {
        const { text, onPress, buttonStyle, textStyle } = this.props;
        
		return (
            <TouchableOpacity
                style   = {[styles.buttonStyle, buttonStyle]}
			    onPress = {() => onPress()}
		    >
                <Text style={[styles.textStyle, textStyle]}>
                    {text}
                </Text>
		    </TouchableOpacity>
		);
	}
}


// definir os tipos de dados dos props logo depois da classe
Button.propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
	
	buttonStyle: ViewPropTypes.style,
	textStyle: Text.propTypes.style,
};


const styles = StyleSheet.create({
  textStyle: {
        fontSize:   UniText.normal,
		color:      UniColors.white,
		textAlign:  'center'
  },
  
  buttonStyle: {
        paddingVertical:    5,
        paddingHorizontal:  20,
		backgroundColor:    UniColors.main,
        borderRadius:       20,
  }
});


export default Button;

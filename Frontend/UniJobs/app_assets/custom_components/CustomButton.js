import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, ViewPropTypes } from 'react-native';

class CustomButton extends Component {
	render() {
		const { text, onPress, buttonStyle, textStyle } = this.props;
		return (
		  <TouchableOpacity style={[styles.buttonStyle, buttonStyle]}
			onPress={() => onPress()}
		  >
			 <Text style={[styles.textStyle, textStyle]}>{text}</Text>
		  </TouchableOpacity>
		);
	}
}

CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
	onPress: PropTypes.func.isRequired,
	
	buttonStyle: ViewPropTypes.style,
	textStyle: Text.propTypes.style,
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize:20,
		color: '#ffffff',
		textAlign: 'center'
  },
  
  buttonStyle: {
		padding:10,
		backgroundColor: '#202646',
		borderRadius:7
  }
});

export default CustomButton;
import React, { Component } from 'react';
import {
    Animated,
    View,
    TouchableWithoutFeedback,
    StyleSheet,
    Image,
} from "react-native"
import PropTypes from 'prop-types';

import UniColors from '../constants/UniColors'
import UniText from '../constants/UniText'


export default class MenuButton extends Component {

    state = {
        animation: new Animated.Value(0)
    }

    toggleOpen = () => {
        const toValue = this._open ? 0 : 1;

        Animated.timing(this.state.animation, {toValue, duration: 200}).start();

        this._open = !this._open;
    }

    render() {

        const { onAddRequestPress, onAddOfferPress, topOffset } = this.props

        const bgStyle = {
            transform: [{
                scale: this.state.animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 30]
                })
            }]
        }

        const buttomPositionInterpolate = (finalRelYPos) => ({
            transform: [{
                scale: this.state.animation
            },{
                translateY: this.state.animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, finalRelYPos],
                })
            }]
        })

        const labelPositionInterpolate = this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -80],
        })

        const opacityInterpolate = this.state.animation.interpolate({
            inputRange: [0, 0.8, 1],
            outputRange: [0, 0, 1],
        })

        const labelStyle = {
            opacity: opacityInterpolate,
            transform: [{
                translateX: labelPositionInterpolate
            }]
        }

        const AnimatedButtom = (
            onPressFunction, animatedMoveFunctionArray, stylesArray,
            textStylesArray, imgRequire, descText) => (
            <TouchableWithoutFeedback onPress={onPressFunction}>
                <Animated.View style={stylesArray.concat(animatedMoveFunctionArray)}>
                    <Animated.Text style={textStylesArray}>{descText}</Animated.Text>
                    <Image 
                        source={imgRequire}
                        style={styles.ImageIconStyle}
                    />
                </Animated.View>
            </TouchableWithoutFeedback>
        )

        return (
            <View style={StyleSheet.container}>
                <Animated.View style={[styles.background, bgStyle, {top: topOffset}]}/>
                
                {AnimatedButtom(onAddRequestPress, [buttomPositionInterpolate(-140)], [styles.button, styles.other, {top: topOffset}], 
                    [styles.label, labelStyle, {width:90}], require('../assets/icons/help.png'), 'Solicitação')}

                {AnimatedButtom(onAddOfferPress, [buttomPositionInterpolate(-70)], [styles.button, styles.other, {top: topOffset}], 
                    [styles.label, labelStyle, {width:90}], require('../assets/icons/shopping-label.png'), 'Oferta')}

                <TouchableWithoutFeedback onPress={this.toggleOpen}>
                    <View style={[styles.button, styles.pay, {top: topOffset}]}>
                        <Image 
                            source={require('../assets/icons/add.png')}
                            style={styles.ImageIconStyle}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

MenuButton.propTypes = {
    onAddOfferPress: PropTypes.func.isRequired,
    onAddRequestPress: PropTypes.func.isRequired,
    topOffset: PropTypes.number.isRequired
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "transparent",
        flex: 1
    },
    background: {
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        position: "absolute",
        width: 60,
        height: 60, 
        top: 510,
        right: 15,
        borderRadius: 30,
    },
    button: {
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center", 
        shadowColor: "#333",
        shadowOpacity: 0.1,
        shadowOffset: {x:2, y:0},
        shadowRadius: 2,
        borderRadius: 30,
        position: 'absolute',
        top: 510,
        right: 15,
    },
    pay: {
        backgroundColor: UniColors.main,
    },
    other: {
        backgroundColor: UniColors.main,
        width: 50,
        height: 50,
        borderRadius: 25,
        right: 20,
    },
    ImageIconStyle: {
        padding: 5,
        height: 20,
        width: 20,
        resizeMode: 'stretch',
    },
    label: {
        color: UniColors.white,
        fontSize: UniText.normal,
        position: "absolute",
        backgroundColor: "transparent",
    },
})
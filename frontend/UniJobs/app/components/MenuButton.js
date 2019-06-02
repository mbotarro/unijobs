import React, { Component } from 'react';
import {
    Animated,
    View,
    TouchableWithoutFeedback,
    StyleSheet,
    Image,
} from "react-native" 

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
        const bgStyle = {
            transform: [{
                scale: this.state.animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 30]
                })
            }]
        }

        const test2 = {
            transform: [{
                scale: this.state.animation
            },{
                translateY: this.state.animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -140],
                })
            }]
        }

        const test1 = {
            transform: [{
                scale: this.state.animation
            },{
                translateY: this.state.animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -70],
                })
            }]
        }

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

        return (
            <View style={StyleSheet.container}>
                <Animated.View style={[styles.background, bgStyle]}/>
                <TouchableWithoutFeedback>
                    <Animated.View style={[styles.button, styles.other, test2]}>
                        <Animated.Text style={[styles.label, labelStyle, {width:90}]}>Solicitação</Animated.Text>
                        <Image 
                            source={require('../assets/icons/help.png')}
                            style={styles.ImageIconStyle}
                        />
                    </Animated.View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback>
                    <Animated.View style={[styles.button, styles.other, test1]}>
                        <Animated.Text style={[styles.label, labelStyle, {width:90}]}>Oferta</Animated.Text> 
                        <Image 
                            source={require('../assets/icons/shopping-label.png')}
                            style={styles.ImageIconStyle}
                        />
                    </Animated.View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={this.toggleOpen}>
                    <View style={[styles.button, styles.pay]}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000"
    },
    background: {
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        position: "absolute",
        width: 60,
        height: 60, 
        top: 375,
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
        elevation: 1,
        position: 'absolute',
        top: 375, 
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
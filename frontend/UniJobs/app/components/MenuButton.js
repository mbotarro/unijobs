import React, { Component } from 'react';
import {
    Animated,
    View,
    Text,
    TouchableWithoutFeedback,
    StyleSheet,
    Image,
} from "react-native" 


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
            outputRange: [0, -90],
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
                        <Animated.Text style={[styles.label, labelStyle]}>Test 2</Animated.Text>
                        <Image 
                            source={require('../assets/icons/add.png')}
                            style={styles.ImageIconStyle}
                        />
                    </Animated.View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback>
                    <Animated.View style={[styles.button, styles.other, test1]}>
                        <Animated.Text style={[styles.label, labelStyle]}>Test 1</Animated.Text> 
                        <Image 
                            source={require('../assets/icons/add.png')}
                            style={styles.ImageIconStyle}
                        />
                    </Animated.View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={this.toggleOpen}>
                    <View style={[styles.button, styles.pay]}>
                        <Animated.Text style={[styles.label, labelStyle]}>Add</Animated.Text> 
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
        backgroundColor: "rgba(0, 0, 0, 0.2)",
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
        backgroundColor: "#00B15E",
    },
    other: {
        backgroundColor: "#DDD",
    },
    ImageIconStyle: {
        padding: 5,
        height: 20,
        width: 20,
        resizeMode: 'stretch',
    },
    label: {
        color: "#333",
        position: "absolute",
        fontSize: 18,
        backgroundColor: "transparent",
    },
})
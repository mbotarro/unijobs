import React from 'react'
import {View} from 'react-native'

export default class Space extends React.Component {
    render() {
		const { height } = this.props;
        return <View style = {{height: height > 0 ? height : 20}} />;
    }
}
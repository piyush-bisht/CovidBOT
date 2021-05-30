import React, { Component } from 'react'
import { View } from 'react-native'
import Body from './Body'
import Header from './Header'

export default class landing extends Component {
    render() {
        return (
            <View>
                <Header/>
                <Body/>
            </View>
        )
    }
}

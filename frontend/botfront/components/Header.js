import React, { Component } from 'react'
import { Button, Image,StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default class Header extends Component {
    render() {
        return (
            <View >
                <Text style={styles.text}>
                    Covid-Helper
                </Text>
                
            </View>
        )
    }
}
const styles=StyleSheet.create({
    text:{
        backgroundColor:'#333333',
        fontSize:30,
        color:'white',
        padding:10  
    },
    button:{
        margin:10
    }
})

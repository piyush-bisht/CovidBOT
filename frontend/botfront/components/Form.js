import React, { Component } from 'react'
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from "react-native";
import DatePicker from 'react-native-date-picker'
export default class Form extends Component {
    state = {
        modalVisible: true,
        pincode:"",
        date:new Date()
      };
    constructor(props){
        super(props);
        this.handlePress=this.handlePress.bind(this)
    }
      setModalVisible = (visible) => {
       
      }
      handlePress(){
        
        var {pincode,date}=this.state;
        if(pincode!="")
        {console.log(this.state.pincode + this.state.date);
        this.props.asqVaccineStatus(this.state.pincode,this.state.date)
        this.setState({ modalVisible: false });}
      }
      render() {
        const { modalVisible } = this.state;
        return (
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                
                this.setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <TextInput keyboardType="number-pad" textContentType="postalCode" onChangeText={(val)=>(this.setState({pincode:val}))} value={this.state.pincode} placeholder="Enter Pincode"></TextInput>
                  <DatePicker date={this.state.date} onDateChange={(date)=>(this.setState({date}))} mode="date"></DatePicker>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => this.handlePress()}
                  >
                    <Text style={styles.textStyle}>Check Availability</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            
          </View>
        );
      }
}
const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });
  

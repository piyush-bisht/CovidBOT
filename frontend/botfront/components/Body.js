import React, { Component } from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import messages from "./Constant";
import Form from './Form';
export default class Body extends Component {
    constructor(props)
    {
        super(props);
        this.state={
             mesg:messages,
             typing:"",
             triggerForm:false
        }
        this.handleChange=this.handleChange.bind(this);
        this.handlePress=this.handlePress.bind(this);
        this.asqVaccineStatus=this.asqVaccineStatus.bind(this);
    }
    handleChange(textValue){
        this.setState({typing:textValue});
    }
    handlePress(){
        
        
        if(this.state.typing!=="")
        {
            var msg={text:this.state.typing,isUser:true};
            var msgs=[...this.state.mesg,msg];
            console.log(this.state.typing)
            
            if(this.state.typing=="vaccine")
            {
                this.setState({mesg:msgs,typing:"",triggerForm:true});
                
            }
            else
            {
                this.setState({mesg:msgs,typing:""});
                this.asqQuery(msg);
            }
        }
    }
    
    asqVaccineStatus(pincode,date){
        
        var date=date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
        var url=`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=`+pincode+'&date='+date;
        console.log(url)
        fetch(url,
        {
            mode: 'cors',
            
            headers:{
                Host: 'cdn-api.co-vin.in',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
            }
        })
        .then((response) =>response.text().then(text=>
         {   
            var data=JSON.parse(text);
            console.log(data.sessions)
            var resps=[]
            if(data.sessions==undefined)
            {
                var msg={text:"Please Check the pincode entered",isUser:false};
                var msgs=[...this.state.mesg,msg];
                this.setState({mesg:msgs,typing:"",triggerForm:false});
            }
            else if(data.sessions.length!=0)
            {

                var flag=0;
                data.sessions.map((sess)=>{
                    if(sess.available_capacity!=0)
                    {
                        flag=1;
                        var resp=sess.name+'\n'+sess.address+"\n"+"min age = "+sess.min_age_limit+"\n"+"doses available= "+sess.available_capacity+"\n"+sess.from+"-"+sess.to+"\n"+sess.date
                        var msg={text:resp,isUser:false};
                        resps.push(msg);
                    }
                })
                if(flag)
                {var last={text:"To book any of these slots please visit https://www.cowin.gov.in/",isUser:false};}
                else
                var last={text:"Sorry , all available slots are full in this area!",isUser:false};
                var msgs=[...this.state.mesg,...resps,last];
                this.setState({mesg:msgs,typing:"",triggerForm:false});
            }
            
            else{
                console.log("NOT FOUND");
                var msg={text:"Sorry, No sessions found at this pincode",isUser:false};
                var msgs=[...this.state.mesg,msg];
                this.setState({mesg:msgs,typing:"",triggerForm:false});
            }
            
            })
        )
        .catch(err=>(console.log(err)));
    }
    asqQuery(msg)
    {
        var query=JSON.stringify({
            text:msg.text
        })
        console.log(query);
        
        fetch('http://192.168.43.76:8000/botsays/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: query
        })
        .then(res=>{
            res.text().then(text=>
            {var msg={text,isUser:false};
            var msgs=[...this.state.mesg,msg];
            this.setState({mesg:msgs,typing:""});}
            )
        })

    }
    render() {
        var {mesg}=this.state;
       
        return (
            <View style={styles.container} >
                
                <ScrollView ref={ref => {this.scrollView = ref}} onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}>
                    {
                    mesg.map((msg,index)=>(
                        <View key={index} style={msg.isUser?styles.userBox:styles.senderBox}>
                            <Text key={index}  style={msg.isUser?styles.userText:styles.senderText}>{msg.text}</Text>
                        </View>
                    ))
                    }
                    {
                        this.state.triggerForm &&
                        <Form asqVaccineStatus={this.asqVaccineStatus}/>
                    }
                </ScrollView>
                <View style={{height:'10%',flexDirection:"row",margin:5,height:45,width:'100%',padding:0}}>
                    <View  style={{flexDirection:"row",borderRadius:50,backgroundColor:"#ffffff",width:'80%',paddingLeft:'5%',fontSize:18}}   >
                        <TextInput onChangeText={this.handleChange} value={this.state.typing} multiline={true} style={{width:200,fontSize:18,height:45}} placeholder="Ask me anything" onChangeText={this.handleChange} value={this.state.typing}></TextInput>
                        
                    </View>
                    
                    <TouchableOpacity onPress={this.handlePress}  style={{alignSelf:"flex-end",borderRadius:22,width:45,height:45,backgroundColor:'#333333',marginLeft:5,marginTop:0}} ><Image source={require("./send.png")} style={{width:20,height:20,margin:12,borderRadius:10}}></Image></TouchableOpacity>
                </View>
                
            </View>
            
            
        )
    }

    
}


const styles=StyleSheet.create({
    image:{
        height:37,
        width:37,
        borderRadius:10,
        marginRight:6
    },
    container:{
        
        backgroundColor:'#DDDDDD',
        paddingLeft:4,
        paddingRight:4,
        marginBottom:50,
        height:'90%'
        
        
    },


    userBox:{
        alignSelf:"flex-end",
        backgroundColor:'#BBBBBB',
        maxWidth:300,
        padding:3,
        margin:2,
        flexDirection:"row-reverse",
        borderRadius:5
    },


    senderBox:{
        alignSelf:"flex-start",
        backgroundColor:'#ffffff',
        padding:3,
        margin:2,
        maxWidth:300,
        borderRadius:5

    },


    userText:{
        fontSize:15,
        flexDirection:"row-reverse",

        margin:5
    },

    
    senderText:{
        fontSize:15,
        margin:5
    },


    headerText:{
        fontSize:23,
        color:"#ffffff",
        padding:5
    }
})

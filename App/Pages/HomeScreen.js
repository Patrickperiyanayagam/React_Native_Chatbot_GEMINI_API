import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import ChatFaceData from '../Services/ChatFaceData';
export default function HomeScreen() {
    const [chatFaceData,setchatFaceData] = useState();
    const [selectedChatFaceData,setselectedChatFaceData] = useState();
    const [swap,setswap] = useState(true);
    useEffect(()=>{
        setchatFaceData(ChatFaceData);
        setselectedChatFaceData(ChatFaceData[0]);
    },[])

    const onChatFacePress = (id)=>{
        setselectedChatFaceData(ChatFaceData[id-1])
    }

    const navigation = useNavigation();
    return (
        <>
        {   swap &&
            <View style={{justifyContent:'center',alignItems:"center",backgroundColor:'darkseagreen',flex:1,opacity:0.8}}>
                <LottieView style={{width:300,height:300}} source={require('../../assets/welcome.json')} autoPlay loop />
                <TouchableOpacity style={{width:350,height:100,borderRadius:20,borderColor:'white',borderWidth:2,justifyContent:'center',alignItems:'center'}} onPress={()=>{setswap(false)}}>

                    {/* <LottieView style={{width:300,height:300,zIndex:1}} source={require('../../assets/click.json')} autoPlay loop >
                    </LottieView> */}
                        <Text style={{fontSize:21,fontWeight:'bold',color:'white'}}>Click Here To Navigate to ChatBot</Text>
                </TouchableOpacity>
            </View>
        }
    {
        !swap &&
        <View style={{alignItems:"center",paddingTop:90,backgroundColor:'lightgray',flex:1}}>
        <Text style={{color:selectedChatFaceData.primary,fontSize:30}}>Hello</Text>
        <Text style={{color:selectedChatFaceData.primary,fontSize:30,fontWeight:'bold'}}>I am {selectedChatFaceData.name}</Text>
        <Image source={{uri:selectedChatFaceData.image}} style={{width:150,height:150,marginTop:20}}/>
        <Text style={{marginTop:30,fontSize:25}}>How can I help you?</Text>
        <View style={{marginTop:20,backgroundColor:"#F5F5F5",alignItems:"center",height:110,padding:10,borderRadius:10}}>
            <FlatList
                data={chatFaceData}
                renderItem={({item})=>selectedChatFaceData.id != item.id &&(
                    <TouchableOpacity style={{margin:15}} onPress={()=>onChatFacePress(item.id)}>
                        <Image source={{uri:item.image}} style={{width:40,height:40}}/>
                    </TouchableOpacity>
                )}
                horizontal={true}
                />
                <Text style={{marginTop:5,fontSize:17,color:"#B0B0B0"}}>Choose Your Fav ChatBuddy</Text>
        </View>
        <TouchableOpacity style={[{backgroundColor:selectedChatFaceData.primary},{padding:17,width:Dimensions.get('screen').width*0.6,borderRadius:100,alignItems:'center',marginTop:30}]} onPress={()=>{navigation.navigate('chat',{selectedFace:selectedChatFaceData})}}>
            <Text style={{fontSize:16,color:"#ffff"}}>Let's Chat</Text>
        </TouchableOpacity>
    </View>
    }
    </>
  )
}
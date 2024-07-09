import { useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const MODEL_NAME = "gemini-1.0-pro-001";
  const API_KEY = "AIzaSyDy3rmPD2C3qWAc1aTOXVcU2vXQUrbSM9s";
const ChatScreen = () => {
    const param = useRoute().params
    const [messages, setMessages] = useState([])
    const [search,setsearch] = useState('');
    const [selectedChatFace,setselectedChatFace] = useState([])
    const [loading,setloading] = useState(false)

    useEffect(() => {
        setselectedChatFace(param.selectedFace)
        setMessages([
        {
            _id: 1,
            text: 'Hello, I am '+param.selectedFace?.name+", How can I help you?",
            createdAt: new Date(),
            user: {
            _id: 2,
            name: 'React Native',
            avatar: param.selectedFace?.image,
            },
        },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
        )
        if(messages[0].text){
            setloading(true)
            runChat(messages[0].text)
        }
    }, [])

    async function runChat(msg) {
        console.log(search)
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });
        const generationConfig = {
            temperature: 0.9,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
        };

        const safetySettings = [
            {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
        ];

        const chat = model.startChat({
            generationConfig,
            safetySettings,
            history: [
            {
                role: "user",
                parts: [{ text: "hii"}],
            },
            {
                role: "model",
                parts: [{ text: "Hello there! How can I assist you today?"}],
            },
            ],
        });

        const result = await chat.sendMessage(`${msg}`)
        .catch(err=>{
            console.log(err)
        })
        const response = result.response;
        console.log(typeof response.text());
        if(response.text()){
            // const resp = response.text().replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
            
            const chatAPIResp = {
                _id:Math.random()*(9999999 - 1),
                text:response.text(),
                createdAt:new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar:param.selectedFace?.image,
                }
            }
            setMessages(previousMessages => GiftedChat.append(previousMessages,chatAPIResp))
            setloading(false)
        }
        else{
            setloading(false)
            const chatAPIResp = {
                _id:Math.random()*(9999999 - 1),
                text:"Sorry, I can't help with it",
                createdAt:new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar:param.selectedFace?.image,
                }
            }
            setMessages(previousMessages => GiftedChat.append(previousMessages,chatAPIResp))

        }
        // console.log(response.text());
        // alert(response.text());
        }
    return (
    <View style={{flex:1,backgroundColor:'#fff',marginTop:30,padding:10}}>
        <GiftedChat
        messages={messages}
        isTyping={loading}
        onSend={messages => onSend(messages)}
        user={{
        _id: 1,
        }}
    />
    </View>
    )
}

export default ChatScreen
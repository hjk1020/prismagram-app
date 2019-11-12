import React, {useState,useEffect} from 'react';
import {  Text, View,AsyncStorage ,TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {AppLoading} from "expo";
import * as Font from 'expo-font'
import {Asset} from 'expo-asset'
import {ThemeProvider} from "styled-components"; 
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from "apollo-boost";
import apolloClientOptions from './apollo';
import styles from "./styles"

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null)
  const [isLoggedIn , setIsLoggedIn] = useState(null);
  const preLoad = async () => {
    try{ 
      await Font.loadAsync({
       ...Ionicons.font
     });
     await Asset.loadAsync([require("./assets/instagram(eng).png")])
     const cache = new InMemoryCache();
     await persistCache({  
      cache, // 로딩을 줄여줄수 있도록 폰에 정보를 저장
      storage: AsyncStorage, // asyncStorage는 웹의 로컬스토리지랑 비슷
    });
    const client = new ApolloClient({
      cache,
      ...apolloClientOptions
     
    });
    const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
    if(isLoggedIn === null || isLoggedIn === "false"){
      setIsLoggedIn(false);
    }else{
      setIsLoggedIn(true)
    }   // isLoggedIn은 null 체크 안한상태 false 로그아웃상태 true 로그인상태
     setLoaded(true);
     setClient(client) 
    }catch(e){
      console.log(e)
    }
  };
  useEffect(() => {
    preLoad();
  },[])

  const logUserIn = async () => {
    try{
      await AsyncStorage.setItem("isLoggedIn","true")
      setIsLoggedIn(true);
    }catch(e){
      console.log(e);
    }
  }

  const logUserOut = async () => {
    try{
      await AsyncStorage.setItem("isLoggedIn","false")
      setIsLoggedIn(false)
    }catch(e){
      console.log(e)
    }
  }

  return loaded &&client && isLoggedIn !== null ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
    <View style = {{flex:1, justifyContent:"center", alignItems:"center"}}>
      {isLoggedIn === true ? (
      <TouchableOpacity onPress= {logUserOut}>
        <Text>Log Out</Text>
      </TouchableOpacity>) : (
      <TouchableOpacity onPress = {logUserIn}>
       <Text>Log In</Text> 
     </TouchableOpacity>)}
    </View>
    </ThemeProvider>
    </ApolloProvider> ): (<AppLoading/>);
  
} // 이건 상대가 로그인 했는지 안했는지 확인하는 방법 이럴 필요까진 없으므로 삭제



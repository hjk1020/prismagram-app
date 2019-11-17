import React, {useState,useEffect} from 'react';
import {  AsyncStorage } from 'react-native';
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
import NavController from './components/NavController';
import {AuthProvider} from "./AuthContext";



export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null)
  const [isLoggedIn , setIsLoggedIn] = useState(null);
  const preLoad = async () => {
    
    //여기다가 await AsyncStorage.clear(); 쓰면 강제 로그아웃됨
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
      request: async operation => {
        const token = await AsyncStorage.getItem("jwt");
        return operation.setContext({
          headers: { Authorization: `Bearer ${token}` }
        });
      },
      ...apolloClientOptions
     
    });
     const isLoggedIn = await AsyncStorage.getItem("isLoggedIn")
     if(!isLoggedIn  || isLoggedIn === "false"){
        setIsLoggedIn(false)
     }else{
       setIsLoggedIn(true)
     }
     setLoaded(true);
     setClient(client) 
    }catch(e){
      console.log(e)
    }
  };
  useEffect(() => {
    preLoad();
  },[])

  

  return loaded &&client&& isLoggedIn !== null? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <AuthProvider isLoggedIn = {isLoggedIn}> 
    <NavController/>
    </AuthProvider>
    </ThemeProvider>
    </ApolloProvider> ): (<AppLoading/>);
  
  }/*AuthProvider는 원래 AuthContext에서 로그인 문제를 다 처리할수 있었으나 그렇게 하면
앱로딩이 끝나고 체크함 그리고 체크한다음 네이게이션을 보여주기 때문에 체크하는 동안은 네비게이션으로 못넘어가서 빈화면으로 
대기하는 문제가 발생함 그렇기 때문에 여기서 체크*/


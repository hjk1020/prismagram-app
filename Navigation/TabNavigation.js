import React from "react";
import {View,Platform } from "react-native";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import Notifications from "../screens/Notifications";
import Detail from "../screens/Detail";
import UserDetail from "../screens/UserDetail";
import Profile from "../screens/Tabs/Profile";
import MessagesLink from "../components/MessagesLink";
import NavIcon from "../components/NavIcon";
import {stackStyles} from "./config"
import styles from "../styles";


const stackFactory = (initialRoute, customConfig) => createStackNavigator({
    InitialRoute: {
       screen: initialRoute,
    navigationOptions: {...customConfig}
    },
    Detail :{
        screen:Detail,
        navigationOptions:{
         
            title:"Photo"
        }
    },
    UserDetail:{
        screen:UserDetail,
        navigationOptions:{
         
            title:"User"
        }
    }
},{
    defaultNavigationOptions:{
        headerBackTitle:null,
        headerTintColor:styles.blackColor,
        headerStyle: {...stackStyles}
    }
}) // 하는이유: 모두 header 를 갖기 위해

export default createBottomTabNavigator({
Home:{
    screen: stackFactory(Home,{
        headerRight :< MessagesLink/>,
        headerTitle: 
        <NavIcon
        
        name=  "logo-instagram"
       
        />
    }),
    navigationOptions:{
        tabBarIcon:({focused})=>
        (<NavIcon
        focused = {focused}
        name=  {Platform.OS === "ios" ? "ios-home" :"md-home"}
      
        />)
    }
},
Search:{
    screen: stackFactory(Search,{
        headerBackTitle:null
    }),
    navigationOptions:{
        tabBarIcon:({focused}) =>(<NavIcon
        focused={focused}
        name=  {Platform.OS === "ios" ? "ios-search" :"md-search"}
       
        />)
    }
},
Add:{
    screen:View,
    navigationOptions:{
        tabBarOnPress: ({navigation}) =>navigation.navigate("PhotoNavigation"),
        tabBarIcon:({focused})=>(<NavIcon
        focused = {focused}
        size = {28}
        name=  {Platform.OS === "ios" ? "ios-add" :"md-add"}
      
        />)
    }
},
Notifications:{
    screen: stackFactory(Notifications,{
        title:"Notifications"
    }),
    navigationOptions:{
        tabBarIcon: ({focused})=>(<NavIcon
        focused = {focused}
        name =  {
            Platform.OS === "ios" 
            ?focused 
            ? "ios-heart"
            :"ios-heart-empty"
            :focused
            ?"md-heart"
            : "md-heart-empty"}
    
        />)
    }
},
Profile:{
    screen: stackFactory(Profile,{
        title:"Profile"
    }),
    navigationOptions:{
        tabBarIcon:({focused}) => (<NavIcon
        focused = {focused}
        name=  {Platform.OS === "ios" ? "ios-person" :"md-person"}
        
        />
        )}
}
},{
    initialRouteName:"Profile",
    tabBarOptions :{
        showLabel:false,
        style:{
            backgroundColor:"#FAFAFA"
        }
    }
})


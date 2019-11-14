import React from "react";
import {View} from "react-native";
import {useIsLoggedIn} from "../AuthContext"
import AuthNavigation from "../Navigation/AuthNavigation"
import MainNavigation from "../Navigation/MainNavigation";

export default () => {
    const isLoggedIn = useIsLoggedIn();
    
    return(
        <View style={{flex:1}}>
            {isLoggedIn ? (
               <MainNavigation/>
            ):(
                <AuthNavigation/>
            )}
        </View>
    )
   
}
import React,{useState} from "react";
import {Alert,TouchableWithoutFeedback,Keyboard} from "react-native";
import { useMutation } from "@apollo/react-hooks";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import {LOG_IN} from "./AuthQuerise";


const View = styled.View`
justify-content:center;
align-items:center;
flex:1;
`;



export default ({navigation}) => {
    const emailInput = useInput(navigation.getParam("email",""));
    const [loading,setLoading] = useState(false);
    const [requestSecretMutation] = useMutation(LOG_IN,{
        variables: {
            email:emailInput.value
        }
    })
    const handleLogin = async() =>{
        const {value} =emailInput;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(value === ""){
            return Alert.alert("Email can't be empty");
        }else if(!value.includes("@") || !value.includes(".")){
            return Alert.alert("Please write an email")
        }else if (!emailRegex.test(value)){
            return Alert.alert("That email is invalid")
        }
        try{
            setLoading(true);
            const {
                data:{requestSecret}
            } =await requestSecretMutation();
            if(requestSecret){
              Alert.alert("Check your email");
              navigation.navigate("Confirm",{email:value}); // 보통 화면을 벗어나면 이전화면의 정보를 잃어버린다 그렇기 때문에 정보를 전달하는 방법이 필요한데 옆에 {email: value} 는 정보를 전달하는 기능이 있다
              return;
            }else{
                Alert.alert("Account not found")
                navigation.navigate("Signup",{email:value})
            }
            
        }catch(e){
            Alert.alert("Can't log in now")
        }finally{
            setLoading(false);
        }
    };
    return (
    <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
      <View>
        <AuthInput 
        {...emailInput}
        placeholder="Email" 
        keyboardType = "email-address"
        returnKeyType = "send"
        onSubmitEditing = {handleLogin}
        autoCorrect = {false}
        />
        <AuthButton loading= {loading} onPress = {handleLogin} text = "Log In"/>
      </View>
    </TouchableWithoutFeedback>
);
};
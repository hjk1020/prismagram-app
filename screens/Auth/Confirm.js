import React,{useState} from "react";
import {Alert,TouchableWithoutFeedback,Keyboard} from "react-native";
import { useMutation } from "@apollo/react-hooks";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { CONFIRM_SECRET } from "./AuthQuerise";
import {useLogIn} from "../../AuthContext";



const View = styled.View`
justify-content:center;
align-items:center;
flex:1;
`;



export default ({navigation}) => {
    const confirmInput = useInput("");
    const logIn = useLogIn();
    const [loading,setLoading] = useState(false);
    const [confirmSecretMutaion] = useMutation(CONFIRM_SECRET,{
        variables:{
            secret:confirmInput.value,
            email:navigation.getParam("email")
        }
    })
    const handleConfirm = async() =>{
        const {value} =confirmInput;
        if(value === "" || !value.includes(" ")){
          return Alert.alert("Invalid secret");
        }
        try{
            setLoading(true);
            const {
                data:{confirmSecret}
            } = await confirmSecretMutaion();
            if(confirmSecret !=="" || confirmSecret !== false){
                logIn(confirmSecret)
            }else{
                Alert.alert("Wrong secret!")
            }
        }catch(e){
            Alert.alert("Can't confirm secret")
        }finally{
            setLoading(false);
        }
    };
    return (
    <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
      <View>
        <AuthInput 
        {...confirmInput}
        placeholder="Secret" 
        returnKeyType = "send"
        onSubmitEditing = {handleConfirm}
        autoCorrect = {false}
        />
        <AuthButton loading= {loading} onPress = {handleConfirm} text = "Confirm"/>
      </View>
    </TouchableWithoutFeedback>
);
};
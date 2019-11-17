import React,{useState} from "react";
import {Alert,TouchableWithoutFeedback,Keyboard} from "react-native";
import { useMutation } from "@apollo/react-hooks";
import styled from "styled-components";
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { CREATE_ACCOUNT} from "./AuthQuerise";


const View = styled.View`
justify-content:center;
align-items:center;
flex:1;
`;

const FBContainer = styled.View`
margin-top: 25px;
padding-top:25px;
border-top-width: 1px;
border-color: ${props => props.theme.lightGreyColor};
border-style:solid;
`;

export default ({navigation}) => {
    const fNameInput = useInput("");
    const lNameInput = useInput("");
    const emailInput = useInput(navigation.getParam("email",""));
    const uNameInput = useInput("");
    const [loading,setLoading] = useState(false);
    const [createAccountMutation] = useMutation(CREATE_ACCOUNT,{
        variables:{
            userName:uNameInput.value,
            email:emailInput.value,
            firstName:fNameInput.value,
            lastName:lNameInput.value
        }
    })
    const handleSignup = async() =>{
        const {value:email} =emailInput; //email 이라는 밸류값을 가져온다
        const {value:fName} = fNameInput; // fName이라는 밸류값 이름을 지어준다
        const {value:lName} = lNameInput;
        const {value:userName} = uNameInput;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
       if (!emailRegex.test(email)){
            return Alert.alert("That email is invalid");
        }
        if(fName === ""){
            return Alert.alert("I need your name");
        }
        if(userName === ""){
            return Alert.alert("Invalid username");
        }
        try{
            setLoading(true);
            const {data:{createAccount}}=await createAccountMutation();
            if(createAccount){
                Alert.alert("Account create","Log in now");
                navigation.navigate("Login",{email})
            }
 
        }catch(e){
            Alert.alert("Username taken","Login instead")
            navigation.navigate("Login",{email})
        }finally{
            setLoading(false);
        }
    };
    const fbLogin = async() => {
        try {
          setLoading(true)
            const {
              type,
              token
            } = await Facebook.logInWithReadPermissionsAsync('471271477078541', {
              permissions: ['public_profile',"email"],
            });
            if (type === 'success') {
             
              const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,email,first_name,last_name`);
              const {email, first_name , last_name} =  await response.json();
              
             updateFormData(email,first_name,last_name)
              setLoading(false);
            } else {
              // type === 'cancel'
            }
          } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
          }
    }
    const googleLogin = async() => {
      const GOOGLE_ID = "883158580644-f1d8q91j04vb4agihv5vf2il8ssa65qc.apps.googleusercontent.com";
      try {
        setLoading(true);
        const result = await Google.logInAsync({
          androidClientId: GOOGLE_ID,
          
          scopes: ['profile', 'email'],
        });
       
       

        if (result.type === 'success') {
          
          const user = await fetch('https://www.googleapis.com/userinfo/v2/me', {
            headers: { Authorization: `Bearer ${result.accessToken}` }});
            const {email, family_name,given_name} = await user.json();
            updateFormData(email,given_name,family_name )
         
        } else {
          return { cancelled: true };
        }
      } catch (e) {
        console.log(e)
      }finally{
        setLoading(false)
      }
    }
    const updateFormData = (email,firstName,lastName) =>{
      emailInput.setValue(email);
      fNameInput.setValue(firstName);
      lNameInput.setValue(lastName);
      const [username] = email.split("@");
      uNameInput.setValue(username); //이런식으로 이메일 아이디를 쪼개 유저네임으로 쓸수 있음
    }
    return (
        <>
    <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
      <View>
        <AuthInput 
        {...fNameInput}
        placeholder="First name" 
        
        autoCapitalize = "words"
        
        />
         <AuthInput 
        {...lNameInput}
        placeholder="Last name" 
       
        autoCapitalize = "words"
        
        />
         <AuthInput 
        {...emailInput}
        placeholder="Email" 
        keyboardType = "email-address"
        returnKeyType = "send"
        autoCorrect = {false}
        />
         <AuthInput 
        {...uNameInput}
        placeholder="User name" 
        
        returnKeyType = "send"
        autoCorrect = {false}
        />
        <AuthButton 
        loading= {loading} 
        onPress = {handleSignup} 
        text = "Sign Up"/>
       <FBContainer>
        <AuthButton 
        bgColor = {"#2D4DA7"}
        loading = {false} 
        onPress = {fbLogin} 
        text = "Connect FB">
        </AuthButton>
        <AuthButton 
        bgColor = {"#EE1922"}
        loading = {false} 
        onPress = {googleLogin} 
        text = "Connect google">
        </AuthButton>
    </FBContainer>
    </View>
    </TouchableWithoutFeedback>
   
    </>
);
};
import React,{useEffect} from "react";
import styled from "styled-components";
import {ScrollView} from "react-native";
import {gql} from "apollo-boost";
import {useQuery} from "@apollo/react-hooks";
import { USER_FRAGMENT } from "../../fragments";
import Loader from "../../components/Loader";
import UserProfile from "../../components/UserProfile";


export const ME = gql`
{
  me{
    ...UserParts
  }
 
} ${USER_FRAGMENT}
`;



const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({navigation}) => {
  const {loading, data} = useQuery(ME) 
  
  
  
  // 위에다가 userName 넣고싶으면 setparam을 사용하면 된다
  /*useEffect(() =>{
    if(data.me){
      navigation.setParams("title",data.me.userName);
    }
  },[data])*/
  
return <ScrollView>{loading? <Loader/> : data && data.me && <UserProfile {...data.me}/>}</ScrollView>
};
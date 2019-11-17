import React ,{useState}from "react";
import {gql} from "apollo-boost";
import styled from "styled-components";
import {useQuery} from "@apollo/react-hooks";
import { ScrollView ,RefreshControl} from "react-native";
import Loader from "../components/Loader";
import Post from "../components/Post"



const FEED_QUERY = gql`
{
  seeFeed{
    id
    location
    caption
    user{
      id
      avatar
      userName
    }
    files{
      id
      url
    }
    likeCount
    isLiked
    Comments{
      id
      text
      user{
        id
        userName
      }
    }
    createdAt
  }
}
`;

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text`

`;

export default () => {
  const [refreshing, setRefreshing] = useState(false);
  const {loading, data,refetch} = useQuery(FEED_QUERY); //새로고침할때 refetch 실행
  const refresh = async() => {
   try{
    setRefreshing(true);
    await refetch();
  }catch (e){
    console.log(e)
  } finally{
    setRefreshing(false)
  }
}
  
return <ScrollView 
refreshControl = {<RefreshControl refreshing = {refreshing} onRefresh={refresh}/>}>
  {loading ? <Loader/> : data && data.seeFeed && data.seeFeed.map(post => <Post key={post.id} {...post}/>)} 
  </ScrollView>
} // 화면을 밑으로 스크롤할때 새로고침이 됨
 
import React,{useState} from "react";
import {ScrollView,RefreshControl} from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useQuery } from '@apollo/react-hooks'
import {gql} from "apollo-boost";
import Loader from "../../../components/Loader";
import SquarePhoto from "../../../components/SquarePhoto";

export const SEARCH = gql`
query search($term: String!) {
    searchPost(term:$term){
        id
        files{
            id
            url
        }
        likeCount
        CommentCount
    }
}
`;

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

const SearchPresenter  = ({term, shouldFetch}) => {
    const [refreshing, setRefreshing] = useState(false);
    const {data, loading} = useQuery(SEARCH,{
        variables:{
            term
        },
        skip : !shouldFetch,
        fetchPolicy:"network-only" // 검색할때 캐쉬 저장 x
    });
  
    const onRefresh = async() => {
        try{
            setRefreshing(true)
            await refetch({variables:{term}})
        }catch(e){
             setRefreshing(false)
        }
    }
    //shouldFetch 가 바뀔때마다 refetch를 호출하는거 shouldFetch가 refetch를 언제 해야할지 알려줌
    return (
    <ScrollView 
    refreshControl = {
    <RefreshControl 
    onRefresh = {onRefresh} 
    refreshing = {refreshing}/>
    }>
        {loading ? <Loader/> : data && data.searchPost && data.searchPost.map(post => <SquarePhoto key = {post.id} {...post}/>)}
    </ScrollView>
    )}

SearchPresenter.propTypes = {
    term:PropTypes.string.isRequired,
    shouldFetch:PropTypes.bool.isRequired
}
// shouldFetch는 검색을 위한 트리거가 됨
export default SearchPresenter;
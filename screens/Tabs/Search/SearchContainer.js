import React from "react";

import SearchBar from "../../../components/SearchBar";
import SearchPresenter from "./SearchPresenter";



export default class extends React.Component{
  static navigationOptions = ({navigation}) =>({
   headerTitle:<SearchBar 
   value = {navigation.getParam("term","")} 
   onChange={navigation.getParam("onChange",() =>null)} 
   onSubmit = {navigation.getParam("onSubmit",() =>null)}/>
  }); // 함수로 만들고 객체형태로 리턴하고 싶으면 ()을 둘러싸야 한다 아니면 return ~~ 방식으로 해야함
  constructor(props){
    super(props);
    const  {navigation} = props;
    this.state = {
      term: "",
      shouldFetch: false
  };
  navigation.setParams({
    term: this.state.term,
    onChange:this.onChange,
    onSubmit:this.onSubmit
  })
  }
  
  onChange =(text) =>{
    const {navigation} = this.props;
     this.setState({term:text , shouldFetch:false});
     navigation.setParams({
       term:text
     })
  } // 클래스는 훅의 onChange를 사용할수 없다
  onSubmit = () =>{
   this.setState({shouldFetch:true})
  }
  render(){
    const  {term,shouldFetch} = this.state
    return( <SearchPresenter term = {term} shouldFetch = {shouldFetch}/>
    
      )
  }
}
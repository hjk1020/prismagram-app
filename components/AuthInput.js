import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Constants from "../Constants"

const Container = styled.View`
margin-bottom:10px;
`;

const TextInput = styled.TextInput`
background-color:${props => props.theme.greyColor};
padding:10px;
width : ${Constants.width /1.7};
border:2px solid ${props => props.theme.lightGreyColor};
border-radius:4px;
`;

const AuthInput = ({
    placeholder,
    value,
    keyboardType="default" , 
    autoCapitalize ="none",
    onChange,
    returnKeyType="done",
    onSubmitEditing = () => null,
    autoCorrect =true
}) => (
<Container>
    <TextInput 
    onChangeText = {onChange}
    keyboardType = {keyboardType } 
    placeholder = {placeholder} 
    value = {value}
    autoCapitalize = {autoCapitalize}
    returnKeyType = {returnKeyType}
    onSubmitEditing={onSubmitEditing}
    autoCorrect = {autoCorrect}
    />
</Container>)

AuthInput.propTypes = {
    placeholder:PropTypes.string.isRequired,
    value:PropTypes.string.isRequired,
    keykeyboardType:PropTypes.oneOf([
   "default",
   "number-pad",
   "decimal-pad",
    "numeric",
"email-address",
"phone-pad"
    ]),
    autoCapitalize:PropTypes.oneOf([
        "none",
        "sentences",
        "words",
        "characters"
    ]),
    onChange:PropTypes.func.isRequired,
    returnKeyType:PropTypes.oneOf([
        "done",
        "go",
        "next",
        "search",
        "send"
    ]),
    onSubmitEditing:PropTypes.func,
    autoCorrect:PropTypes.bool
}

export default AuthInput;
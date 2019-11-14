import {createAppContainer} from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import Message from "../screens/Messages/Message";
import Messages from "../screens/Messages/Messages"

export default createStackNavigator({
    Message,
    Messages
})


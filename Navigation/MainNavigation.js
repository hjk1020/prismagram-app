import {createAppContainer} from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import TapNavigation from "../Navigation/TabNavigation";
import PhotoNavigation from "../Navigation/PhotoNavigation";
import MessageNavigation from "../Navigation/MessageNavigation";

const MainNavigation = createStackNavigator({
      TapNavigation ,
      PhotoNavigation,
      MessageNavigation
     
},{
    headerMode:"none"
})

export default createAppContainer(MainNavigation);
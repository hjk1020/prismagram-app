import {createAppContainer} from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import TapNavigation from "../Navigation/TabNavigation";
import PhotoNavigation from "../Navigation/PhotoNavigation";
import MessageNavigation from "../Navigation/MessageNavigation";
import {stackStyles} from "./config";

const MainNavigation = createStackNavigator({
      TapNavigation ,
      PhotoNavigation,
      MessageNavigation
     
},{
    defaultNavigationOptions:{
        headerStyles:{
            ...stackStyles
        }
    },
    headerMode:"none"
})

export default createAppContainer(MainNavigation);
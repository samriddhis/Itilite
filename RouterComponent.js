import React from 'react';
import { Icon } from 'react-native-elements';
import DashBoardScreen from "./src/DashBoardScreen";
import NewsLetterScreen from "./src/NewsLetterScreen";
import BrowserScreen from "./src/BrowserScreen";
import DrawerComponent from "./src/DrawerComponent/DrawerComponent"
import { createBottomTabNavigator, createAppContainer,createDrawerNavigator } from 'react-navigation';

const TabNavigator = createAppContainer(createBottomTabNavigator({
  DashBoard: {
    screen: DashBoardScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="dashboard" type="font-awesome" color={tintColor} />
    }
  },
  News:{
    screen: NewsLetterScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="newsletter" type="entypo" color={tintColor} />
    }
  }, 
}))

//const appConatiner = createAppContainer(TabNavigator);

const drawerNav = createAppContainer(createDrawerNavigator(
  {
    HomeScreen: TabNavigator,
    BrowserScreen: BrowserScreen,
  },
  {
    contentComponent: DrawerComponent,
    drawerWidth: 300,
    drawerBackgroundColor: 'rgba(255,255,255,.9)',
    overlayColor: 'gray',
    contentOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#6b52ae',
    },
  }
))

export default drawerNav;
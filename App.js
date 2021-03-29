import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import TransactionScreen from './screens/transactionScreen';
import SearchScreen from './screens/searchScreen';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

export default function App() {
  return (
    <AppContainer/>
  );
}

const TabNavigator = createBottomTabNavigator({
  Transaction:{screen:TransactionScreen},
  Search:{screen:SearchScreen}
},
{
  defaultNavigationOptions:({navigation})=>({
    tabBarIcon:({})=>{
      const routeName = navigation.state.routeName
      if(routeName === 'Transaction'){
        return(
          <Image
            source = {require('./assets/book.png')}
            style = {{width: 40, height:40}}
          />
        )
      }
      else if(routeName === 'Search'){
        return(
          <Image
          source = {require('./assets/searchingbook.png')}
          style = {{width: 40, height:40}}/>
        )
      }
    }
  })
})



const AppContainer = createAppContainer(TabNavigator);

//install react-native,react-navigation,react-navigation-tabs,rect-native-screens,react-native-gesture-handler
// add babel plug in 
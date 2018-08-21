import React, { Component } from 'react';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import HomeScreen from './HomeScreen';
import { createStackNavigator } from 'react-navigation';



const RootStack = createStackNavigator({
  Login: {
    screen: LoginScreen
  },
  Register: {
    screen: RegisterScreen  
  },
  Home: {
    screen: HomeScreen
  },
}, { initialRouteName: 'Login' })


export default class App extends Component {
  render() {
    return (
      <RootStack />
    );
  }
}


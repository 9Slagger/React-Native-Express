import React, { Component } from 'react';
import { View, Text, AsyncStorage, Alert, Button, StyleSheet } from 'react-native';
import axios from 'axios'
import {httpClient} from './HttpClient'
import { StackActions, NavigationActions } from 'react-navigation';


class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home Screen',
  };

  constructor(props) {
    super(props)
    this.state = { token: "", feedData: "" }
    this.feed()

    httpClient
    .get('/feed')
    .then(result=>{
      Alert.alert(JSON.stringify(result.data))
    })
  }

  async logout() {
    await AsyncStorage.removeItem('token')
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Login' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  async feed() {
    this.state = { feedData: "loading.." }
    const token = await AsyncStorage.getItem("token")

    axios.get('http://192.168.1.2:8082/api/v1/feed',
      { headers: { 'x-access-token': token } })
      .then(response => {
        const result = response.data.result
        this.setState({ feedData: result })
      })
      .catch(error => {
        Alert.alert(JSON.stringify(error))
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> {this.state.feedData} </Text>
        <Button title="Logout" onPress={() => this.logout()} />
      </View>
    );
  }
}



const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 30,
    paddingTop: 80
  },
  banner: {
    height: 90,
    width: '100%'
  },
  input: {
    height: 50,
    width: '100%',
    marginTop: 10,
    padding: 4,
    borderRadius: 5,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec33'
  },
  loginButton: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 40,
    borderRadius: 10,
    justifyContent: 'center'
  },
  registerButton: {
    height: 50,
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  loginButtonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  registerButtonText: {
    fontSize: 18,
    color: '#0007',
    alignSelf: 'center'
  },
  heading: {
    fontSize: 30,
    marginBottom: 40
  },
  error: {
    color: 'red',
    paddingTop: 10
  },
  success: {
    color: 'green',
    paddingTop: 10
  },
  loader: {
    marginTop: 20
  }
});


export default HomeScreen;

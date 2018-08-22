import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
    TouchableHighlight,
    ActivityIndicatorIOS,
    AsyncStorage,
    Alert,
    Text,
    Image,
    View,
    ScrollView,
    Platform
} from 'react-native';

import axios from 'axios'
import { StackActions, NavigationActions } from 'react-navigation';


class LoginScreen extends Component {
    static navigationOptions = {
        title: 'Login Screen',
    };

    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }

        this.validAuthen()
    }

    async validAuthen() {
        const storedToken = await AsyncStorage.getItem("token")
        if (storedToken != null) {
            this.goHomeScreen()
        }
    }

    goHomeScreen(){
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Home' })],
          });
          this.props.navigation.dispatch(resetAction);
    }

    async onLoginPressed() {
        const { username, password } = this.state
        const data = { username: username, password: password }


        axios.post('http://192.168.1.24:8082/api/v1/login', data)
            .then(async response => {
                const result = response.data
                if (result.result == "success") {

                    // save token
                    await AsyncStorage.setItem("token", result.data)

                    // show successful alert
                    Alert.alert("Login Successful", "",
                        [
                            { text: 'OK', onPress: () => this.goHomeScreen() },
                        ])
                } else {
                    Alert.alert("Login Failed")
                }
            })
            .catch(error => {
                console.log(error);
            });

    }

    onRegisterPressed() {
        this.props.navigation.navigate("Register")
    }


    render() {
        return (
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <Image
                        source={require('./imgs/dental.jpg')}
                        resizeMode={'center'}
                        style={styles.banner}
                    />
                    <TextInput
                        onChangeText={(text) => this.setState({ username: text })}
                        keyboardType={'email-address'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        style={styles.input}
                        placeholder="Username"
                    />

                    <TextInput
                        onChangeText={(text) => this.setState({ password: text })}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="Password"
                    />

                    <TouchableHighlight
                        onPress={this.onLoginPressed.bind(this)}
                        style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>
                            Login
                         </Text>
                    </TouchableHighlight>


                    <TouchableHighlight
                        underlayColor={"#FF0"}
                        onPress={this.onRegisterPressed.bind(this)}
                        style={styles.registerButton}>
                        <Text style={styles.registerButtonText}>
                            Dont' have an account, Register?
                         </Text>
                    </TouchableHighlight>

                </View>
            </ScrollView>
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
        height: 180,
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

export default LoginScreen;

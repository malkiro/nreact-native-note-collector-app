import React, { useState } from "react";
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert, Dimensions } from "react-native";
import { TextInput } from 'react-native-paper';
// var { vw, vh, vmin, vmax } = require('react-native-viewport-units');
// const halfWindowsWidth = Dimensions.get('window').width / 2;
const backImage = require("../assets/signup-background.jpg");
import axios from 'axios';

export default function SignUp({ navigation }) {
  const [user, setUser] = useState({
    employeename: '',
    email: '',
    password: ''
  });

  const { employeename, email, password } = user;

  const onInputChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const onSubmit = async () => {
    if (!employeename || !email || !password) {
      Alert.alert('Error', 'Please fill in all the fields.');
      return;
    }

    try {
      await axios.post('user/save', user);
      setUser({
        employeename: '',
        email: '',
        password: ''
      });
      Alert.alert('Registration Successful');
    } catch (error) {
      Alert.alert('Something went wrong!');
    }
  };

    return (
        <View style={styles.container}>
            <Image source={backImage} style={styles.backImage} />
            <View style={styles.whiteSheet} />
            <SafeAreaView style={styles.form}>
                <Text style={styles.title}>Sign Up</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    autoCapitalize="none"
                    // textContentType="emailAddress"
                    name="employeename"
                    mode="outlined"
                    label="Enter your name"
                    activeOutlineColor="#A0D7F6"
                    value={employeename}
          onChangeText={(value) => onInputChange('employeename', value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    // autoFocus={true}
                    name="email"
                    mode="outlined"
                    label="Enter email"
                    activeOutlineColor="#A0D7F6"
                    value={email}
          onChangeText={(value) => onInputChange('email', value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType="password"
                    name="password"
                    mode="outlined"
                    label="Enter password"
                    activeOutlineColor="#A0D7F6"
                    value={password}
          onChangeText={(value) => onInputChange('password', value)}
                />
                <TouchableOpacity style={styles.button} onPress={onSubmit}>
                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}> Sign Up</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                    <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={{ color: '#A0D7F6', fontWeight: '600', fontSize: 14 }}> Login</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <StatusBar barStyle="light-content" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: "#A5D1EE",
        height: '100%',
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: "#A0D7F6",
        alignSelf: "center",
        paddingBottom: 24,
        marginTop: 10
    },
    input: {
        // backgroundColor: "#F6F7FB",
        // height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        paddingLeft: 12,
        paddingRight: 12
    },
    backImage: {
        width: '100%',
        height: '32%',
        position: "relative",
        top: 0,
        resizeMode: 'cover',
    },
    whiteSheet: {
        width: '100%',
        height: '68%',
        position: "absolute",
        bottom: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 80,
        marginTop: -10
    },
    form: {
        // flex: 1,
        justifyContent: 'center',
        marginHorizontal: 30,
    },
    button: {
        backgroundColor: '#A0D7F6',
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
});
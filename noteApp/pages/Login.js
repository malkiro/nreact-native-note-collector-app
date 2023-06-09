import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert, Dimensions } from "react-native";
import { TextInput } from 'react-native-paper';
// var { vw, vh, vmin, vmax } = require('react-native-viewport-units');
// const halfWindowsWidth = Dimensions.get('window').width / 2;
const backImage = require("../assets/login-background.jpg");
import axios from 'axios';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Email and password cannot be empty.');
      return;
    }
    axios.post('user/login', { email, password })
      .then((response) => {
        Alert.alert(response.data.message);
        if (response.data.message === 'Login Success') {
          navigation.navigate('Home');
          setEmail('');
          setPassword('');
        }
      })
      .catch((error) => {
        Alert.alert('Oops...', 'Something went wrong!');
      });
  };

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          mode="outlined"
          label="Enter email"
          activeOutlineColor="#A0D7F6"
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          mode="outlined"
          label="Enter password"
          activeOutlineColor="#A0D7F6"
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}> Login</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={{ color: '#A0D7F6', fontWeight: '600', fontSize: 14 }}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#A0D7F6",
    height: '100%',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "#A0D7F6",
    alignSelf: "center",
    paddingBottom: 24,
    marginTop: 20
  },
  input: {
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    paddingLeft: 12,
    paddingRight: 12
  },
  backImage: {
    width: '100%',
    height: '38%',
    position: "relative",
    top: 0,
    resizeMode: 'cover',
  },
  whiteSheet: {
    width: '100%',
    height: '62%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 80,
    marginTop: -10
  },
  form: {
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: '#A0D7F6',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
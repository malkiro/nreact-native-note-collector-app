import { StyleSheet, Dimensions, Pressable, View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../components/Header'

const windowsWidth = Dimensions.get('window').width;
const windowsHeight = Dimensions.get('window').height;
const halfWindowsHeight = Dimensions.get('window').height / 3;
const homeImage = require("../assets/home-page.jpg");

export default function Home({ navigation }) {
  return (
    <View style={styles.conatiner}>
      <Header />
      <Image source={homeImage} style={styles.homeImage} />
      <Pressable>
        {/* <Text style={styles.greatText}>Hello Good Morning</Text> */}
        <Text style={styles.welcomeText}>Welcome to our Learning Material Note Collector App!</Text>
        {/* <Text style={styles.introText}>Our app is designed to help you easily create, edit, and organize all your notes in one place. Try it out today and transform the way you manage your notes..</Text> */}
      </Pressable>

      <Pressable>
        <TouchableOpacity onPress={() => navigation.navigate('AddNote')}>
          <View style={styles.itemButton}>
            <Text style={styles.title}>Add New Note >></Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MyNotes')}>
          <View style={styles.itemButton}>
            <Text style={styles.title}>View All Notes >></Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('LogOut')}>
          <View style={styles.itemButton}>
            <Text style={styles.title}>Log Out</Text>
          </View>
        </TouchableOpacity>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  conatiner: {
    display: 'flex',
    width: windowsWidth,
    height: windowsHeight,
    // justifyContent: "flex-end",
    alignItems: 'center',
    // marginTop: 40,
    backgroundColor: "#fff"
  },
  itemButton: {
    width: Dimensions.get("window").width - 100,
    height: 50,
    margin: 10,
    backgroundColor: "#A0D7F6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff"
  },
  // greatText: {
  //   fontSize: 20,
  //   textAlign: 'center'
  // },
  welcomeText: {
    fontSize: 22,
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    letterSpacing: 1,
    lineHeight: 40
  },
  // introText: {
  //   marginTop: 20,
  //   fontSize: 16,
  //   textAlign: 'center',
  //   marginLeft: 20,
  //   marginRight: 20,
  //   marginBottom: 20
  // },
  homeImage: {
    width: windowsWidth,
    height: halfWindowsHeight,
  }
})
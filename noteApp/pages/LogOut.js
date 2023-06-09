import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert, Dimensions, Pressable, BackHandler } from "react-native";
const halfWindowsWidth = Dimensions.get('window').width / 2;

const logoutImage = require("../assets/logout-page.jpg");

export default function LogOut({ navigation }) {
    const handleLogout = () => {
        BackHandler.exitApp(); // This will close the app
    };

    return (
        <View style={styles.container}>
            <Image source={logoutImage} style={styles.logoutImage} />
            <View style={styles.whiteSheet} />
            <SafeAreaView style={styles.form}>
                <Text style={styles.title}>Log Out</Text>
                <Text style={styles.logoutText}>You are logged out.</Text>
                <Pressable>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                        <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}> Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleLogout}>
                        <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}> Close App</Text>
                    </TouchableOpacity>
                </Pressable>
            </SafeAreaView>
            <StatusBar barStyle="light-content" />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: "#A2DFF1",
        height: '100%',
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: "#A0D7F6",
        alignSelf: "center",
        paddingBottom: 15,
        marginTop: 20
    },
    logoutImage: {
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
        marginTop: 20,
        marginBottom: 10
    },
    logoutText: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 20
    }
})
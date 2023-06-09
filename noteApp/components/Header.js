import { StyleSheet, View, Text, Image } from 'react-native'
import React from 'react'

const headerImage = require("../assets/notes_icon.png");

export default function Header() {
    return (
        <View style={styles.headerConatiner}>
            <Image source={headerImage} style={styles.headerImage} />
            <Text style={styles.headerTitle}>Your Note Collector</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerConatiner: {
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 70,
        backgroundColor: "#A0D7F6",
        // paddingTop: 10,
        // paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        // alignItems: 'center'
    },
    headerTitle: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
        paddingLeft: 15
    },
    headerImage: {
        width: 30,
        height: 30,
    }
})
// import { View, StyleSheet, Image } from 'react-native'
// import React from 'react'
// import { Card, Text } from 'react-native-paper';
// import LinearGradient from 'react-native-linear-gradient';
// const deleteIcon = require("../assets/delete-icon.png");

// export default function CardPanel() {
//     return (
//         <View>
//             {/* <LinearGradient
//                 colors={['#d4ffbd', '#a0d7f6', '#d3efff']}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 style={styles.gradient}
//             > */}

//             <View style={styles.myNotesBox}>
//                 {notes.map((note, index) => (
//                     <NoteCard key={index} note={note} />
//                 ))}
//             </View>
//             {/* </LinearGradient> */}
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     card: {
//         marginLeft: 10,
//         marginRight: 10,
//         marginTop: 5,
//         marginBottom: 5,
//         borderColor: '#A0D7F6',
//         borderWidth: 1,
//         height: 80
//     },
//     dateText: {
//         fontStyle: 'italic',
//     },
//     wrapper: {
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'center'
//     },
//     leftWrapper: {
//         width: '90%'
//     },
//     rightWrapper: {
//         width: '10%'
//     },
//     deleteIcon: {
//         width: 30,
//         height: 30
//     },
//     contextText: {
//         height: 30
//     }
// })
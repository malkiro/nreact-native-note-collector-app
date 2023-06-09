import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { Card, Text } from 'react-native-paper';
const deleteIcon = require("../assets/delete-icon.png");
import { format } from 'date-fns';
import LinearGradient from 'react-native-linear-gradient';
import { FlatList } from 'react-native-gesture-handler';

export default function MyNotes({ navigation }) {
    const [notes, setNotes] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        loadNotes();
    }, []);

    const loadNotes = async () => {
        try {
            const response = await axios.get('noteapi/notes');
            setNotes(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = async (text) => {
        setSearchText(text);
        try {
            const response = await axios.get(`noteapi/search?searchText=${text}`);
            setNotes(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteNote = async (id) => {
        Alert.alert(
            'Are you sure to delete?',
            '',
            [
                {
                    text: 'No',
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: async () => {
                        try {
                            await axios.delete(`noteapi/note/${id}`);
                            Alert.alert('Note Deleted Successfully');
                            loadNotes();
                        } catch (error) {
                            Alert.alert('Oops...', 'Something went wrong!');
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'yyyy-MM-dd hh:mm a');
    };

    const renderCard = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ViewNote', { noteId: item.id })}>
            <Card style={styles.card}>
                <Card.Content style={styles.wrapper}>
                    <View style={styles.leftWrapper}>
                        <Text style={styles.contextText} variant="titleLarge">
                            {item.title}
                        </Text>
                        <Text style={styles.dateText} variant="bodyMedium">
                            <Text>Added Date: </Text>
                            <Text>{formatDate(item.date)}</Text>
                        </Text>
                    </View>
                    <View style={styles.rightWrapper}>
                        <TouchableOpacity onPress={() => deleteNote(item.id)}>
                            <Image source={deleteIcon} style={styles.deleteIcon} />
                        </TouchableOpacity>
                    </View>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    );

    return (
        <LinearGradient
            colors={['#d4ffbd', '#a0d7f6', '#d3efff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
        >
            <View style={styles.container}>

                <TextInput
                    style={styles.searchInput}
                    placeholder="Search your text here....."
                    value={searchText}
                    onChangeText={handleSearch}
                />

                <FlatList
                    style={styles.myNotesBox}
                    data={notes}
                    renderItem={renderCard}
                    keyExtractor={(item) => item.id.toString()}
                />

            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    card: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5,
        borderColor: '#A0D7F6',
        borderWidth: 1,
        height: 80
    },
    dateText: {
        fontStyle: 'italic',
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftWrapper: {
        width: '90%'
    },
    rightWrapper: {
        width: '10%'
    },
    deleteIcon: {
        width: 30,
        height: 30
    },
    contextText: {
        height: 30
    },
    searchInput: {
        height: 40,
        borderColor: '#A0D7F6',
        borderWidth: 2,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 10
    },
    container: {
        height: '100%',
    },
})
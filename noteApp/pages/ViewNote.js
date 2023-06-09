import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import axios from 'axios';
import { format } from 'date-fns';
import { FlatList } from 'react-native';

const imageUrl = 'http://192.168.8.100:8080/noteapi/download';

export default function ViewNote({ route, navigation }) {
  const [noteDataArray, setNoteDataArray] = useState([]);
  const { noteId } = route.params;

  useEffect(() => {
    fetchNoteData();
  }, []);

  const fetchNoteData = async () => {
    try {
      const response = await axios.get(`noteapi/note/${noteId}`);
      setNoteDataArray([response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd hh:mm a');
  };

  if (!noteDataArray.length) {
    return null; // You can render a loading indicator or placeholder while data is being fetched
  }

  return (
    <View>
      <FlatList
        data={noteDataArray}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card>
            <Card.Content>
              <Text variant="titleLarge">{item.title}</Text>
              <Text style={styles.description} variant="bodyMedium">
                {item.description}
              </Text>
            </Card.Content>
            {item.file_path && (
              <Card.Cover style={styles.img} source={{ uri: `${imageUrl}/${item.file_path}` }} />
            )}
            <Text style={styles.date} variant="bodyMedium">
              Added Date: {formatDate(item.date)}
            </Text>
            <Card.Actions style={styles.buttonWrapper}>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MyNotes')}>
                <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 14 }}> Go Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('EditNote', { noteId: item.id })}
              >
                <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 14 }}> Edit Note</Text>
              </TouchableOpacity>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    marginLeft: 20,
    marginRight: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#A0D7F6',
    height: 38,
    width: 130,
    borderRadius: 30,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  description: {
    marginTop: 20,
    marginBottom: 20,
  },
  img: {
    marginLeft: 20,
    marginRight: 20,
  },
  date: {
    marginTop: 10,
    marginRight: 20,
    fontStyle: 'italic',
    textAlign: 'right',
  },
});
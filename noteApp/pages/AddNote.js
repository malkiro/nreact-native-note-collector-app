import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Pressable, Image, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios'; 
 

export default function AddNote() {
    const [note, setNote] = useState({
        title: '',
        description: '',
        file_path: ''
    });

    const { title, description } = note;
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImagePicker = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            includeBase64: false,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('ImagePicker error: ', response.errorMessage);
            } else {
                setSelectedImage(response.assets[0]);
            }
        });
    };

    const handleCameraPicker = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            includeBase64: false,
        };

        launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled camera picker');
            } else if (response.errorMessage) {
                console.log('CameraPicker error: ', response.errorMessage);
            } else {
                setSelectedImage(response.assets[0]);
            }
        });
    };

    const saveNote = async () => {
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            if (selectedImage) {
                formData.append('image', {
                    uri: selectedImage.uri,
                    type: selectedImage.type,
                    name: selectedImage.fileName
                });
            }

            const response = await axios.post('noteapi/note', formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setNote({
                title: '',
                description: '',
                file_path: '',
            });
            setSelectedImage(null);

            Alert.alert('Note Added Successfully', '', [
                {
                    text: 'OK',
                    onPress: () => { },
                },
            ]);
        } catch (error) {
            Alert.alert('Oops...', 'Something went wrong!', [
                {
                    text: 'OK',
                    onPress: () => { },
                },
            ]);
        }
    };

    const PlaceholderImage = () => (
        <View style={styles.imageContainer}>
            <Text style={styles.placeholderText}>No Image Selected</Text>
        </View>
    );

    const handleDescriptionChange = (text) => {
        if (text.length <= 255) {
            setNote({ ...note, description: text });
        }else{
            Alert.alert('Limit exceed!');
        }
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.contextBox}>
                <LinearGradient
                    colors={['#d4ffbd', '#a0d7f6', '#d3efff']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradient}
                >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Enter title..."
                        value={title}
                        onChangeText={(text) => setNote({ ...note, title: text })}
                    />
                    <TextInput
                        style={styles.inputArea}
                        placeholder="Enter content..."
                        multiline={true}
                        value={description}
                        onChangeText={handleDescriptionChange}
                    />
                    <Pressable style={styles.imageWapper}>
                        {selectedImage ? (
                            <View style={styles.imageContainer}>
                                <Image
                                    source={{ uri: selectedImage.uri }}
                                    style={styles.image}
                                />
                            </View>
                        ) : (
                            <PlaceholderImage />
                        )}
                        <View style={styles.buttonWrapper}>
                            <TouchableOpacity style={styles.button} onPress={handleImagePicker}>
                                <Text style={styles.buttonText}>Select Image</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={handleCameraPicker}>
                                <Text style={styles.buttonText}>Take Photo</Text>
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                </LinearGradient>
            </Pressable>
            <TouchableOpacity style={styles.bottomButton} onPress={saveNote}>
                <Text style={styles.buttonTextSave}>Save Note</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff'
    },
    inputText: {
        borderColor: '#A0D7F6',
        paddingBottom: 0,
        borderBottomWidth: 1,
        marginBottom: 10
    },
    inputArea: {
        marginBottom: 10,
        height: '38%',
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: 'center',
        width: '45%',
        borderRadius: 30,
        borderColor: '#A0D7F6',
        borderWidth: 1
    },
    bottomButton: {
        backgroundColor: '#A0D7F6',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: 'center',
        width: '100%',
        borderRadius: 30,
        marginTop: 15
    },
    buttonText: {
        color: '#A0D7F6',
        fontWeight: 'bold',
    },
    buttonTextSave: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    buttonWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    contextBox: {
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#A0D7F6',
        height: '90%',
    },
    gradient: {
        borderRadius: 20,
        borderColor: '#A0D7F6',
        padding: 15,
        height: '100%',
    },
    imageContainer: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
        width: '100%',
        height: '58%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'lightgray',
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    placeholderText: {
        color: 'gray'
    }
});
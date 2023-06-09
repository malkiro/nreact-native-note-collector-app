import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Pressable, Image, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';


const PlaceholderImage = () => (
    <View style={styles.imageContainer}>
        <Text style={styles.placeholderText}>No Image Selected</Text>
    </View>
);

export default function EditNote({ route, navigation }) {
    const imageUrl = 'http://192.168.8.100:8080/noteapi/download';
    const [selectedImage, setSelectedImage] = useState([]);
    const { noteId } = route.params;
    const [noteData, setNoteData] = useState({
        title: '',
        description: '',
    });

    const { title, description } = noteData;
    const [imgSrc, setImgSrc] = useState('');


    // useEffect(() => {
    //     console.log(noteData)
    //     if (noteData.file_path) {
    //         setSelectedImage(`${imageUrl}/${noteData.file_path}`);
    //     }
    // }, [noteData.file_path, imageUrl]);

    useEffect(() => {
        fetchNoteData();
    }, []);

    const fetchNoteData = async () => {
        try {
            const response = await axios.get(`noteapi/note/${noteId}`);
            setNoteData(response.data);
            if (response.data.file_path != null) {
                setImgSrc(`${imageUrl}/${response.data.file_path}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

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
                setSelectedImage((pre) => pre = response.assets);
                console.log('Selected image URI:', response.assets);
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
                setSelectedImage((pre) => pre = response.assets);
                console.log('Selected image URI:', response.assets);
            }
        });
    };

    const updateNote = async () => {
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            if (selectedImage.length !== 0) {
                formData.append('image', {
                    uri: selectedImage[0].uri,
                    type: selectedImage[0].type,
                    name: selectedImage[0].fileName
                })
            }
            // if (selectedImage) {
            //     const imageUriParts = selectedImage.split('/');
            //     const imageName = imageUriParts[imageUriParts.length - 1];
            // formData.append('image', {
            //     uri: selectedImage,
            //     type: 'image/jpeg', // Update with the correct image type
            //     name: imageName,
            // });
            // }

            // const response = await axios.put(`noteapi/note/${noteId}`, formData, {
            //     headers: { 'Content-Type': 'multipart/form-data' },
            // });

            const response = await axios({
                method: "put",
                url: `noteapi/note/${noteId}`,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
            console.log("test3");
            Alert.alert('Note Updated Successfully');
            //   navigation.navigate('ViewNote', { noteId: response.data.id })
            navigation.navigate('Home');
        } catch (error) {
            console.error(error);
            Alert.alert('Oops...', 'Something went wrong!');
        }
    };
    const handleDescriptionChange = (text) => {
        if (text.length <= 255) {
            setNoteData({ ...noteData, description: text });
        } else{
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
                        value={noteData.title}
                        onChangeText={(text) => setNoteData({ ...noteData, title: text })}
                    />
                    <TextInput
                        style={styles.inputArea}
                        placeholder="Enter content..."
                        multiline={true}
                        value={noteData.description}
                        // onChangeText={(text) => setNoteData({ ...noteData, description: text })}
                        onChangeText={handleDescriptionChange}
                    />
                    <Pressable style={styles.imageWapper}>
                        {/* {selectedImage &&
                            selectedImage.length != 0 ? (
                            <View style={styles.imageContainer}>
                                <Image
                                    source={{ uri: selectedImage[0].uri }}
                                    style={styles.image}
                                />
                            </View>
                        ) : (
                            <PlaceholderImage />
                        )}  */}

                        {selectedImage && selectedImage.length !== 0 ? (
                            <View style={styles.imageContainer}>
                                <Image
                                    source={{ uri: selectedImage[0].uri }}
                                    style={styles.image}
                                />
                            </View>
                        ) : (
                            imgSrc ? (
                                <View style={styles.imageContainer}>
                                <Image source={{ uri: imgSrc }} style={styles.image} />
                                </View>
                            ) : (
                                <PlaceholderImage />
                            )
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
            <TouchableOpacity style={styles.bottomButton} onPress={updateNote}>
                <Text style={styles.buttonTextUpdate}>Update Note</Text>
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
        // padding: 15,
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
        // padding: 5,
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
        marginBottom: 20,

    },
    placeholderText: {
        color: 'gray'
    }
});

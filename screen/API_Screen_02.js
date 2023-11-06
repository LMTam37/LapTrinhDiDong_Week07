import { View, Text, Image, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';

const API_Screen_02 = () => {
    const [notes, setNotes] = useState([]);
    const [currentEditedNoteId, setCurrentEditedNoteId] = useState(null);
    const [editedNoteText, setEditedNoteText] = useState('');

    useEffect(() => {
        fetch('https://654099fc45bedb25bfc2266a.mockapi.io/note')
            .then((response) => response.json())
            .then((data) => {
                setNotes(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const deleteNote = async (itemId) => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== itemId));
        await fetch(`https://654099fc45bedb25bfc2266a.mockapi.io/note/${itemId}`, {
            method: 'DELETE',
        });
    };

    const toggleEditMode = (itemId) => {
        if (currentEditedNoteId === itemId) {
            editNote(itemId, editedNoteText);
        } else {
            setCurrentEditedNoteId(itemId);
            const editedNote = notes.find((note) => note.id === itemId);
            setEditedNoteText(editedNote.job);
        }
    };

    const editNote = async (itemId, newText) => {
        await fetch(`https://654099fc45bedb25bfc2266a.mockapi.io/note/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ job: newText }),
        });

        setNotes((prevNotes) =>
            prevNotes.map((note) => (note.id === itemId ? { ...note, job: newText } : note))
        );


        setCurrentEditedNoteId(null);
    };

    return (

        <View style={{ flex: 1, paddingHorizontal: 26 }}>
            <TextInput
                placeholder='Search'
                style={{
                    borderWidth: 1,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    marginBottom: 100
                }}
            />
            <View style={{ width: '100%', alignItems: 'center', }}>
                <FlatList
                    style={{ width: '100%', }}
                    data={notes}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                flexDirection: 'row',
                                backgroundColor: 'rgba(222, 225, 230, 0.47)',
                                paddingVertical: 10,
                                paddingHorizontal: 50,
                                borderRadius: 24
                            }}>
                            <TouchableOpacity onPress={() => deleteNote(item.id)}>
                                <Image
                                    source={require('../assets/Frame (1).png')}
                                    style={{
                                        width: 24,
                                        height: 24,
                                        position: 'absolute',
                                        left: -30
                                    }}
                                />
                            </TouchableOpacity>

                            <TextInput
                                style={{
                                    color: '#171A1F',
                                    fontSize: 16,
                                    fontWeight: 700,
                                    width: '100%',
                                    paddingVertical: 1,
                                    borderWidth: currentEditedNoteId === item.id ? 1 : 0
                                }}
                                value={currentEditedNoteId === item.id ? editedNoteText : item.job}
                                onChangeText={(text) => {
                                    if (currentEditedNoteId !== item.id) {
                                        setCurrentEditedNoteId(item.id);
                                    }
                                    setEditedNoteText(text);
                                }}
                                autoFocus={currentEditedNoteId === item.id}
                                editable={currentEditedNoteId === item.id}
                            />

                            <TouchableOpacity onPress={() => toggleEditMode(item.id)}>
                                <Image
                                    source={require('../assets/Frame (2).png')}
                                    style={{
                                        width: 24,
                                        height: 24,
                                        position: 'absolute',
                                        right: -30
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                />
                <TouchableOpacity
                    style={{
                        backgroundColor: '#00BDD6',
                        width: 69,
                        height: 69,
                        borderRadius: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginVertical: 30
                    }}>
                    <AntDesign name="plus" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default API_Screen_02
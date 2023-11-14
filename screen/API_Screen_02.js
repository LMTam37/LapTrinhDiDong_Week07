import { View, Text, Image, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';

const API_Screen_02 = ({ route, navigation }) => {
    const [user, setUser] = useState(route.params.user)
    const [notes, setNotes] = useState(user?.jobs);
    const [currentEditedNoteId, setCurrentEditedNoteId] = useState(null);
    const [editedNoteText, setEditedNoteText] = useState('');
    const [searchValue, setSearchValue] = useState('');

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerRight: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                    <Image
                        source={{ uri: user?.avatar }}
                        style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10, backgroundColor: '#D9CBF6' }}
                    />
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Hi {user?.userName}</Text>
                        <Text style={{ opacity: 0.75, fontWeight: 700 }}>Have a grate day ahead</Text>
                    </View>
                </View>
            ),
        });
    }, [navigation, user]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchNotes();
        });

        return unsubscribe;
    }, []);

    const fetchNotes = () => {
        fetch(`https://654099fc45bedb25bfc2266a.mockapi.io/note?userName=${route.params.user.userName}`)
            .then((response) => response.json())
            .then((data) => {
                setUser(data[0]);
                setNotes(data[0].jobs)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const deleteNote = async (jobId) => {
        const updatedJobs = notes.filter((job) => job.job_id !== jobId);
        setNotes(updatedJobs);

        await fetch(`https://654099fc45bedb25bfc2266a.mockapi.io/note/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...user, jobs: updatedJobs }),
        });
    };

    const toggleEditMode = (itemId) => {
        if (currentEditedNoteId === itemId) {
            editNote(itemId, editedNoteText);
        } else {
            setCurrentEditedNoteId(itemId);
            const editedNote = notes.find((job) => job.job_id === itemId);
            setEditedNoteText(editedNote.job_name);
        }
    };

    const editNote = async (itemId, newText) => {
        let newNotes;
        setNotes((prevNotes) =>
            newNotes = prevNotes.map((note) =>
                note.job_id === itemId ? { ...note, job_name: newText } : note
            )
        );

        setCurrentEditedNoteId(null);

        try {
            const response = await fetch(`https://654099fc45bedb25bfc2266a.mockapi.io/note/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...user, jobs: newNotes }),
            });
        } catch (error) {
            console.error(error);
        }
    };

    const searchNotes = (text) => {
        setSearchValue(text);

        if (text.trim() === '') {
            setNotes(user?.jobs);
        } else {
            const filteredNotes = user?.jobs.filter((note) =>
                note.job_name.toLowerCase().includes(text.toLowerCase())
            );
            setNotes(filteredNotes);
        }
    };

    return (

        <View style={{ flex: 1, paddingHorizontal: 26, backgroundColor: '#fff' }}>
            <TextInput
                placeholder='Search'
                style={{
                    borderWidth: 1,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    marginBottom: 100
                }}
                value={searchValue}
                onChangeText={searchNotes}
            />
            <View style={{ width: '100%', alignItems: 'center', }}>
                <FlatList
                    style={{ width: '100%', }}
                    data={notes}
                    keyExtractor={(item) => item.job_id}
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
                            <TouchableOpacity onPress={() => deleteNote(item.job_id)}>
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
                                    borderWidth: currentEditedNoteId === item.job_id ? 1 : 0
                                }}
                                value={currentEditedNoteId === item.job_id ? editedNoteText : item.job_name}
                                onChangeText={(text) => {
                                    if (currentEditedNoteId !== item.job_id) {
                                        setCurrentEditedNoteId(item.job_id);
                                    }
                                    setEditedNoteText(text);
                                }}
                                autoFocus={currentEditedNoteId === item.job_id}
                                editable={currentEditedNoteId === item.job_id}
                            />

                            <TouchableOpacity onPress={() => toggleEditMode(item.job_id)}>
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
                    }}
                    onPress={() => { navigation.navigate('screen03', { user: user }) }}
                >
                    <AntDesign name="plus" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default API_Screen_02
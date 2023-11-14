import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const API_Screen_01 = ({ route, navigation }) => {
    const [userName, setuserName] = useState('Twinkle')
    const [user, setUser] = useState([])

    const handleGetStarted = async () => {
        const userData = await fetchNotes(userName);
        setUser(userData);

        if (userData) {
            console.log(userData);
            navigation.navigate('screen02', { user: userData });
        } else {
            console.log('User not found');
        }
    };

    const fetchNotes = async (userName) => {
        try {
            const response = await fetch(`https://654099fc45bedb25bfc2266a.mockapi.io/note?userName=${userName}`);
            const data = await response.json();
            return data.length > 0 ? data[0] : null;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 28, backgroundColor: "#fff" }}>
            <Image
                source={require('../assets/image.png')}
                style={{
                    width: 243,
                    height: 243
                }}
            />
            <Text style={{
                color: '#8353E2',
                fontSize: 24
            }}>MANAGE YOUR{'\n'}TASK</Text>
            <TextInput
                style={{ borderWidth: 1, width: '100%', borderRadius: 4, paddingVertical: 9, paddingHorizontal: 16 }}
                placeholder='Enter your name'
                value={userName}
                onChangeText={setuserName} />
            <TouchableOpacity
                style={{
                    paddingVertical: 9,
                    paddingHorizontal: 30,
                    backgroundColor: '#00BDD6',
                    borderRadius: 12
                }}
                onPress={handleGetStarted}
            >
                <Text style={{ fontSize: 16, color: '#fff' }}>GET STARTED</Text>
            </TouchableOpacity>
        </View >
    )
}

export default API_Screen_01
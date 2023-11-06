import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const API_Screen_01 = ({ route, navigation }) => {
    const [user, setUser] = useState('')
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
                onChangeText={setUser} />
            <TouchableOpacity
                style={{
                    paddingVertical: 9,
                    paddingHorizontal: 30,
                    backgroundColor: '#00BDD6',
                    borderRadius: 12
                }}
                onPress={() => { navigation.navigate('screen02') }}
            >
                <Text style={{ fontSize: 16, color: '#fff' }}>GET STARTED</Text>
            </TouchableOpacity>
        </View >
    )
}

export default API_Screen_01
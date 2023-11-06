import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
const API_Screen_03 = () => {
    const [jobInput, setJobInput] = useState('');

    const handleFinish = async () => {
        try {
            const response = await fetch('https://654099fc45bedb25bfc2266a.mockapi.io/note', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ job: jobInput }),
            });

            if (response.ok) {
                setJobInput('');
                alert('Job added successfully!');
            } else {
                alert('Failed to add job');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
            <Text style={{ fontSize: 32, fontWeight: 700 }}>ADD YOUR JOB</Text>
            <View style={{ width: '100%', paddingHorizontal: 28 }}>
                <Image
                    source={require('../assets/Frame.png')}
                    style={{
                        width: 24,
                        height: 24,
                        marginRight: 10,
                        position: 'absolute',
                        left: 40,
                        top: 13
                    }}
                />
                <TextInput
                    style={{
                        borderColor: '#000',
                        borderWidth: 1,
                        paddingVertical: 12,
                        paddingLeft: 40,
                        paddingRight: 10,
                        borderRadius: 4,
                    }}
                    placeholder='input your job'
                    value={jobInput}
                    onChangeText={(text) => setJobInput(text)}
                />
            </View>
            <TouchableOpacity
                style={{
                    backgroundColor: '#00BDD6',
                    paddingVertical: 9,
                    paddingHorizontal: 60,
                    borderRadius: 12
                }}
                onPress={handleFinish}
            >
                <Text style={{ fontSize: 16, color: "#fff" }}>FINISH</Text>
            </TouchableOpacity>
            <Image source={require('../assets/image.png')} style={{ width: 190, height: 170 }} />
        </View>
    )
}

export default API_Screen_03
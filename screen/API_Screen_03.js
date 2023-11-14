import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';

const API_Screen_03 = ({ route, navigation }) => {
    const [user, setUser] = useState(route.params.user)
    const [jobInput, setJobInput] = useState('');

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerRight: () => (
                <TouchableOpacity
                    style={{ marginRight: 35 }}
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="arrowleft" size={24} color="#000" />
                </TouchableOpacity>
            ),
            headerLeft: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 35 }}>
                    <Image
                        source={{ uri: user.avatar }}
                        style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10, backgroundColor: '#D9CBF6' }}
                    />
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Hi {user.userName}</Text>
                        <Text style={{ opacity: 0.75, fontWeight: 700 }}>Have a grate day ahead</Text>
                    </View>
                </View>
            )
        });
    }, [navigation, user]);

    const addJob = async (newJob) => {
        const updatedUser = { ...user, jobs: [...user.jobs, newJob] };

        setUser(updatedUser);

        await fetch(`https://654099fc45bedb25bfc2266a.mockapi.io/note/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        });
    };

    const handleAddJob = async () => {
        const lastJob = user.jobs[user.jobs.length - 1];

        const newJobId = lastJob ? lastJob.job_id + 1 : 1;

        const newJob = {
            job_id: newJobId,
            job_name: jobInput,
        };

        addJob(newJob);

        setJobInput('');
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#fff' }}>
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
                onPress={handleAddJob}
            >
                <Text style={{ fontSize: 16, color: "#fff" }}>FINISH</Text>
            </TouchableOpacity>
            <Image source={require('../assets/image.png')} style={{ width: 190, height: 170 }} />
        </View>
    )
}

export default API_Screen_03
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import API_Screen_02 from './screen/API_Screen_02';
import API_Screen_03 from './screen/API_Screen_03';
import API_Screen_01 from './screen/API_Screen_01';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='screen01' component={API_Screen_01} options={{ headerShown: false }} />
        <Stack.Screen name='screen02' component={API_Screen_02} />
        <Stack.Screen name='screen03' component={API_Screen_03} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

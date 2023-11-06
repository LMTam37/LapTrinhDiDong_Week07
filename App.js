import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import API_Screen_02 from './screen/API_Screen_02';
import API_Screen_03 from './screen/API_Screen_03';

export default function App() {
  return (
    <API_Screen_03 />
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

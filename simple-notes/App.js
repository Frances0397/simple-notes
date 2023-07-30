import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, Card, Button, Icon, ThemeProvider, createTheme } from '@rneui/themed';
import { Header, HeaderProps } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import CardView from './components/CardView';
import ListView from './components/ListView';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const theme = createTheme({
  colors: {
    background: '#001524',   // Background color of the app
    primary: '#15616D',      // Your primary color
    secondary: '#FF7D00',    // Your secondary color
  },
  Text: {
    style: {
      color: '#FFECD1',      // Text color
      fontSize: 16,
    },
  },
  mode: 'dark',
});

export default function App() {

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   //Function to make the API call
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://192.168.43.181:3000');
  //       setData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get('/notes');
  //     console.log(response.data);
  //     setData(response.data); // Store the fetched data in the state
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  // return (
  //   <View style={styles.container}>
  //     {data ? <Text>{JSON.stringify(data)}</Text> : <Text>Loading...</Text>}
  //     <StatusBar style="auto" />
  //   </View>
  // );

  const [showCardView, setShowCardView] = useState(true);

  const switchView = () => {
    setShowCardView(!showCardView);
  };

  const addNote = () => {
    //TO-DO: handle switching to content view
    alert("Add note");
  };

  const createData = async (oNote) => { //SPOSTARE nell'evento giusto
    try {
      const response = await axios.post('http://192.168.1.62:3000/notes', oNote);
      console.log(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <View style={styles.container}>
          <Header
            containerStyle={{ backgroundColor: theme.colors.primary }}
            leftComponent={
              <Ionicons name={showCardView ? "menu" : "grid-outline"} size={24} color="white" onPress={switchView} />
            }
          />
          {showCardView ? <CardView /> : <ListView />}
          <View style={styles.bottomContainer}>
            <Button
              icon={<Ionicons name="ios-add" size={24} color="#FFECD1" />}
              buttonStyle={styles.addButton}
              onPress={addNote}
            />
          </View>
        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    // alignItems: 'flex-start',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, Card, Button, Icon, ThemeProvider, createTheme } from '@rneui/themed';
import { Header, HeaderProps } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
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

  const [data, setData] = useState(null);

  useEffect(() => {
    //Function to make the API call
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.43.181:3000');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // return (
  //   <View style={styles.container}>
  //     {data ? <Text>{JSON.stringify(data)}</Text> : <Text>Loading...</Text>}
  //     <StatusBar style="auto" />
  //   </View>
  // );

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <View style={styles.container}>
          <Header
            containerStyle={{ backgroundColor: theme.colors.primary }}
            leftComponent={
              <Icon name="menu" size={24} color="white" />
            }
          />
          {data ? <Text>{JSON.stringify(data)}</Text> : <Text>Loading...</Text>}
          <Button title="Basic button"></Button>
        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'flex-start',
  },
  content: {
    flex: 1
  }
});

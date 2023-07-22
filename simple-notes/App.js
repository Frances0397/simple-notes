import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  return (
    <View style={styles.container}>
      {data ? <Text>{JSON.stringify(data)}</Text> : <Text>Loading...</Text>}
      <StatusBar style="auto" />
    </View>
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

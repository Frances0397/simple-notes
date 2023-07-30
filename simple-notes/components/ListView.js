import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ListItem } from '@rneui/themed';
import axios from 'axios';

export default function ListView() {
    const [data, setData] = useState([]); //TO-DO: vedere se la parte di chiamata, visto che è uguale per le due viste, si può modularizzare

    // Make the API call using Axios when the component mounts
    useEffect(() => {
        //Function to make the API call
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://192.168.1.62:3000/notes');
            console.log(response.data);
            setData(response.data); // Store the fetched data in the state
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                {data.map((item) => (
                    <ListItem key={item.id} style={styles.list}>
                        <ListItem.Content>
                            <ListItem.Title>{item.title}</ListItem.Title>
                            <ListItem.Subtitle><Text style={styles.text} numberOfLines={4} ellipsizeMode="tail">{item.content}</Text></ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </View>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 10,
        // backgroundColor: '#fff',
        // // alignItems: 'center',
        // // alignContent: 'center',
        // alignSelf: 'center',
        // flexDirection: 'row', // Set the flex direction to "row"
        // flexWrap: 'wrap', // Allow the items to wrap to the next row
        // justifyContent: 'flex-start', // Align items with space between thems
    },
    list: {
        flex: 1,
        backgroundColor: 'white',
        flexWrap: 'wrap',
    }
});
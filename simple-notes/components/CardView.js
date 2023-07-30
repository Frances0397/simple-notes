import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from '@rneui/themed';
import axios from 'axios';

export default function CardView() {
    const [data, setData] = useState([]);

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
                    <Card key={item.id} containerStyle={styles.cardContainer} wrapperStyle={styles.card}>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Divider />
                        <Text style={styles.text} numberOfLines={4} ellipsizeMode="tail">{item.content}</Text>
                        {/* Add other content or customizations to the Card as needed */}
                    </Card>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#001524',
        alignItems: 'flex-start',
        // alignContent: 'center',
        // alignSelf: 'center',
        flexDirection: 'row', // Set the flex direction to "row"
        flexWrap: 'wrap', // Allow the items to wrap to the next row
        justifyContent: 'space-between', // Align items with space between thems
    },
    cardContainer: {
        borderRadius: 15, // Customize the border radius as desired
        borderWidth: 0, // Remove the outline (border)
        backgroundColor: '#FF7D00',
        // flexDirection: 'row', // Set the flex direction to "row"
        // flexWrap: 'wrap', // Allow the items to wrap to the next row
        //elevation: 3, // Add elevation (shadow) for Android devices
        width: '40%', // Set a fixed width for the card
        height: 150, // Set a fixed height for the card
        marginBottom: 10,
    },
    card: {
        borderWidth: 0,
        borderRadius: 20,
    },
    text: {
        color: '#FFECD1',
    },
});


import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { Card, Input, Button } from '@rneui/themed';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const cardWidthPercentage = 91; // Adjust this value to change the card width

const cardWidth = (screenWidth * cardWidthPercentage) / 100;
const marginValue = 15; // Adjust this value to set the desired margin  

export default function CardContent() {
    const showInfo = () => {
        alert("show note info");
    };

    return (
        <ScrollView>
            <Card
                //  key={item.id} 
                containerStyle={styles.cardContainer} wrapperStyle={styles.card}
            >
                {/* <Card.Title style={styles.title}>Contenuto</Card.Title> */}
                <TextInput numberOfLines={1} ellipsizeMode="tail" style={styles.title}>Titolo</TextInput>
                <Card.Divider />
                {/* <Text style={styles.text}></Text> */}
                {/* <Input inputStyle={styles.text}>Lorem er ultricies, lacus lectus gravida s</Input> */}
                <TextInput multiline numberOfLines={null} style={styles.text}>rat dictum, magna sem porttitor elit</TextInput>
                <View style={styles.bottomContainer}>
                    <Button
                        icon={<Ionicons name="information-circle-outline" size={24} color="#FFECD1" />}
                        buttonStyle={styles.infoButton}
                        onPress={showInfo}
                    />
                </View>
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    container: {
        // flex: 1,
        // // padding: 10,
        // backgroundColor: '#001524',
        // alignItems: 'flex-start',
        // // alignContent: 'center',
        // // alignSelf: 'center',
        flexDirection: 'row', // Set the flex direction to "row"
        flexWrap: 'wrap', // Allow the items to wrap to the next row
        justifyContent: 'space-between', // Align items with space between thems
    },
    touchableCard: {
        width: '50%',
        // height: 150,
    },
    cardContainer: {
        borderRadius: 15, // Customize the border radius as desired
        borderWidth: 0, // Remove the outline (border)
        backgroundColor: '#FF7D00',
        // flexDirection: 'row', // Set the flex direction to "row"
        // // flexWrap: 'wrap', // Allow the items to wrap to the next row
        // //elevation: 3, // Add elevation (shadow) for Android devices
        width: cardWidth, // Set a fixed width for the card
        marginBottom: 15,
        marginHorizontal: marginValue,
    },
    card: {
        // borderWidth: 0,
        // borderRadius: 20,
    },
    text: {
        color: '#FFECD1',
        fontSize: 17,
    },
    title: {
        color: '#FFECD1',
        fontSize: 21,
        fontWeight: 'bold',
    },
    bottomContainer: {
        backgroundColor: '#FF7D00',
        flexDirection: "row-reverse",
        alignItems: "flex-end",
        marginTop: 10
    },
    infoButton: {
        backgroundColor: '#FF7D00',
    }
});
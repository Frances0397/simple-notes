import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, Card, Button, Icon, ThemeProvider, createTheme } from '@rneui/themed';
import { Header, HeaderProps } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import CardView from '../components/CardView'
import ListView from '../components/ListView';
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
    const navigation = useNavigation(true);

    const [showCardView, setShowCardView] = useState(true);
    const [selectionMode, setSelectionMode] = useState(true);
    const [selectedItems, setSelectedItems] = useState([]);
    const [triggerRefresh, setTriggerRefresh] = useState(false);

    const switchView = () => {
        setShowCardView(!showCardView);
        setSelectionMode(false);
        setSelectedItems([]);
        setTriggerRefresh(false);
    };

    const addNote = () => {
        //TO-DO: handle switching to content view
        console.log("Nav to card detail page");
        navigation.navigate("Detail", { id: "-1" });
        setTriggerRefresh(false);
    };

    const handleToggleSelectionMode = () => {
        setSelectionMode(!selectionMode);
        setSelectedItems([]);
        setTriggerRefresh(false);
    };

    const stopSelectionMode = () => {
        setSelectionMode(false);
        setTriggerRefresh(false);
    };

    const deleteSelected = () => {
        console.log("Delete selected items");
        console.log(selectedItems);
        //loop at the items to delete and make a delete call for each one
        for (let i = 0; i < selectedItems.length; i++) {
            console.log(selectedItems[i].id); //testing purposes
            deleteNote(selectedItems[i].id);
        }
        setSelectionMode(false);
    };

    const deleteNote = async (noteId) => {
        try {
            const response = await axios.delete('http://192.168.43.181:3000/note/' + noteId);
            console.log(response.data);
            setTriggerRefresh(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSelectedItems = (newSelectedItems) => {
        setSelectedItems(newSelectedItems);
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
                        rightComponent={selectionMode && <Ionicons name="close" size={24} onPress={stopSelectionMode} />}
                    />
                    {showCardView ? <CardView selectionMode={selectionMode} toggleSelectionMode={handleToggleSelectionMode}
                        handleSelectedItems={handleSelectedItems} selectedItems={selectedItems} refresh={triggerRefresh} /> :
                        <ListView selectionMode={selectionMode} toggleSelectionMode={handleToggleSelectionMode}
                            handleSelectedItems={handleSelectedItems} selectedItems={selectedItems} refresh={triggerRefresh} />}
                    <View style={styles.bottomContainer}>
                        <Button
                            icon={<Ionicons name={selectionMode ? "trash-outline" : "ios-add"} size={24} color="#FFECD1" />}
                            buttonStyle={styles.addButton}
                            onPress={() => { if (!selectionMode) { addNote(); } else { deleteSelected(); } }}
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

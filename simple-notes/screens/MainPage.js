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

    const switchView = () => {
        setShowCardView(!showCardView);
    };

    const addNote = () => {
        //TO-DO: handle switching to content view
        console.log("Nav to card detail page");
        navigation.navigate("Detail", { id: "-1" });
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

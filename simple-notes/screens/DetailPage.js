import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, Card, Button, Icon, ThemeProvider, createTheme } from '@rneui/themed';
import { Header, HeaderProps } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import CardContent from '../components/CardContent';
import CardDetail from '../components/CardDetail';

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

export default function DetailPage() {
    const navBack = () => {
        navigation.goBack();
    };

    const navigation = useNavigation(true);

    const [showContent, setShowContent] = useState(true);
    const [content, setContent] = useState("");

    const switchView = () => {
        setShowContent(!showContent);
        setSwitched(true);
    };

    const handleContent = (value) => {
        setContent(value);
    };

    //handle keeping the content and the title when switching from one child view to the other
    const [title, setTitle] = useState('');
    const [switched, setSwitched] = useState(false);

    const handleTitle = (value) => {
        setTitle(value);
    };

    return (
        <SafeAreaProvider>
            <ThemeProvider theme={theme}>
                <View style={styles.container}>
                    <Header
                        containerStyle={{ backgroundColor: theme.colors.primary }}
                        leftComponent={
                            <Ionicons name={"chevron-back"} size={24} color="white" onPress={navBack} />
                        }
                        rightComponent={
                            <Ionicons name={showContent ? "information-outline" : "repeat"} size={24} color="white" onPress={switchView} />
                        }
                    />
                    {showContent ? <CardContent content={content} handleContent={handleContent}
                        switched={switched} title={title} handleTitle={handleTitle} /> : <CardDetail content={content} />}
                </View>
            </ThemeProvider>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: 'flex-start',
        flexDirection: "column"
        // alignSelf: 'center',
        // justifyContent: 'center',
    },
});
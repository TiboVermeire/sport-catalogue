import React from "react";
import { StyleSheet, Text, View, Linking, Button, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Define the types for your navigation stack
type RootStackParamList = {
  Olympics: undefined;
  Home: undefined;
};

// Define the props that the OlympicsScreen will receive
type OlympicsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Olympics'>;

type OlympicsScreenProps = {
  navigation: OlympicsScreenNavigationProp;
};

const OlympicsScreen: React.FC<OlympicsScreenProps> = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.Text}>Krijg je maar niet genoeg van al die sporten?</Text>
            </View>

            <View style={styles.Button}>
                <Button
                    title="Olympische spelen Parijs"
                    onPress={() => Linking.openURL('https://www.os2024parijs.nl/programma/')}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    Text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    Button: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default OlympicsScreen;

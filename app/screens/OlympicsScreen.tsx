import React from "react";
import { StyleSheet, Text, View, Linking, Button, ScrollView, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Olympics: undefined;
  Home: undefined;
};

type OlympicsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Olympics'>;

type OlympicsScreenProps = {
  navigation: OlympicsScreenNavigationProp;
};

const OlympicsScreen: React.FC<OlympicsScreenProps> = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            <Image
                source={require('../../assets/images/olympic-rings.png')}
                style={styles.image}
            />
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    Are you excited to get to know more about all these sports? 
                    Go follow the Olympics in Paris on their website!
                </Text>
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    title="Olympics 2024"
                    onPress={() => Linking.openURL('https://www.os2024parijs.nl/programma/')}
                    color={'#000'}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#505050',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginVertical: 10,
    },
    textContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        color: '#fff',
    },
    buttonContainer: {
        marginVertical: 20,
        backgroundColor: '#39FF14',
        borderRadius: 5,
        overflow: 'hidden',
    },
});

export default OlympicsScreen;

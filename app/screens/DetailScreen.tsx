import React from 'react';
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Sport } from '../RootStackParamList';

type RootStackParamList = {
  Home: undefined;
  Detail: { sport: Sport };
  Olympics: undefined;
};

type DetailScreenProps = StackScreenProps<RootStackParamList, 'Detail'>;

const DetailScreen: React.FC<DetailScreenProps> = ({ route }) => {
  const { title, imageUrl, sportDescription, sportPrice } = route.params.sport;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <Text style={styles.description}>{sportDescription}</Text>
        <Text style={styles.price}>Price: ${sportPrice}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the background color covers the entire screen
    backgroundColor: '#505050',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#39FF14',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: '#fff',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: 250,
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default DetailScreen;

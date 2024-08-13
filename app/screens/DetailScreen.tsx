import React from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Sport } from '../RootStackParamList';

type RootStackParamList = {
  Home: undefined;
  Detail: { sport: Sport };
  Olympics: undefined;
};

type DetailScreenProps = StackScreenProps<RootStackParamList, 'Detail'>;

const DetailScreen: React.FC<DetailScreenProps> = ({ navigation, route }) => {
  const { title, imageUrl, sportDescription, sportPrice } = route.params.sport;

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Home')}>
        <Text style={{ padding: 10 }}>Go back to Home</Text>
      </TouchableWithoutFeedback>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <Text style={styles.description}>{sportDescription}</Text>
        <Text style={styles.price}>Price: ${sportPrice}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: '#888',
  },
  image: {
    width: '100%',
    height: '100%',
    marginVertical: 10,
  },
});

export default DetailScreen;

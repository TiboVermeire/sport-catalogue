// DetailScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetailScreen = ({ route }) => {
  const { sport } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{sport.title}</Text>
      <Text style={styles.description}>{sport.sportDescription}</Text>
      <Text style={styles.price}>Price: ${sport.sportPrice}</Text>
    </View>
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
});

export default DetailScreen;

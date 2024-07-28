import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

interface Sport {
  id: number;
  title: string;
  sportDescription: string;
  sportPrice: number;
  sportImage: string;
}

const HomeScreen = () => {
  const [content, setContent] = useState<Sport[]>([]);

  // Fetch data from the API
  const getItems = async () => {
    try {
      const response = await axios.get('http://dev3-craft.ddev.site/sports');
      setContent(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  // veranderd https naar http zodat images laden
  const convertHttpsToHttp = (url: string) => {
    return url.replace(/^https:/, 'http:');
  };

  const handleImageError = (error: any) => {
    console.error('Image load error:', error);
    Alert.alert('Image Load Error', 'There was an issue loading an image.');
  };

  return (
    <FlatList
      data={content}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        const imageUrl = convertHttpsToHttp(item.sportImage); 

        return (
          <View style={styles.itemContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Image 
              source={{ uri: imageUrl }} 
              style={styles.image} 
              onError={handleImageError} 
            />
            <Text style={styles.price}>Price: ${item.sportPrice}</Text>
          </View>
        );
      }}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Home Screen</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  price: {
    fontSize: 16,
  },
  headerContainer: {
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;

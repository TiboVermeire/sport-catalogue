import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, Image, StyleSheet, Button, Alert, TouchableWithoutFeedback } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Sport } from '../RootStackParamList';
import { useCart } from '../CartContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const correctImageUrl = (url: string) => {
  return url.replace(/(http:\/\/)(.*)(http:\/\/)/, '$1$2https://');
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [content, setContent] = useState<Sport[]>([]);
  const { addToCart } = useCart();

  // Functie om de data op te halen uit de API
  const getItems = async () => {
    try {
      const response = await axios.get('http://dev3-craft.ddev.site/sports');
      const data = response.data.data;
      // Juiste imageUrl toevoegen aan de data
      const updatedData = data.map((item: Sport) => ({
        ...item,
        imageUrl: correctImageUrl(item.sportImage)
      }));
      setContent(updatedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //state hook om de data op te halen
  useEffect(() => {
    getItems();
  }, []);

  const handleImageError = (error: any) => {
    console.error('Image load error:', error);
    Alert.alert('Image Load Error', 'There was an issue loading an image.');
  };

  return (
    <FlatList
      data={content}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      renderItem={({ item }) => {
        return (
          <View style={styles.itemContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Image 
              source={{ uri: item.imageUrl }} 
              style={styles.image} 
              onError={handleImageError} 
            />
            <Text style={styles.price}>Price: ${item.sportPrice}</Text>
            <View style={styles.buttons}>
              <View style={styles.buttonContainer}>
                <Button
                  title="Add to Cart" 
                  onPress={() => addToCart(item)} 
                  color="#000"
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  title="Explore" 
                  onPress={() => navigation.navigate('Detail', { sport: item })}
                  color="#000"
                />
              </View>
            </View>
          </View>
        );
      }}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Sports</Text>

          <View style= {styles.buttons}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('Olympics')}>
            <View style={styles.buttonContainer}>
              <Text style={styles.olympics}>View Olympics</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('Cart')}>
            <View style={styles.buttonContainer}>
              <Text style={styles.olympics}>View Cart</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      }/>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#505050',
    margin: 8,
    padding: 10,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#39FF14',
    textAlign: 'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginVertical: 10,
    borderRadius: 20,
  },
  price: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: '#39FF14',
    borderRadius: 5,
    fontSize: 12,
    margin: 5,
    color: '#000',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor:'#f0f0f0',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  olympics: {
    display: 'flex',
    justifyContent: 'flex-start',
    fontSize: 18,
    color: '#000',
    padding: 10,
  },
  buttons: { 
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'center',
    width: '100%',
  },
});

export default HomeScreen;

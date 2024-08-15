import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, Image, StyleSheet, Button, Alert, TextInput, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Sport } from '../RootStackParamList';
import { useCart } from '../cartContext'; 

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const correctImageUrl = (url: string) => {
  return url.replace(/(http:\/\/)(.*)(http:\/\/)/, '$1$2https://');
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [content, setContent] = useState<Sport[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query
  const { addToCart, cartItems } = useCart();

  // Function to fetch data from the API
  const getItems = async () => {
    try {
      const response = await axios.get('http://dev3-craft.ddev.site/sports');
      const data = response.data.data;
      const updatedData = data.map((item: Sport) => ({
        ...item,
        imageUrl: correctImageUrl(item.sportImage),
      }));
      setContent(updatedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const handleImageError = (error: any) => {
    console.error('Image load error:', error);
    Alert.alert('Image Load Error', 'There was an issue loading an image.');
  };

  // Filter content based on search query
  const filteredContent = content.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to check if an item is in the cart
  const isInCart = (item: Sport) => {
    return cartItems.some(cartItem => cartItem.id === item.id);
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search by title..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      {/* FlatList to display sports */}
      <FlatList
        data={filteredContent}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
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
                <TouchableOpacity
                  disabled={isInCart(item)}
                  style={[styles.cartButton, isInCart(item) && styles.disabledButton]}
                  onPress={() => addToCart(item)}
                >
                  <Text style={styles.buttonText}>
                    {isInCart(item) ? 'Added' : 'Add to Cart'}
                  </Text>
                </TouchableOpacity>
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
        )}
        
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Sports</Text>
            <View style={styles.buttons}>
              <TouchableWithoutFeedback onPress={() => navigation.navigate('Olympics')}>
                <View style={styles.buttonContainer}>
                  <Text style={styles.olympics}>View Olympics</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => navigation.navigate('Cart')}>
                <View style={styles.buttonContainer}>
                  <Text style={styles.olympics}>View Cart ({cartItems.length})</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  searchBar: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#39FF14',
    backgroundColor: '#fff',
    fontSize: 16,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#505050',
    margin: 5,
    padding: 15,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#39FF14',
    textAlign: 'center',
  },
  image: {
    width: 150,
    height: 110,
    marginVertical: 10,
    borderRadius: 5,
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
    margin: 5,
    color: '#000',
  },
  cartButton: {
    backgroundColor: '#39FF14',
    padding: 10,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#d3d3d3',
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 16,
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
    fontSize: 26,
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

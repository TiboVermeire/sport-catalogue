import React from 'react';
import { View, Text, FlatList, Button, StyleSheet, Image } from 'react-native';
import { useCart } from '../cartContext'; // Adjust the path

const CartScreen: React.FC = () => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
                    <Image source={{ uri: item.imageUrl }} style={styles.image} />
                    <View style={styles.description}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text style={styles.itemPrice}>Price: ${item.sportPrice}</Text>
                    </View>
              <Button title="Remove from Cart" onPress={() => removeFromCart(item.id)} />
            </View>
          )}
        />
      ) : (
        <Text style= {styles.empty}>Your cart is empty.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#505050',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#39FF14',
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 18,
    color: '#333',
  },
    empty: {
        fontSize: 36,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    image: {
        width: 100,
        height: 50,
        resizeMode: 'contain',
    },
    description: {
        display: 'flex',
        flexDirection: 'column',
    },
});

export default CartScreen;

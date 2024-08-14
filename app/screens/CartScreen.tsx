import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useCart } from '../CartContext'; // Adjust the path

const CartScreen: React.FC = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {cart.length > 0 ? (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemPrice}>Price: ${item.sportPrice}</Text>
              <Button title="Remove from Cart" onPress={() => removeFromCart(item.id)} />
            </View>
          )}
        />
      ) : (
        <Text>Your cart is empty.</Text>
      )}
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
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
});

export default CartScreen;

import {Button, Text} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View,ScrollView} from 'react-native';
import {COLORS} from '../../utils/theme';
import {get, remove, set} from '../../utils/localStorage';
import ItemCard from '../itemCard';
import GetProductDetailById from '../../utils/getProductDetailById';
import Placeholder from '../placeholder';
import {useFocusEffect} from '@react-navigation/native';
const WishlistScreen = ({route, navigation}) => {
  const asyncFun = async () => {
    const cartLs = await get('cartItem')||[];
    let wishLs = await get('wishlist');
    // let isItemInWishlist = wishLs.filter((item, i) => item.id == id);
   setCartItem(cartLs);
    SetWishlist(wishLs);
  };
  useEffect(() => {
    asyncFun();
    // remove('cartItem')
  }, [wishlist]);

  useFocusEffect(
    React.useCallback(() => {
      asyncFun();
      // };
    }, [wishlist]),
  );
  const [wishlist, SetWishlist] = useState([]) || [];
const [cartItem,setCartItem]=useState([])||[]
  const addToCart = async (id, size) => {
    let cartSchema = {quantity: 1, size: size, id: id};
    remove('wishlist');
    let cartLocalStorage = (await get('cartItem')) || [];

    cartLocalStorage.push(cartSchema);

    await set('cartItem', cartLocalStorage);
    //removing from wishlist ls
    removeFromWishlist(id);
  };

  const removeFromWishlist = async id => {
    let wishlistLs = wishlist.filter((item, i) => item.id !== id);

    SetWishlist(wishlistLs);

    await set('wishlist', wishlistLs);
  };
  const checkItemInCart =  (id) => {

    let item = cartItem.filter((res, i) => res.id == id);
   
 
    return item;
  };
  return wishlist?.length > 0 ? (
    <ScrollView contentContainerStyle={styles.containerStyle}>
      {wishlist.map((item, i) => {
        return (
          <View key={i}>
            <ItemCard
              onClick={e => navigation.navigate('Product', {id: item.id})}
              cardPrice={GetProductDetailById(item.id).price}
              cardName={GetProductDetailById(item.id).name}
              image={GetProductDetailById(item.id).image[0]}
              size={item.size}
            />
            <Button
              onPress={() => removeFromWishlist(item.id)}
              type="clear"
              title={'Remove'}
            />
            <Button
              disabled={checkItemInCart(item.id).length>0?true:false }
              onPress={() => addToCart(item.id, item.size)}
              type="clear"
              title={checkItemInCart(item.id).length>0 ? "Already In Cart" : "Add TO Cart"}
            />
      
          </View>
        );
      })}
    </ScrollView>
  ) : (
    <Placeholder />
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

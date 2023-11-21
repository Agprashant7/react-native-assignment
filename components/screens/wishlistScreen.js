import {Button, Text} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {COLORS} from '../../utils/theme';
import {get, remove, set} from '../../utils/localStorage';
import ItemCard from '../itemCard';
import GetProductDetailById from '../../utils/getProductDetailById';
import Placeholder from '../placeholder';

const WishlistScreen = ({route, navigation}) => {
  const asyncFun = async () => {
    // const cartLs = await get('cartItem');
    let wishLs = await get('wishlist');
    // let isItemInWishlist = wishLs.filter((item, i) => item.id == id);
    // setCartItem(cartLs);
    SetWishlist(wishLs);
  };
  useEffect(() => {
    asyncFun();
    // remove('cartItem')
  }, [wishlist]);
  const [wishlist, SetWishlist] = useState([]) || [];

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
    console.log(wishlistLs);

    SetWishlist(wishlistLs);

    await set('wishlist', wishlistLs);
  };
  const checkItemInCart = async id => {
    let cartLocalStorage = (await get('cartItem')) || [];
    let item = cartLocalStorage.filter((res, i) => res.id == id);
     console.log(item);
    if (item.length > 0) {
      return true;
    }
    return false;
  };
  return wishlist.length > 0 ? (
    <ScrollView
      contentContainerStyle={styles.containerStyle}>
      {wishlist.map((item, i) => {
        return (
          <View  key={i}>
            <ItemCard
               onClick={e =>
                navigation.navigate('Product', {id: item.id})
              }
             
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
              disabled={!!checkItemInCart(item.id)}
              onPress={() => addToCart(item.id, item.size)}
              type="clear"
              title={
                checkItemInCart(item.id) ? 'Already In Cart' : 'Add TO Cart'
              }
            />
          </View>
        );
      })}
    </ScrollView>
  ) : (
   <Placeholder/>
  );
};

export default WishlistScreen;


const styles = StyleSheet.create({
  containerStyle:{
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

});

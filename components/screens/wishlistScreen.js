import {Button, Text} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {COLORS} from '../../utils/theme';
import {get, remove, set} from '../../utils/localStorage';
import ItemCard from '../itemCard';
import GetProductDetailById from '../../utils/getProductDetailById';
import Placeholder from '../placeholder';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {addItem, removeFromWishlist} from '../../actions';
const WishlistScreen = ({route, navigation}) => {



  const dispatch = useDispatch();
  const cartRedux = useSelector(state => state.cart.cart);
  const wishlistRedux = useSelector(state => state.wishlist.wishlist);
  const [wishlist, SetWishlist] = useState(wishlistRedux);
  const [cartItem, setCartItem] = useState(cartRedux);
  useFocusEffect(
    React.useCallback(() => {
      // asyncFun();
      // };
      SetWishlist(wishlistRedux);
      setCartItem(cartRedux);
    }, [wishlistRedux,cartRedux]),
  );
  const addToCart = (id, size) => {
    let cartSchema = {quantity: 1, size: size, id: id};
    dispatch(addItem(cartSchema));
    //removing from wishlist ls
    removeItemFromWishlist(id);
  };

  const removeItemFromWishlist = id => {
    let wishlistLs = wishlist.filter((item, i) => item.id !== id);
    dispatch(removeFromWishlist(id));
  };
  const checkItemInCart = id => {
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
              onPress={() => removeItemFromWishlist(item.id)}
              type="clear"
              title={'Remove'}
            />
            <Button
              disabled={checkItemInCart(item.id).length > 0 ? true : false}
              onPress={() => addToCart(item.id, item.size)}
              type="clear"
              title={
                checkItemInCart(item.id).length > 0
                  ? 'Already In Cart'
                  : 'Add TO Cart'
              }
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
    // flex: 1,
    height:'100%',
    backgroundColor: COLORS.backgroundColor,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

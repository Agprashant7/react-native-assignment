import {Image} from '@rneui/base';
import {Input, Text, Button} from '@rneui/themed';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {COLORS} from '../../utils/theme';
import {get, remove, set} from '../../utils/localStorage';
import GetProductDetailById from '../../utils/getProductDetailById';
import {discountedPrice} from './productScreen';

const CartScreen = () => {
  const asyncFun = async () => {
    const cartLs = await get('cartItem');
    let wishLs = await get('wishlist');
    // let isItemInWishlist = wishLs.filter((item, i) => item.id == id);
    setCartItem(cartLs);
    SetWishlist(wishLs);
  };
  useEffect(() => {
    asyncFun();
    remove('cartItem')
  }, []);
  const [cartItem, setCartItem] = useState([]) || [];
  const [wishlist, SetWishlist] = useState([]) || [];
  const [amountDetails, setAmountDetails] = useState({
    totalMrp: '',
    totalDiscount: '',
    gst: '',
    amountToPay: '',
  });
  let cartArrMrp = cartItem?.map((item, i) => {
    let mrp = GetProductDetailById(item.id).mrp;
    let price = GetProductDetailById(item.id).price;
    return {mrp: mrp, price: price, qty: item.quantity};
  });
  let totalMrp = cartArrMrp?.reduce(function (previousValue, currentValue) {
    return previousValue + currentValue.qty * currentValue.mrp;
  }, 0);
  let totalDiscount = cartArrMrp?.reduce(function (
    previousValue,
    currentValue,
  ) {
    return (
      previousValue + currentValue.qty * currentValue.mrp - currentValue.price
    );
  },
  0);
  let gst = (totalMrp * 5) / 100;
  let amountToPay = totalMrp - totalDiscount + gst;;
  const moveToWishlist = async (id, size) => {
    console.log('INDISE MOVE TO WISH FUN');
    let wishlistItem = {id: id, size: size};
    let checkIfItemExist = wishlist.filter((res, i) => res.id == id);
    // if (checkIfItemExist) {
    //   removeFromCart(id, size);
    //   return;
    // }

    wishlist.push(wishlistItem);
    console.log('WISHLIST', wishlist);
    await set('wishlist', wishlist);

    // remove from cart
    removeFromCart(id, size);
  };
  const removeFromCart = async (id, size) => {
    // console.log(id, s);
    // const filterCart = cartItem.filter(
    //   (res, i) => (res.id == id) & (res.size !== size),
    // );
    // setCartItem(filterCart);
    console.log('********INSIDE REMOVE', cart);
    return;
    await set('cartItem', filterCart);
  };
  return cartItem ? (
    <ScrollView style={styles.container}>
      {cartItem?.map((cart, i) => {
        console.log('cart', cart);
        let cartId = cart.id;
        let idSize = cart.size;
        return (
          <View key={i} style={styles.item}>
            <View>
              <Image
                containerStyle={styles.image}
                resizeMode="stretch"
                source={{
                  uri: GetProductDetailById(cart.id).image[0],
                }}
              />
            </View>
            <View style={{marginLeft: 5, display: 'flex', flexwrap: 'wrap'}}>
              <Text style={[styles.title]}>
                {GetProductDetailById(cart.id).name}
              </Text>
              <View style={styles.cardPrice}>
                <Text> &#8377;{GetProductDetailById(cart.id).price}</Text>
                <Text style={{textDecorationLine: 'line-through'}}>
                  {GetProductDetailById(cart.id).mrp}
                </Text>
                <Text>
                  {' '}
                  {`${discountedPrice(
                    GetProductDetailById(cart.id).mrp,
                    GetProductDetailById(cart.id).price,
                  )}% Off`}
                </Text>
              </View>
              <View style={{marginLeft: 5}}>
                <Text>Size:{cart.size}</Text>
                <Text>Quantity:{cart.quantity}</Text>
              </View>

              <View
                style={{display: 'flex', flexDirection: 'row', marginLeft: -5}}>
                <Button
                  type="clear"
                  onPress={() => removeFromCart(cart.id, cart.size)}
                  title={'remove'}
                />
                <Button
                  type="clear"
                  onPress={() => moveToWishlist(cartId, idSize)}
                  title={'Move to wishlist'}
                />
              </View>
            </View>
          </View>
        );
      })}
      <View style={styles.amountDetails}>
        <View>
          <Text>Cart Total</Text>
          <Text>Discount</Text>
          <Text>GST</Text>
          <Text>Amount To Pay</Text>
        </View>
        <View>
          <Text>&#8377;{totalMrp}</Text>
          <Text>- &#8377;{totalDiscount}</Text>
          <Text>+&#8377;{gst}</Text>
          <Text>&#8377;{amountToPay}</Text>
        </View>
      </View>
      <View>
        <Button title={'Check out'} />
      </View>
    </ScrollView>
  ) : (
    <View style={{flex:1,alignItems:'center',backgroundColor:COLORS.primary}}>
        <Text h4>No Items</Text>
        </View>

  );
};
export default CartScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderRadius: 8,

    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.23,
    shadowRadius: 0.78,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    marginTop: 5,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
    //marginBottom: 20,
    //flex: 2,
  },
  cardPrice: {
    marginBottom: 5,
    marginTop: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    gap: 4,
  },
  amountDetails: {
    width: '95%',
    height: 150,
    elevation: 5,
    backgroundColor: COLORS.primary,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

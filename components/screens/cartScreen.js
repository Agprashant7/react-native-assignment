import {Image} from '@rneui/base';
import {Input, Text, Button} from '@rneui/themed';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {COLORS} from '../../utils/theme';
import GetProductDetailById from '../../utils/getProductDetailById';
import {discountedPrice} from './productScreen';
import Placeholder from '../placeholder';
import {useIsFocused} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import NumericInput from 'react-native-numeric-input';
import {addItem, addToWishlist, removeItem, setCartAmount} from '../../actions';
const CartScreen = ({route, navigation}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const cartRedux = useSelector(state => state.cart.cart);
  const wishlistRedux = useSelector(state => state.wishlist.wishlist);
  useEffect(() => {
    if (isFocused) {
      setCartItem(cartRedux);
    }
  }, [isFocused]);

  const [cartItem, setCartItem] = useState(cartRedux);
  const [wishlist, SetWishlist] = useState(wishlistRedux);
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
      previousValue + currentValue.qty * (currentValue.mrp - currentValue.price)
    );
  },
  0);
  let gst = (totalMrp * 5) / 100;
  let amountToPay = totalMrp - totalDiscount + gst;
  const updateQuantity = (newValue, id, size) => {
    let concat = `${id}${size}`;
    let obj = cartItem.filter((res, i) => res.id + res.size === concat);
    obj[0].quantity = newValue;
    dispatch(removeItem(concat));
    dispatch(addItem(obj[0]));
  };

  const moveToWishlist = async (id, size) => {
    let wishlistItem = {id: id, size: size};

    let checkIfItemExist = wishlist?.filter((res, i) => res.id === id);
    if (checkIfItemExist.length > 0) {
      removeFromCart(id, size);
      return;
    }
    if (wishlist === null) {
      dispatch(addToWishlist(wishlistItem));
      removeFromCart(id, size);
      return;
    }
    dispatch(addToWishlist(wishlistItem));
    // remove from cart
    removeFromCart(id, size);
  };
  const removeFromCart = async (id, size) => {
    let concat = `${id}${size}`;
    const filterCart = cartItem.filter((res, i) => res.id + res.size != concat);
    setCartItem(filterCart);
    dispatch(removeItem(concat));
  };

  return cartItem?.length > 0 ? (
    <ScrollView style={styles.container}>
      {cartItem?.map((cart, i) => {
        let cartId = cart.id;
        let idSize = cart.size;
        return (
          <View key={i} style={styles.item}>
            <View>
              <Image
                onPress={e => navigation.navigate('Product', {id: cart.id})}
                containerStyle={styles.image}
                resizeMode="stretch"
                source={{
                  uri: GetProductDetailById(cart.id).image[0],
                }}
              />
            </View>
            <View style={{marginLeft: 5, display: 'flex',flexShrink:1}}>
              <Text numberOfLines={2} style={[styles.title]}>
                {GetProductDetailById(cart.id).name}
              </Text>
              <View style={styles.cardPrice}>
                <Text style={{color: COLORS.secondary, fontSize: 18}}>
                  {' '}
                  &#8377;{GetProductDetailById(cart.id).price}
                </Text>
                <Text style={{textDecorationLine: 'line-through'}}>
                  {GetProductDetailById(cart.id).mrp}
                </Text>
                <Text style={{color: COLORS.highLighter}}>
                  {' '}
                  {`${discountedPrice(
                    GetProductDetailById(cart.id).mrp,
                    GetProductDetailById(cart.id).price,
                  )}% Off`}
                </Text>
              </View>
              <View style={{marginLeft: 5}}>
                <Text>Size:{cart.size}</Text>
                <Text>Quantity:</Text>
                <View style={{marginTop: 5}}>
                  <NumericInput
                    rounded
                    value={cart.quantity}
                    minValue={1}
                    maxValue={9}
                    rightButtonBackgroundColor={COLORS.secondary}
                    totalWidth={70}
                    onChange={(e, v) => {
                      updateQuantity(e, cartId, idSize);
                    }}
                  />
                </View>
              </View>

              <View
                style={{display: 'flex', flexDirection: 'row', marginLeft: -5}}>
                <Button
                  type="clear"
                  onPress={() => removeFromCart(cartId, idSize)}
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
      {/* {
        cartItem?<>  */}
      <View style={styles.amountDetails}>
        <View style={{gap: 5, marginTop: 15}}>
          <Text>Cart Total</Text>
          <Text>Discount</Text>
          <Text>GST</Text>
          <Text>Amount To Pay</Text>
        </View>
        <View style={{gap: 5, marginTop: 15}}>
          <Text>&#8377;{totalMrp}</Text>
          <Text>- &#8377;{totalDiscount}</Text>
          <Text>+&#8377;{gst}</Text>
          <Text style={{color: COLORS.secondary, fontSize: 20}}>
            &#8377;{amountToPay}
          </Text>
        </View>
      </View>
      <View style={styles.checkout}>
        <Button
          onPress={() => navigation.navigate('Checkout', {total: amountToPay})}
          title={'Check out'}
        />
      </View>
      {/* </>:<></>
      }
      */}
    </ScrollView>
  ) : (
    <Placeholder />
  );
};
export default CartScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  item: {
    overflow:'visible',
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
    height: 180,
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
    marginTop: 10,
    width: '90%',
    height: 150,
    elevation: 5,
    backgroundColor: COLORS.primary,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  checkout: {
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
  },
});

import {StyleSheet, View} from 'react-native';
import {COLORS} from '../../utils/theme';
import {Image, Text, Chip, Overlay} from '@rneui/themed';
import {ScrollView} from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import React, {useContext, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Input, Button} from '@rneui/themed';
import {ProductsDetailsContext} from '../../App';
import {useFocusEffect} from '@react-navigation/native';
import AlertBanner from '../alertBanner';
import {useDispatch, useSelector} from 'react-redux';
import {addItem, addToWishlist} from '../../actions';
import Swiper from 'react-native-swiper';

export const discountedPrice = (mrp, price) => {
  let calculate = mrp - price;
  calculate = calculate / mrp;
  calculate = calculate * 100;
  return calculate.toFixed(0);
};

export function ProductScreen({route, navigation}) {
  const dispatch = useDispatch();
  const id = route?.params?.id;
  const cartRedux = useSelector(state => state.cart.cart);
  const wishlistRedux = useSelector(state => state.wishlist.wishlist);
  const wishlistTitle = id => {
    let isItemInWishlist = wishlistRedux?.filter((item, i) => item.id == id);
    return isItemInWishlist.length > 0 ? true : false;
  };
  wishlistTitle(id);
  useEffect(() => {
    // setCart(cartRedux)
    // SetWishlist(wishlistRedux)
    // wishlistTitle(id);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      //asyncFun();
      setItemSchema({size: '', quantity: 1, id: id});
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        setMessage({cartButton: false});
        setItemSchema({size: '', quantity: 1, id: id});
        setWishlistButton(false);
      };
    }, [navigation]),
  );
  const [loadRedux, setLoadRedux] = useState();
  const productDetails = useContext(ProductsDetailsContext);
  const [newImage, setNewImage] = useState(0);
  const [itemSchema, setItemSchema] = useState({
    quantity: 1,
    size: '',
    id: '',
  });

  let getProductDetail = productDetails.filter((res, i) => res.id === id);

  getProductDetail = getProductDetail[0];

  const quantity = ['1', '2', '3', '4'];
  const [cart, setCart] = useState(cartRedux) || [];
  const [validation, setValidation] = useState(false);
  const [wishlist, SetWishlist] = useState(wishlistRedux);
  const [wishlistButton, setWishlistButton] = useState(wishlistTitle(id));
  const [message, setMessage] = useState({
    itemExist: false,
    cartButton: false,
  });

  const addToCart = async () => {
    itemSchema.id = id;
    if (!itemSchema.size) {
      setValidation(true);

      return;
    }

    if (cart == null) {
      setCart([itemSchema]);
      dispatch(addItem(itemSchema));
      setMessage({cartButton: true});
      return;
    }
    let checkForExisting = cartRedux?.filter(
      (res, i) => (res.id == itemSchema.id) & (itemSchema.size == res.size),
    );

    if (checkForExisting?.length > 0) {
      setMessage({itemExist: true});
      setTimeout(() => {
        setMessage({itemExist: false});
      }, 8000);
      return;
    }
    dispatch(addItem(itemSchema));
    setLoadRedux(true);
    setMessage({cartButton: true});
  };

  const moveToWishlist = async (id, size) => {
    let wishlistItem = {id: id, size: size};
    dispatch(addToWishlist(wishlistItem));
    setLoadRedux(true);
    setWishlistButton(true);
  };

  return getProductDetail ? (
    <ScrollView style={styles.containerStyle}>
      <View style={{flex: 2}}>
        <View style={{flex: 3}}>
          <Swiper
            index={newImage}
            onIndexChanged={e => {
              setNewImage(e);
            }}
            autoplay
            nextButton={
              <Icon
                name={'keyboard-arrow-right'}
                size={24}
                color={COLORS.secondary}
              />
            }
            prevButton={
              <Icon
                name={'keyboard-arrow-left'}
                size={24}
                color={COLORS.secondary}
              />
            }
            activeDotColor={COLORS.secondary}
            style={styles.wrapper}
            showsButtons={true}>
            {getProductDetail.image.map((img, i) => {
              return (
                <Image
                  key={i}
                  onPress={() => setNewImage(i)}
                  containerStyle={{width: '100%', height: '100%'}}
                  resizeMode="stretch"
                  source={{
                    uri: getProductDetail.image[newImage],
                  }}
                />
              );
            })}
          </Swiper>
          <View style={styles.flexContainer}>
            {getProductDetail.image.map((img, i) => {
              return (
                <View
                  key={i}
                  style={{
                    borderColor: COLORS.secondary,
                    borderWidth: i === newImage ? 3 : 0,
                  }}>
                  <Image
                    onPress={() => setNewImage(i)}
                    containerStyle={{width: 70, height: 80}}
                    resizeMode="stretch"
                    source={{
                      uri: img,
                    }}
                  />
                </View>
              );
            })}
          </View>
        </View>
        <View style={{marginTop: 20}}>
          <Text h4>{getProductDetail.name}</Text>
          <Text>{getProductDetail.description}</Text>
          <View style={styles.priceContainer}>
            <Text h4 style={{color: COLORS.secondary}}>
              &#8377;{getProductDetail.price}{' '}
              <Text style={{textDecorationLine: 'line-through', fontSize: 14}}>
                {' '}
                {getProductDetail.mrp}
              </Text>{' '}
              <Text
                style={{
                  color: COLORS.highLighter,
                  fontSize: 14,
                }}>{`${discountedPrice(
                getProductDetail.mrp,
                getProductDetail.price,
              )}% Off`}</Text>
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text>Select Size</Text>
            <View style={styles.chipContainer}>
              {getProductDetail.sizes.map((size, i) => {
                return (
                  <Chip
                    onPress={() => {
                      setItemSchema({...itemSchema, size: size});
                      setMessage({itemExist: false});
                    }}
                    title={size}
                    key={i}
                    type="solid"
                    color={
                      itemSchema.size == size
                        ? COLORS.secondary
                        : COLORS.fontColor
                    }
                    titleStyle={{color: '#000'}}
                  />
                );
              })}
            </View>
            <View style={{marginBottom: 10, height: 'auto'}}>
              <Text style={{color: COLORS.fontColor}}>Quantity</Text>
              <SelectDropdown
                onSelect={e => setItemSchema({...itemSchema, quantity: e})}
                defaultButtonText={'1'}
                renderDropdownIcon={isOpened => {
                  return (
                    <Icon
                      name={
                        isOpened ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
                      }
                      size={20}
                      color={COLORS.secondary}
                    />
                  );
                }}
                defaultValue={itemSchema.quantity}
                buttonTextStyle={{color: COLORS.secondary}}
                buttonStyle={styles.buttonStyle}
                dropdownStyle={{width: '20%'}}
                data={quantity}
              />
            </View>

            <View
              style={{
                // flex: 2,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'stretch',
              }}>
              <View style={{width: '60%'}}>
                <Input placeholder="Delivery Pin code" />
              </View>
              <View style={{marginTop: 10}}>
                <Button type="outline" title={'Check'} />
              </View>
            </View>
            {message.itemExist && (
              <AlertBanner
                type="warning"
                content={`  This item with ${itemSchema.size} size already exist in your
            cart`}
              />
            )}
            {message.cartButton && (
              <AlertBanner
                type="success"
                content={`    Item successfully added to cart`}
              />
            )}
            <View style={{flexDirection: 'row', gap: 10, marginBottom: 10}}>
              <Button
                onPress={
                  message.cartButton
                    ? () => navigation.navigate('Cart')
                    : addToCart
                }
                type="solid"
                icon={
                  <Icon2
                    name={message.cartButton ? 'cart' : 'cart-plus'}
                    size={24}
                    style={{marginRight: 4}}
                    color={COLORS.fontColor}
                  />
                }
                title={message.cartButton ? 'Go to cart' : 'Add to cart'}
              />
              <Button
                icon={
                  wishlistTitle(getProductDetail.id) || wishlistButton ? (
                    <Icon
                      name="sentiment-very-satisfied"
                      size={24}
                      style={{marginRight: 4}}
                      color={COLORS.secondary}
                    />
                  ) : (
                    <Icon2
                      name="heart-circle"
                      size={24}
                      style={{marginRight: 4}}
                      color={COLORS.secondary}
                    />
                  )
                }
                type="outline"
                onPress={
                  wishlistTitle(getProductDetail.id) || wishlistButton
                    ? () => navigation.navigate('Wishlist')
                    : () =>
                        moveToWishlist(
                          id,
                          !itemSchema.size
                            ? getProductDetail.sizes[0]
                            : itemSchema.size,
                        )
                }
                title={
                  wishlistTitle(getProductDetail.id) || wishlistButton
                    ? 'Wishlisted'
                    : 'Add to wishlist'
                }
              />
            </View>
            <View style={styles.productDetails}>
              <Text h4>Product Details</Text>
              <Text>Material Care: 98% Cotton 2% Spandex Machine Wash</Text>
              <Text>Manufactured & Sold By:</Text>
              <Text>
                The Demo Store Pvt Ltd 07,ABCD Road Bengaluru-560073
                demostore@gmail.com
              </Text>
              <Text> Country Origin:India</Text>
            </View>
          </View>
        </View>
      </View>
      <Overlay
        isVisible={validation}
        onBackdropPress={() => setValidation(!validation)}>
        <Text style={{color: COLORS.secondary}}>{'Please select size'}</Text>
      </Overlay>
    </ScrollView>
  ) : (
    <></>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: COLORS.backgroundColor,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  wrapper: {
    height: 400,
    backgroundColor: 'red',
  },
  flexContainer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  priceContainer: {flexDirection: 'row', marginTop: 5, marginBottom: 5},
  chipContainer: {
    flexDirection: 'row',
    gap: 4,
    width: '50%',
    marginBottom: 10,
    marginTop: 10,
  },
  productDetails: {marginTop: 20, marginBottom: 20},
  buttonStyle: {
    marginTop: 5,
    width: '18%',
    height: 50,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.secondary,
    borderWidth: 1,
  },
});

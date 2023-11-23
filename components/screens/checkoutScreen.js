import {Button, CheckBox, Text, Overlay} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {COLORS} from '../../utils/theme';
import Accordion from '../accordion';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Image} from '@rneui/base';
import {get, remove} from '../../utils/localStorage';
import GetProductDetailById from '../../utils/getProductDetailById';
import CheckoutForm from '../form';
const CheckoutScreen = ({route, navigation}) => {
  const asyncFun = async () => {
    const cartLs = await get('cartItem');
    const total = await get('total');
    setTotalAmt(total);
    setCartItem(cartLs);
  };
  useEffect(() => {
    asyncFun();
  }, []);

  const [cartItem, setCartItem] = useState([]) || [];
  const [totalAmt, setTotalAmt] = useState(0);
  const [expanded, setExpanded] = useState(true);
  const [address, setAddress] = useState();
  const [selectedIndex, setIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = values => {
    setAddress(values);
    setExpanded(!expanded);
  };
  const placeOrder = () => {
    setShowModal(false);
    remove('cartItem');
    remove('wishlisht');
    remove('total');
    navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      <View>
        <Text h4 style={{marginTop: 20}}>
          Checkout
        </Text>
      </View>
      <View style={styles.topFlex}>
        <View>
          <Text>No Of Item</Text>
        </View>
        <View>
          <Text>{cartItem.length}</Text>
        </View>
      </View>
      <View style={styles.accordionContainer}>
        {/* <ScrollView contentContainerStyle={{height:'auto'}}> */}
        <Accordion
          accordionName={'Cart Details'}
          icon={
            <FontAwesome5
              name={'shopping-cart'}
              size={20}
              color={COLORS.fontColor}
            />
          }>
          <View style={styles.accordionChild}>
            {cartItem.map((item, i) => {
              return (
                i < 3 && (
                  <View key={i} style={styles.childitem}>
                    <Image
                      resizeMode="stretch"
                      containerStyle={styles.image}
                      source={{
                        uri: GetProductDetailById(item.id).image[0],
                      }}
                    />
                    <View style={styles.cartDetails}>
                      <View>
                        <Text>{GetProductDetailById(item.id).name}</Text>
                      </View>
                      <View>
                        <Text>
                          {' '}
                          &#8377;{GetProductDetailById(item.id).price}
                        </Text>
                      </View>
                      <View>
                        <Text>Qty:{item.quantity}</Text>
                      </View>
                    </View>
                  </View>
                )
              );
            })}
            {cartItem.length > 3 && (
              <TouchableOpacity onPress={()=>navigation.navigate('Cart')} style={styles.seemore}>
                <Text style={{color: COLORS.secondary}}>See More</Text>
              </TouchableOpacity>
            )}

            <View style={styles.totalAmt}>
              <View>
                <Text>Total Amount To Pay</Text>
              </View>
              <View>
                <Text> &#8377;{totalAmt}</Text>
              </View>
            </View>
          </View>
        </Accordion>
        {/* </ScrollView> */}
        <View style={{marginTop: 10, marginBottom: 10}}>
          {/* <ScrollView> */}
          <Accordion
            onChange={() => {
              setExpanded(!expanded);
            }}
            isOpen={expanded}
            icon={
              <FontAwesome5
                name={'address-card'}
                size={20}
                color={COLORS.fontColor}
              />
            }
            accordionName={'Add Address'}>
            <View style={[styles.accordionChild]}>
              <ScrollView>
                <CheckoutForm handleSubmit={handleSubmit} />
              </ScrollView>
            </View>
          </Accordion>
          {/* </ScrollView> */}
        </View>
        <View style={{marginBottom: 10}}>
          <Accordion
            isOpen={!expanded}
            icon={
              <FontAwesome5
                name={'address-card'}
                size={20}
                color={COLORS.fontColor}
              />
            }
            accordionName={'Payment'}>
            <View style={styles.accordionChild}>
              <CheckBox
                title={'COD'}
                textStyle={{color: COLORS.fontColor}}
                containerStyle={{backgroundColor: COLORS.primary}}
                checked={selectedIndex === 0}
                onPress={() => setIndex(0)}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
              />
              <CheckBox
                title={'UPI'}
                disabled
                textStyle={{color: COLORS.fontColor}}
                containerStyle={{backgroundColor: COLORS.primary}}
                checked={selectedIndex === 1}
                onPress={() => setIndex(1)}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
              />
            </View>
          </Accordion>
        </View>
      </View>
      <Button
        onPress={() => setShowModal(true)}
        type={address == undefined ? 'outline' : 'solid'}
        disabled={expanded}
        title={'place order'}
      />
      <Overlay isVisible={showModal} onBackdropPress={placeOrder}>
        <Text h4 style={{color: COLORS.secondary}}>
          Congrats,{address?.firstName}
        </Text>
        <View style={{marginTop: 10}}>
          <Text style={{color: COLORS.secondary, fontSize: 14}}>
            {' '}
            Your order has been successfully placed, for more updates keep
            checking {address?.email}
          </Text>
        </View>
      </Overlay>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroundColor,
    alignItems: 'center',
    height: '100%',
  },
  topFlex: {
    flexDirection: 'row',
    marginTop: 15,
    paddingHorizontal: 15,
    width: '100%',
    justifyContent: 'space-between',
  },
  accordionContainer: {
    marginTop: 20,
    marginLeft: -2,
    justifyContent: 'flex-start',
  },
  accordionChild: {
    overflow: 'scroll',
    width: '100%',
    height: 'auto',
    backgroundColor: COLORS.primary,
    elevation: 2,
    marginLeft: -6,
    marginTop: 4,
    marginBottom: 10,
  },
  childitem: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 10,
  },
  image: {
    width: '30%',
    height: 100,
    marginBottom: 20,
  },
  cartDetails: {
    marginLeft: 20,
  },
  totalAmt: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 10,
  },
  seemore: {alignItems: 'center', marginLeft: 10, marginBottom: 10},
});

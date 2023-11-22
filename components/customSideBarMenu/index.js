import React from 'react';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Accordion from '../accordion';
import OptionCards from '../optionCards';
import Avatar from '../avatar';
import {COLORS} from '../../utils/theme';
const CustomSidebarMenu = ({props, navigation}) => {
  const sampleData = [
    {
      cardName: 'Men',
      icon: <Ionicons name={'man'} size={20} color={COLORS.fontColor} />,
    },
    {
      cardName: 'Women',
      icon: <Ionicons name={'woman'} size={20} color={COLORS.fontColor} />,
    },
    {
      cardName: 'Kids',
      icon: <Ionicons name="walk" size={26} color={COLORS.fontColor} />,
    },
    ,
  ];
  const sampleData2 = [
    {
      leftIcon: <Ionicons name="shirt" size={22} color={COLORS.fontColor} />,
      name: 'Top wear',
    },
    {
      leftIcon: (
        <Ionicons name="arrow-down-circle" size={22} color={COLORS.fontColor} />
      ),
      name: 'Bottom Wear',
    },
    {
      leftIcon: (
        <Ionicons name="footsteps" size={22} color={COLORS.fontColor} />
      ),
      name: 'Shoes',
    },
    {
      leftIcon: (
        <Ionicons name="albums-sharp" size={22} color={COLORS.fontColor} />
      ),
      name: 'Accessories',
    },
  ];
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.primary}}>
      <DrawerContentScrollView {...props}>
        {/* <DrawerItemList {...props} /> */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <OptionCards
            cardName={'Home'}
            // bgColor={'#e8e9ff'}
            // count={12}
            // isSelected={true}
            icon={
              <Ionicons
                name={'home'}
                style={{color: COLORS.secondary}}
                size={20}
              />
            }
          />
        </TouchableOpacity>

        <Accordion
          //  isSelected={true}
          icon={
            <Ionicons name={'barcode'} size={20} color={COLORS.fontColor} />
          }
          accordionName={'Categories'}>
          {sampleData2.map((profile, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() =>
                  navigation.navigate('Section', {
                    name: profile.name.replace(/\s/g, '').toLowerCase(),
                  })
                }>
                <OptionCards
                  fontSize={12}
                  cardName={profile.name}
                  count={profile.counts}
                  icon={profile.leftIcon}
                />
              </TouchableOpacity>
            );
          })}
        </Accordion>
        {sampleData.map((item, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={() =>
                navigation.navigate('Section', {
                  name: item.cardName.toLowerCase(),
                })
              }>
              <OptionCards
                cardName={item.cardName}
                count={item.count}
                icon={item.icon}
              />
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity onPress={()=>navigation.navigate('Cart')}>
          <OptionCards
            cardName={'Cart'}
            icon={<Ionicons name="cart-sharp" size={26} color={COLORS.fontColor} />}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Wishlist')}>
          <OptionCards
            cardName={'Wishlist'}
            icon={<Ionicons name="heart" size={26} color={COLORS.fontColor} />}
          />
        </TouchableOpacity>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

export default CustomSidebarMenu;

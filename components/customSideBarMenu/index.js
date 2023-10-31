import React from 'react';
import {SafeAreaView} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Accordion from '../accordion';
import OptionCards from '../optionCards';
import Avatar from '../avatar';
const CustomSidebarMenu = props => {
  const sampleData = [
    {
      cardName: 'Prospects',
      count: 0,
      icon: <FontAwesome5 name={'id-card'} size={20} color={'#3d3d3d'} />,
    },
    {
      cardName: 'Residents',
      count: 0,
      icon: <FontAwesome5 name={'user-friends'} size={20} color={'#3d3d3d'} />,
    },
    {
      cardName: 'Calendar',
      count: 0,
      icon: <FontAwesome5 name={'calendar-alt'} size={20} color={'#3d3d3d'} />,
    },
    {
      cardName: 'Availability',
      count: 0,
      icon: <FontAwesome5 name={'city'} size={20} color={'#3d3d3d'} />,
    },
    {
      cardName: 'Leasing Binder',
      count: 0,
      icon: <FontAwesome5 name={'fax'} size={20} color={'#3d3d3d'} />,
    },
    {
      cardName: 'Search',
      count: 0,
      icon: <FontAwesome5 name={'search'} size={20} color={'#3d3d3d'} />,
    },
  ];
  const sampleData2 = [
    {
      profileLink:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf7hFU10MvjcmHDAiACQDiQJEjCyPfFFs5zA&usqp=CAU',
      profileName: 'Me',
      counts: 2,
    },
    {
      profileLink:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf7hFU10MvjcmHDAiACQDiQJEjCyPfFFs5zA&usqp=CAU',
      profileName: 'Ed',
      counts: 4,
    },
    {
      profileLink:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGB4L9NaV1EMUGwRwg4y7pEVnyzjuSykDKIg&usqp=CAU',
      profileName: 'Abila',
      counts: 12,
    },
    {
      profileLink:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf7hFU10MvjcmHDAiACQDiQJEjCyPfFFs5zA&usqp=CAU',
      profileName: 'Young',
      counts: 2,
    },
    {
      profileLink:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmyCqy4cIe7GHLI0d3sSd6UkNi40hlv2u_1w&usqp=CAU',
      profileName: 'House',
      counts: 122,
    },
    {
      profileLink:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGB4L9NaV1EMUGwRwg4y7pEVnyzjuSykDKIg&usqp=CAU',
      profileName: 'Casey',
    },
  ];
  return (
    <SafeAreaView style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        {/* <DrawerItemList {...props} /> */}
        <OptionCards
          cardName={'To do List'}
          bgColor={'#e8e9ff'}
          count={12}
          isSelected={true}
          icon={
            <FontAwesome5
              name={'list-alt'}
              style={{color: '#6168f2'}}
              size={20}
            />
          }
        />
        <Accordion
          isSelected={true}
          icon={<FontAwesome5 name={'envelope'} size={20} color={'#3d3d3d'} />}
          accordionName={'InBox'}>
          {sampleData2.map((profile, i) => {
            return (
              <OptionCards
                key={i}
                cardName={profile.profileName}
                count={profile.counts}
                icon={<Avatar profileLink={profile.profileLink} />}
              />
            );
          })}
        </Accordion>
        {sampleData.map((item, i) => {
          return (
            <OptionCards
              key={i}
              cardName={item.cardName}
              count={item.count}
              icon={item.icon}
            />
          );
        })}
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

export default CustomSidebarMenu;

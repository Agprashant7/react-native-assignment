import React from 'react';
import {Tab, Text} from '@rneui/themed';
import {COLORS} from '../../utils/theme';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ItemCard from '../itemCard';

const Tabs = ({value, onChange, tabHead, tabData,onClick,onClickMore}) => {
  const icon = value => {
    if (value == 'Women') {
      return 'woman';
    } else if (value == 'Men') {
      return 'man';
    } else if (value == 'Kids') {
      return 'walk';
    }
  };
  return (
    <>
      <Tab
        value={value}
        backgroundColor="red"
        onChange={e => onChange(e)}
        indicatorStyle={{
          backgroundColor: COLORS.secondary,
          height: 3,
        }}
        containerStyle={{backgroundColor: COLORS.primary}}
        variant="primary">
        {tabHead.map((res, i) => {
          return (
            <Tab.Item
              key={i}
              title={res.title}
              titleStyle={{fontSize: 12}}
              icon={<Ionicons name={icon(res.title)} size={20} color={COLORS.fontColor} />}
            />
          );
        })}
      </Tab>
      {
        <ScrollView style={{backgroundColor: COLORS.primary}}>
          <View style={styles.container}>
            {tabData.map((data, i) => {
              
              return (
                i < 4 && (
                  <ItemCard
                    key={i}
                    onClick={()=>onClick(data.id)}
                    cardName={data.name}
                    image={data.image[0]}
                    cardPrice={data.price}
                  />
                )
              );
            })}
            {tabData.length > 4 && (
              <TouchableOpacity onPress={()=>onClickMore(tabData[0].section)}>
                <Text  style={{textDecorationLine:'underline'}}>See more</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      }
    </>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: COLORS.backgroundColor,
  },
});

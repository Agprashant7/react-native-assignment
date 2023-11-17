import React from 'react';
import {Tab, Text, Card, Button, Icon, TabView} from '@rneui/themed';
import {COLORS} from '../../utils/theme';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native';
import ItemCard from '../itemCard';

const Tabs = ({value, onChange, tabHead, tabData,onClick}) => {
  const icon = value => {
    if (value == 'Women') {
      return 'woman';
    } else if (value == 'Men') {
      return 'man';
    } else if (value == 'Kids') {
      return 'tag-faces';
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
              icon={{
                name: icon(res.title),
                type: 'materialicons',
                color: 'white',
              }}
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
              <View>
                <Text  style={{textDecorationLine:'underline'}}>See more</Text>
              </View>
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

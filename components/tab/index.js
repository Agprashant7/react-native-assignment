import React from 'react';
import {Tab, Text, Card, Button, Icon, TabView} from '@rneui/themed';
import {COLORS} from '../../utils/theme';
import {StyleSheet, View} from 'react-native';
import {Image} from '@rneui/base';
import {CardImage} from '@rneui/base/dist/Card/Card.Image';
import {ScrollView} from 'react-native';

const Tabs = ({value, onChange, tabHead, tabData}) => {
  const icon = value => {
    if (value == 'Women') {
      return 'woman';
    } else if (value == 'Men') {
      return 'man';
    } else if (value == 'Kids') {
      return 'tag-faces';
    }
  };
  console.log(tabData);
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

      {/* <Text>{tabData}</Text> */}

      {/* </TabView> */}
      {
        <ScrollView>
          <View style={styles.container}>
            {tabData.map((data, i) => {
              return (
                i < 4 && (
                  <Card key={i} containerStyle={styles.card}>
                    <View>
                      <CardImage
                        style={styles.card}
                        // resizeMode="contain"
                        resizeMode="stretch"
                        source={{
                          uri: data.image[0],
                        }}
                      />
                      <Card.Title>{data.name}</Card.Title>

                      <Text style={{textAlign: 'center'}}>{data.price}</Text>
                    </View>
                  </Card>
                )
              );
            })}
            <View>
              <Text>See more</Text>
            </View>
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
  },
  card: {
    width: 150,
    padding: 0,
    paddingBottom: 2,
    borderRadius: 8,
  },
  cardImage: {width: '100%', height: 200, marginBottom: 4},
});

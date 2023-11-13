import {Button, Text, StyleSheet, View} from 'react-native';
import {COLORS} from '../../utils/theme';
import {Image} from '@rneui/themed';
import Tabs from '../tab';
import {useState, useContext} from 'react';
import {ProductsDetailsContext} from '../../App';
import {onChange} from 'react-native-reanimated';
export function HomeScreen(props) {
  const [index, setIndex] = useState(0);
  const productDetails = useContext(ProductsDetailsContext);
  const tabHead = [{title: 'Men'}, {title: 'Women'}, {title: 'Kids'}];
  const tabData = value => {
    if (value == 0) {
      return productDetails.filter(function (item, i) {
        return item.section === 'men';
      });
    } else if (value == 1) {
      return productDetails.filter(function (item, i) {
        return item.section === 'women';
      });
    } else {
      return productDetails.filter(function (item, i) {
        return item.section === 'kid';
      });
    }
  };
  return (
    <View style={{flex: 1}}>
      <Image
        containerStyle={styles.item}
        source={{
          uri: 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/web_1_z75KGkf.jpg?format=webp&w=1500&dpr=1.0',
        }}
      />
      <View style={{flex: 2}}>
        <Tabs
          value={index}
          onChange={e => setIndex(e)}
          tabHead={tabHead}
          tabData={tabData(index)}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  list: {
    width: '100%',
    backgroundColor: '#000',
  },
  item: {
    width: '100%',
    flex: 2,
  },
});

import {Button, StyleSheet, View} from 'react-native';
import {COLORS} from '../../utils/theme';
import {Image, Text} from '@rneui/themed';
import Tabs from '../tab';
import {useState, useContext} from 'react';
import {ProductsDetailsContext} from '../../App';
import {ScrollView} from 'react-native-gesture-handler';
export function HomeScreen({navigation}) {
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
    <ScrollView
      style={styles.containerStyle}>
      <View>
        <Image
          containerStyle={styles.item}
          resizeMode="stretch"
          source={{
            uri: 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/web_1_z75KGkf.jpg?format=webp&w=1500&dpr=1.0',
          }}
          onPress={()=>navigation.navigate('Section',{name:'Latest'})}
        />
      </View>

      <View style={{flex: 5}}>
        <Tabs
          onClick={e =>
            navigation.navigate('Product', {id: e})
          }
          onClickMore={(e)=>navigation.navigate('Section',{name:e})}
          value={index}
          onChange={e => setIndex(e)}
          tabHead={tabHead}
          tabData={tabData(index)}
        />
      </View>
      <View style={{flex: 1, marginTop: 10}}>
        <Text h4 style={{textAlign: 'center'}}>
          Latest Collections
        </Text>
        <View style={{flex: 1, marginTop: 10}}>
          <Image
            resizeMode="stretch"
            containerStyle={styles.item}
            onPress={()=>navigation.navigate('Section',{name:'Latest'})}
            source={{
              uri: 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Collection-tile_EHW23s8.jpg?format=webp&w=480&dpr=1.0',
            }}
          />
          <Image
            resizeMode="stretch"
            onPress={()=>navigation.navigate('Section',{name:'Latest'})}
            containerStyle={styles.item}
            source={{
              uri: 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/jeans_Y0zDI8p.jpg?format=webp&w=480&dpr=1.0',
            }}
          />
          <Image
            resizeMode="stretch"
            onPress={()=>navigation.navigate('Section',{name:'Latest'})}
            containerStyle={styles.item}
            source={{
              uri: 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Collection_Tile_OS_POLOs_copy_FcA6U8H.jpg?format=webp&w=480&dpr=1.0',
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  containerStyle:{backgroundColor: COLORS.backgroundColor, paddingHorizontal: 10},
  list: {
    width: '100%',
    backgroundColor: '#000',
  },
  item: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    //flex: 2,
  },
});

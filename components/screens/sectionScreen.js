import {Text} from '@rneui/themed';
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ProductsDetailsContext} from '../../App';
import {COLORS} from '../../utils/theme';
import ItemCard from '../itemCard';
import {ScrollView} from 'react-native-gesture-handler';

const SectionScreen = ({route, navigation}) => {
  const name = route?.params?.name;
  const productDetails = useContext(ProductsDetailsContext);
  useEffect(() => {
    let key = name;
    if(name!=='Latest'){
      let filterProductWithCategory = productDetails.filter(
        (item, i) => item.category == key || item.section == key,
      );
      setProducts(filterProductWithCategory);
      return
    }
    let filterLatest = productDetails.filter(
      (item, i) => item.latest==='Y'
    );
    setProducts(filterLatest);
   
  }, [name]);
  const [products, setProducts] = useState();
  const getSectionName = name => {
    if (name == 'topwear') {
      return 'Top Wear';
    } else if (name == 'bottomwear') {
      return 'Bottom Wear';
    } else if (name == 'kids') {
      return 'Kid';
    } else if (name == 'men') {
      return 'Men';
    } else if (name == 'women') {
      return 'Women';
    } else if (name == 'women') {
      return 'Women';
    } else {
      return name;
    }
  };
  return (
    products && (
      <View style={styles.container}>
        <View style={styles.sectionName}>
        {
          name!=='Latest'?<Text>{`${getSectionName(name)}- ${products?.length} Items`}</Text>:<Text h4>Latest Collections</Text>
        }
          
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {products.map((res, i) => {
            return (
              <View key={i}>
                <ItemCard
                  onClick={() => {
                    navigation.navigate('Product', {id: res.id});
                  }}
                  cardPrice={res.price}
                  image={res.image[0]}
                  cardName={res.name}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    )
  );
};

export default SectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  sectionName: {marginTop: 20, marginLeft: 10},
  scrollContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    paddingBottom:30
  },
});

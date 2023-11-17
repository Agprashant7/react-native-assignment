import {Card} from '@rneui/base';
import {Text} from '@rneui/themed';
import {CardImage} from '@rneui/base/dist/Card/Card.Image';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../../utils/theme';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ItemCard = ({image, cardName, cardPrice, onClick, size}) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <Card containerStyle={[styles.card, {backgroundColor: COLORS.primary}]}>
        <View>
          <CardImage
            style={styles.card}
            resizeMode="stretch"
            source={{
              uri: image,
            }}
          />
          <Card.Title style={{color: COLORS.fontColor}}>{cardName}</Card.Title>

          <Text style={{textAlign: 'center'}}> &#8377;{cardPrice}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default ItemCard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  card: {
    width: 150,
    padding: 0,
    paddingBottom: 2,
    borderRadius: 6,
    borderWidth: 0,
  },
  cardImage: {width: '100%', height: 200, marginBottom: 4},
});

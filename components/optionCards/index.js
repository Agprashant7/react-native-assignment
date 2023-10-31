import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const OptionCards = ({cardName, bgColor, icon, count, isSelected}) => {
  return (
    <View style={[styles.optionCard, {backgroundColor: bgColor}]}>
      <View style={{marginLeft: 10, width: '10%'}}>{icon}
      {isSelected?<View style={styles.dot}></View>:<></>
      }
   
      </View>
      
      <Text style={styles.cardName}>{cardName}</Text>
      {count > 0 ? (
        <View style={styles.redBox}>
          <Text style={styles.count}>{count > 99 ? '99+' : count}</Text>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default OptionCards;

const styles = StyleSheet.create({
  optionCard: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardName: {
    width: '70%',
    color: '#3d3d3d',
    fontWeight: '400',
    paddingLeft: 7,
  },
  redBox: {
    width: 25,
    height: 15,
    backgroundColor: 'red',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    fontSize: 10,
    color: 'white',
  },
  dot:{
    position:'absolute',
    left:15,
    width: 6,
    height: 6,
    borderRadius: 6 / 2,
    backgroundColor: "red",
  }
});

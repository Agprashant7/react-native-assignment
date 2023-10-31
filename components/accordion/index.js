import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
const Accordion = ({accordionName, icon, children, isSelected}) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setIsActive(!isActive);
        }}
        style={styles.accordion}>
        <View style={{marginLeft: 10, width: '10%'}}>
          {icon}
          {isSelected ? <View style={styles.dot}></View> : <></>}
        </View>

        <Text style={styles.accordionName}>{accordionName}</Text>
        <View style={{marginLeft: 15}}>
          <Icon
            name={isActive ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            size={20}
          />
        </View>
      </TouchableOpacity>
      {isActive && <View style={styles.child}>{children}</View>}
    </View>
  );
};
export default Accordion;
const styles = StyleSheet.create({
  accordion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  accordionName: {
    width: '70%',
    color: '#3d3d3d',
    fontWeight: '400',
    paddingLeft: 8,
  },
  child: {
    marginLeft: 8,
  },
  dot: {
    position: 'absolute',
    left: 15,
    width: 6,
    height: 6,
    borderRadius: 6/ 2,
    backgroundColor: 'red',
  },
});

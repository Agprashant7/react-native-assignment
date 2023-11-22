import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../utils/theme';
const Accordion = ({
  accordionName,
  icon,
  children,
  isSelected,
  onChange,
  isOpen = false,
}) => {
  useEffect(() => {
    setIsActive(isOpen);
  }, [isOpen]);
  const [isActive, setIsActive] = useState();
  return (
    <View>
      <TouchableOpacity
        onPress={
          !onChange
            ? () => {
                setIsActive(!isActive);
              }
            : () => {
                onChange;
                setIsActive(!isActive);
              }
        }
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
            color={COLORS.fontColor}
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
    backgroundColor: COLORS.primary,
  },
  accordionName: {
    width: '70%',
    color: COLORS.fontColor,
    fontWeight: '400',
    paddingLeft: 8,
    fontSize:16
  },
  child: {
    marginLeft: 8,
  },
  dot: {
    position: 'absolute',
    left: 15,
    width: 6,
    height: 6,
    borderRadius: 6 / 2,
    backgroundColor: COLORS.highLighter,
  },
});

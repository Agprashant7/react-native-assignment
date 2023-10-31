import React from 'react';
import {Image} from 'react-native';

const Avatar = ({profileLink}) => {
  return (
    <Image
      width={20}
      height={20}
      style={{borderRadius: 10}}
      source={{uri: profileLink}}
    />
  );
};
export default Avatar;

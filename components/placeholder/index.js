import { Text } from "@rneui/themed";
import React from "react";
import { Pressable, View } from "react-native";
import { COLORS } from "../../utils/theme";

const Placeholder=({navigation})=>{
    return(
        <Pressable
        onPress={()=>navigation.navigate('Home')}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: COLORS.backgroundColor,
      }}>
      <Text style={{color:COLORS.secondary}} h4>Add Items</Text>
    </Pressable>
    )
}

export default Placeholder
import { Text } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import { COLORS } from "../../utils/theme";

const Placeholder=()=>{
    return(
        <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.backgroundColor,
      }}>
      <Text h4>No Items</Text>
    </View>
    )
}

export default Placeholder
import { Text } from "@rneui/base";
import React from "react";
import { StyleSheet, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from "../../utils/theme";
const AlertBanner=({content,type='success'})=>{
    return(
        <View
        style={styles.alert}>
        <View style={{marginLeft:20}}>
          <Icon name={type=='success'?'add-task':'warning'} color={type=='success'?'green':COLORS.secondary} size={20}/>
        </View>
        <View>
          <Text>{content}</Text>
        </View>
      </View>
    )
}
export default AlertBanner;


const styles=StyleSheet.create({
    alert:{
        backgroundColor: '#fff',
        width:'100%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 15,
        borderRadius:4,
        marginBottom:10
      }
})
import {Text, View} from 'react-native';
import {COLORS} from '../../utils/theme';
export function ProductScreen({route, navigation}) {
  const userId = route?.params?.userId;
  const userName = route?.params?.userName;

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 20}}>Product Screen</Text>
      <Text style={{color: COLORS.secondary}}>
        ID: {userId ? userId : 'AB1'}
      </Text>
      <Text style={{color: COLORS.secondary}}>
        Name: {userName ? userName : 'ID01'}
      </Text>
    </View>
  );
}

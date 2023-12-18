import {Text, View} from 'react-native';
import { COLORS } from '../../utils/theme';
export function AccountScreen(props) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:COLORS.backgroundColor}}>
      <Text style={{fontSize: 20}}>Coming Soon</Text>
    </View>
  );
}

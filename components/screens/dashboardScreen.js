import {Button, Text, View} from 'react-native';
import {COLORS} from '../../utils/theme';
export function DashboardScreen(props) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 20}}>Dashboard Screen</Text>
      <Button
        color={COLORS.secondary}
        title="Go to Product Details"
        onPress={() => {
          props.navigation.navigate('Product', {
            userId: 1,
            userName: 'Awesome User',
          });
        }}
      />
    </View>
  );
}

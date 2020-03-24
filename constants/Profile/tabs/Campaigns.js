import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2FB',
    padding: Dimensions.get('screen').width * 0.03,
    height: Dimensions.get('screen').height * 0.45,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default styles;

import React from 'react';
import styles from '../constants/screens/UsernameScreen';

const WelcomeScreen = props => {
  return (
    <View>
      <Text>You're in! Welcome to Key Conservation.</Text>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Loading')}
        style={styles.touchableButton}
      >
        <View style={styles.touchableView}>
          <Text style={styles.touchableText}>LET'S GO!</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

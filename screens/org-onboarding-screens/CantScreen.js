import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet
} from 'react-native';
import styles from '../../constants/screens/org-onboarding-styles/CantScreen.js';
import Circle from '../../assets/jsicons/OnBoarding/FilledCircle';
import FilledCircle from '../../assets/jsicons/OnBoarding/FilledCircle';

const CantScreen = props => {
  return (
    <View style={styles.obBody}>
      <ScrollView>
        <View>
          <Text style={styles.obTitle}>
            What we <Text style={styles.highlight}> cannot </Text> do...
          </Text>
        </View>
        <View>
          <View style={styles.contentWrapper}>
            <View style={styles.iconWrapper}>
              <FilledCircle />
              {/* <AntDesign 
					name="closecircle" 
					size={24}
					color="#f66767"
					/> */}
            </View>
            <View>
              <View style={{ width: '90%' }}>
                <Text style={styles.obText}>
                  Guarantee that all of your requests will get support and
                  funding.
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.contentWrapper}>
            <View style={styles.iconWrapper}>
              <Circle />
            </View>
            <View style={{ width: '90%' }}>
              <Text style={styles.obText}>
                Provide your organization with internet access.
              </Text>
            </View>
          </View>
          <View style={styles.contentWrapper}>
            <View style={styles.iconWrapper}>
              <Circle />
            </View>
            <View style={{ width: '90%' }}>
              <Text style={styles.obTextBottom}>
                Oversee work completed by skilled professionals.
              </Text>
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={styles.obFwdContainer}
            onPress={() => {
              props.navigation.navigate('MakeAccount');
            }}
          >
            <Text style={styles.obFwdBtnText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default CantScreen;

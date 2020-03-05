import React, { useState, useEffect } from 'react';
import { Switch, Text, View } from 'react-native';

import styles from '../../constants/screens/org-onboarding-styles/ChoosePhoneSwitches';

const ChoosePhoneSwitches = props => {
  const [applePhone, setApplePhone] = useState(false);
  const [androidPhone, setAndroidPhone] = useState(false);
  const [otherPhone, setOtherPhone] = useState(false);

  useEffect(() => {
    if (props?.airtableState.smartphone_type) {
      const typeArr = props.airtableState.smartphone_type.split(',');
      const formatted = typeArr.map(type => type.trim());

      formatted.filter(type => type === 'Apple').length
        ? setApplePhone(true)
        : setApplePhone(false);
      formatted.filter(type => type === 'Android').length
        ? setAndroidPhone(true)
        : setAndroidPhone(false);
      formatted.filter(type => type === 'Other').length
        ? setOtherPhone(true)
        : setOtherPhone(false);
    } else {
      null;
    }
  }, [props.airtableState.smartphone_type]);

  useEffect(() => {
    let smartphoneType = '';
    const types = ['Apple', 'Android', 'Other'];
    const bools = [applePhone, androidPhone, otherPhone];
    types.forEach((type, index) => {
      if (bools[index]) {
        if (smartphoneType.length) {
          smartphoneType = `${smartphoneType}, ${type}`;
        } else smartphoneType = type;
      }
    });
    props.onChangeText({
      ...props.airtableState,
      smartphone_type: smartphoneType
    });
  }, [
    applePhone,
    androidPhone,
    otherPhone,
    props.airtableState.smartphone_type
  ]);

  return (
    <React.Fragment>
      <View style={styles.switchContainer}>
        <Switch
          disabled={props.disabled}
          trackColor={{ true: '#00FF9D' }}
          style={styles.obSwitchButton}
          value={applePhone}
          onValueChange={newValue => setApplePhone(newValue)}
        />
        <Text style={styles.obSwitchLabel}>Apple</Text>
      </View>
      <View style={styles.switchContainer}>
        <Switch
          disabled={props.disabled}
          trackColor={{ true: '#00FF9D' }}
          style={styles.obSwitchButton}
          value={androidPhone}
          onValueChange={newValue => setAndroidPhone(newValue)}
        />
        <Text style={styles.obSwitchLabel}>Android</Text>
      </View>
      <View style={styles.switchContainer}>
        <Switch
          disabled={props.disabled}
          trackColor={{ true: '#00FF9D' }}
          style={styles.obSwitchButton}
          value={otherPhone}
          onValueChange={newValue => setOtherPhone(newValue)}
        />
        <Text style={styles.obSwitchLabel}>Other</Text>
      </View>
    </React.Fragment>
  );
};

export default ChoosePhoneSwitches;

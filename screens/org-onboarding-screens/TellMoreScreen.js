import React, { useState, useEffect } from 'react';
import {
  Picker,
  Switch,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import styles from '../../constants/screens/org-onboarding-styles/TellMore';
import ConservationOptimismModal from '../../components/ConservationOptimismModal';
import * as SecureStore from 'expo-secure-store';
import ProgressBar from './formElement/ProgressBar';

import QuestionCircle from '../../assets/jsicons/OnBoarding/QuestionCircle';
import NavigateButton from './formElement/NavigateButton';
import NavigateBack from './formElement/NavigateBack.js';
import ChevronLeftBlack from '../../assets/jsicons/miscIcons/ChevronLeftBlack.js';
import CountryPicker from 'react-native-country-picker-modal';
import OrgOnboardCountries from '../../components/OrgOnboardCountries';

const TellMoreScreen = props => {
  const [airtableState, onChangeText] = useState({
    other_countries: '',
    multiple_projects: '',
    affiliations_partnerships: '',
    conservation_optimism: null,
    smartphone_access: null,
    smartphone_type: ''
  });

  const [selectedCountries, setSelectedCountries] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const airtableKey = props.navigation.getParam('airtableKey', 'defaultValue');
  const airtableID = props.navigation.getParam('airtableID', 'defaultValue');
  const airtableState2 = props.navigation.getParam(
    'airtableState',
    'defaultValue'
  ); // this grabs the airtable form ID and data from previous component.

  const [applePhone, setApplePhone] = useState(false);
  const [androidPhone, setAndroidPhone] = useState(false);
  const [otherPhone, setOtherPhone] = useState(false);

  const toggled = type => {
    switch (type) {
      case 'apple': {
        setApplePhone(!applePhone);
        console.log(
          'apple',
          applePhone,
          'android',
          androidPhone,
          'other',
          otherPhone
        );
        break;
      }
      case 'android': {
        setAndroidPhone(!androidPhone);
        console.log(
          'apple',
          applePhone,
          'android',
          androidPhone,
          'other',
          otherPhone
        );
        break;
      }
      case 'other': {
        setOtherPhone(!otherPhone);
        console.log(
          'apple',
          applePhone,
          'android',
          androidPhone,
          'other',
          otherPhone
        );
        break;
      }
      default: {
        return null;
      }
    }
  };

  const whichPhones = (apple, android, other) => {
    switch ((apple, android, other)) {
      case (true, true, true): {
        onChangeText({
          ...airtableState,
          smartphone_type: 'All'
        });
        break;
      }
      case (true, true, false): {
        onChangeText({
          ...airtableState,
          smartphone_type: 'Apple, Android'
        });
        break;
      }
      case (false, true, false): {
        onChangeText({
          ...airtableState,
          smartphone_type: 'Android'
        });
        break;
      }
      case (true, false, false): {
        onChangeText({
          ...airtableState,
          smartphone_type: 'Apple'
        });
        break;
      }
      case (false, true, true): {
        onChangeText({
          ...airtableState,
          smartphone_type: 'Android, Other'
        });
        break;
      }
      default: {
        return null;
      }
    }
  };

  useEffect(() => {
    whichPhones(applePhone, androidPhone, otherPhone);
  }, [applePhone, androidPhone, otherPhone]);

  useEffect(() => {
    onChangeText({ other_countries: selectedCountries.toString() });
  }, [selectedCountries]);

  const setAirtableID = async () => {
    await SecureStore.setItemAsync('airtableID', airtableID);
    // console.log(await SecureStore.getItemAsync('airtableID', {}));
  }; // This saves the current airtable form's ID in SecureStore.

  useEffect(() => {
    setAirtableID();
    // console.log('airtableState2', airtableState2);
  });

  const airtableStateAdd = Object.assign({
    ...airtableState2,
    ...airtableState
  }); // This merges the previous and current fields together for backend.

  const updateAirtable = () => {
    // this updates the airtable form created in the previous component

    if (airtableState.smartphone_type) {
      onChangeText({ ...airtableState, smartphone_access: 'Yes' });
    }
    var Airtable = require('airtable');
    var base = new Airtable({ apiKey: airtableKey }).base('appbPeeXUSNCQWwnQ');
    base('Table 1').update(
      [
        {
          id: airtableID,
          fields: {
            other_countries: airtableState.other_countries.toString(),
            affiliations_partnerships: airtableState.affiliations_partnerships,
            conservation_optimism: airtableState.conservation_optimism,
            multiple_projects: airtableState.multiple_projects,
            smartphone_access: airtableState.smartphone_access,
            smartphone_type: airtableState.smartphone_type
          }
        }
      ],
      function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
        records.forEach(function(record) {});
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.arrowView}>
          <NavigateBack
            onButtonPress={() => {
              props.navigation.navigate('TellAboutOrganization');
            }}
            color='#000'
          />
        </View>
        <View style={styles.progressBar}>
          <ProgressBar
            progress={50}
            height={9}
            backgroundColor='#D7FF44'
            animated={false}
          />
          <Text style={styles.progressBarText}>50% Complete</Text>
        </View>
      </View>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior='height'
        keyboardVerticalOffset={86}
        enabled
      >
        <ScrollView>
          <View style={styles.obBody}>
            <Text style={styles.obTitle}>Organization Details</Text>
            <Text style={styles.obText}>
              In which countries does you organization work?{' '}
              <Text style={[styles.obText, styles.italic]}>
                Select All that apply.
              </Text>
            </Text>
            <View style={styles.countryPickerContainer}>
              <View style={styles.countryTitleContainer}>
                <Text style={styles.countryPickerTitle}>Country</Text>
              </View>
              <View style={styles.countryComponentSpacer}>
                <View style={styles.countryComponentContainer}>
                  <CountryPicker
                    //   the following line has a long string of spaces to accommodate Megan's design since the style of the placeholder does not seem to be editable *************
                    placeholder='                                                                                           '
                    // ***************
                    onSelect={value => {
                      const countryCheck = selectedCountries.includes(
                        value.name
                      );
                      if (!countryCheck) {
                        setSelectedCountries([
                          ...selectedCountries,
                          value.name
                        ]);
                      }
                      // onChangeText({
                      //   ...airtableState,
                      //   other_countries: selectedCountries.toString()
                      // });
                    }}
                    cca2='US'
                    translation='eng'
                  />
                </View>
              </View>
              <View style={styles.countryChevronContainer}>
                <ChevronLeftBlack style={styles.chevron} />
              </View>
            </View>
            <View style={styles.listContainer}>
              {selectedCountries.map((name, index) => (
                <OrgOnboardCountries
                  key={index}
                  name={name}
                  index={index}
                  setSelectedCountries={setSelectedCountries}
                  selectedCountries={selectedCountries}
                />
              ))}
            </View>

            <Text style={styles.obText}>
              (Optional) If you have multiple projects under your organization,
              enter the name of each one to add them to your profile. If they
              are signed up to the Key App they will auto-populate so you can
              add them. If they have not signed up, you can add them later.
            </Text>

            <View style={styles.aroundInput}>
              <Text style={styles.placeholderText}>Add Project</Text>
              <TextInput
                style={styles.obTextInput}
                onChangeText={text =>
                  onChangeText({ ...airtableState, multiple_projects: text })
                }
                value={airtableState.multiple_projects}
              />
            </View>
            <Text style={styles.obText}>
              Please list your current partnerships and affiliations:
            </Text>
            <View style={styles.aroundInput}>
              <Text style={styles.placeholderText}>Add Partnerships</Text>
              <TextInput
                style={styles.obTextInput}
                onChangeText={text =>
                  onChangeText({
                    ...airtableState,
                    affiliations_partnerships: text
                  })
                }
                value={airtableState.affiliations_partnerships}
              />
            </View>
            <View>
              <Text style={styles.obText}>
                Will you join us in Conservation Optimism?
                <TouchableHighlight onPress={() => setIsModalVisible(true)}>
                  <View style={styles.questionMark}>
                    <QuestionCircle width='22' height='22' />
                  </View>
                </TouchableHighlight>
              </Text>
            </View>
            <ConservationOptimismModal
              setIsModalVisible={setIsModalVisible}
              isModalVisible={isModalVisible}
            />
            <Switch
              trackColor={{ true: '#00FF9D' }}
              style={styles.obSwitchButton}
              value={airtableState.conservation_optimism}
              onValueChange={newValue =>
                onChangeText({
                  ...airtableState,
                  conservation_optimism: newValue
                })
              }
            />
            <Text style={styles.obText}>
              Does your organization have access to a smartphone?
            </Text>
            <Switch
              trackColor={{ true: '#00FF9D' }}
              style={styles.obSwitchButton}
              value={airtableState.smartphone_access}
              onValueChange={newValue =>
                onChangeText({
                  ...airtableState,
                  smartphone_access: newValue
                })
              }
            />

            {airtableState.smartphone_access === true ? (
              <React.Fragment>
                <Text style={styles.obText}>
                  What type of smartphones do you use?
                  <Text style={[styles.obText, styles.italic]}>
                    {' '}
                    Select All that apply.
                  </Text>
                </Text>

                <View style={styles.switchContainer}>
                  <Switch
                    trackColor={{ true: '#00FF9D' }}
                    style={styles.obSwitchButton}
                    value={applePhone}
                    onChange={() => toggled('apple')}
                  />
                  <Text style={styles.obSwitchLabel}>Apple</Text>
                </View>

                <View style={styles.switchContainer}>
                  <Switch
                    trackColor={{ true: '#00FF9D' }}
                    style={styles.obSwitchButton}
                    value={androidPhone}
                    onValueChange={() => toggled('android')}
                  />
                  <Text style={styles.obSwitchLabel}>Android</Text>
                </View>
                <View style={styles.switchContainer}>
                  <Switch
                    trackColor={{ true: '#00FF9D' }}
                    style={styles.obSwitchButton}
                    value={otherPhone}
                    onChange={() => toggled('other')}
                  />
                  <Text style={styles.obSwitchLabel}>Other</Text>
                </View>
                {/* <View style={styles.switchContainer}>
                  <Switch
                    trackColor={{ true: '#00FF9D' }}
                    style={styles.obSwitchButton}
                    selectedValue={airtableState.smartphone_type}
                    onValueChange={newValue =>
                      onChangeText({
                        ...airtableState,
                        smartphone_type: 'All'
                      })
                    }
                  />
                  <Text style={styles.obSwitchLabel}>All</Text>
                </View> */}
              </React.Fragment>
            ) : null}
            <View style={styles.buttons}>
              {airtableState.other_countries === '' ||
              airtableState.smartphone_type === '' ? (
                <NavigateButton
                  label='Next'
                  inactive={true}
                  onButtonPress={() => {
                    Alert.alert('Oops', 'Please fill in all sections of form', [
                      { text: 'Got it.' }
                    ]);
                  }}
                />
              ) : airtableState.conservation_optimism === false ||
                airtableState.smartphone_access === false ? (
                <NavigateButton
                  label='Next'
                  inactive={true}
                  onButtonPress={() => {
                    Alert.alert(
                      'Oops',
                      'Agree to conservation optimism and smart phone use',
                      [{ text: 'Got it.' }]
                    );
                  }}
                />
              ) : (
                <NavigateButton
                  label='Next'
                  onButtonPress={() => {
                    updateAirtable();
                    props.navigation.navigate('AccountScreen', {
                      airtableStateAdd: airtableStateAdd,
                      airtableKey: airtableKey
                    });
                    console.log(
                      'airtableState from tellmore',
                      airtableState,
                      'applePhone',
                      applePhone
                    ); // This passes the combined fields sent to airtable needed for backend to the next component.
                  }}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
export default TellMoreScreen;

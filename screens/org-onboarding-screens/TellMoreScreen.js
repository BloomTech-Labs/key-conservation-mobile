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
import styles from '../../constants/screens/org-onboarding-styles/VerifyOrg.js';
import ConservationOptimismModal from '../../components/ConservationOptimismModal';
import * as SecureStore from 'expo-secure-store';
import QuestionCircle from '../../assets/jsicons/OnBoarding/QuestionCircle';
import NavigateButton from './formElement/NavigateButton';
import NavigateBack from './formElement/NavigateBack.js';
import CustomFilterComponent from './formElement/CustomFilterComponent';
import CountryPicker, {
  getAllCountries
} from 'react-native-country-picker-modal';
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

  console.log('airtableState.other_countries', airtableState.other_countries);

  //   const renderFilter = ({ value, onChange, onClose }) => (
  //     <CustomFilterComponent
  //       value={value}
  //       onChange={onChange}
  //       onClose={onClose}
  //     />
  //   );
  // console.log(await SecureStore.getItemAsync('airtableID', {}));

  const AvailableCountries = async () =>
    await getAllCountries().filter(country => country.cca2 === 'US');

  const [isModalVisible, setIsModalVisible] = useState(false);

  //   useEffect(() => {
  //     printList();
  //   }, [selectedCountries.length]);

  const airtableKey = props.navigation.getParam('airtableKey', 'defaultValue');
  const airtableID = props.navigation.getParam('airtableID', 'defaultValue');
  const airtableState2 = props.navigation.getParam(
    'airtableState',
    'defaultValue'
  ); // this grabs the airtable form ID and data from previous component.

  const setAirtableID = async () => {
    await SecureStore.setItemAsync('airtableID', airtableID);
    // console.log(await SecureStore.getItemAsync('airtableID', {}));
  }; // This saves the current airtable form's ID in SecureStore.

  useEffect(() => {
    setAirtableID();
    console.log('airtableState2', airtableState2);
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
            other_countries: airtableState.other_countries,
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

  //   const printList = () => {
  //     // console.log('selectedCountries before ->', selectedCountries);
  //     // console.log('value.name', value.name);
  //     // console.log('selectedCountries after ->', selectedCountries);
  //     return (
  //       <View>
  //         {!selectedCountries ? (
  //           <Text>No Countries Selected.</Text>
  //         ) : (
  //           selectedCountries.map(name => <Text key={Date.now()}>{name}</Text>)
  //         )}
  //       </View>
  //     );
  //   };

  return (
    <KeyboardAvoidingView
      style={styles.obBody}
      behavior='height'
      keyboardVerticalOffset={86}
      enabled
    >
      <ScrollView>
        <View style={styles.obBody}>
          <Text style={styles.obTitle}>Organization Details</Text>
          <Text style={styles.obText}>
            In which countries does you organization work?{' '}
            <Text style={styles.italic}>Select All that apply.</Text>
          </Text>
          <View style={styles.aroundPicker}>
            <CountryPicker
              //   renderFilter={renderFilter({ name: 'Afghanistan' })}
              filterable={true}
              onSelect={value => {
                setSelectedCountries([...selectedCountries, value.name]);
                onChangeText({
                  ...airtableState,
                  other_countries: selectedCountries
                });
              }}
              cca2='US'
              translation='eng'
              //   renderFilter={renderFilter({ name: 'Afghanistan' })}
            />
          </View>
          {selectedCountries.map((name, index) => (
            <View style={styles.listContainer}>
              <OrgOnboardCountries
                key={index}
                name={name}
                index={index}
                setSelectedCountries={setSelectedCountries}
                selectedCountries={selectedCountries}
              />
            </View>
          ))}
          {/* <Text style={styles.instructions}>{selectedCountries}</Text> */}
          {/* {this.state.country && (
            <Text style={styles.data}>
              {JSON.stringify(this.state.country, null, 2)}
            </Text>
          )} */}
          {/* <Text style={styles.obFieldName}>
            In what countries does your organization work?
          </Text>
          <TextInput
            style={styles.obTextInput}
            onChangeText={text =>
              onChangeText({ ...airtableState, other_countries: text })
            }
            value={airtableState.other_countries}
            placeholder='United States, Brazil, France, etc.'
          /> */}
          <Text style={styles.obFieldName}>
            Projects your organization is working on:
          </Text>
          <TextInput
            style={styles.obTextInput}
            onChangeText={text =>
              onChangeText({ ...airtableState, multiple_projects: text })
            }
            value={airtableState.multiple_projects}
            placeholder='Project 1, Project 2, etc.'
          />
          <Text style={styles.obFieldName}>
            Current partnerships and affiliations:
          </Text>
          <TextInput
            style={styles.obTextInput}
            onChangeText={text =>
              onChangeText({
                ...airtableState,
                affiliations_partnerships: text
              })
            }
            value={airtableState.affiliations_partnerships}
            placeholder='Partnership 1, Partnership 2, etc.'
          />

          <Text style={styles.obFieldName}>
            Will you join us in Conservation Optimism?
            <TouchableHighlight onPress={() => setIsModalVisible(true)}>
              <View style={styles.questionMark}>
                <QuestionCircle style={{ marginLeft: 10, marginTop: 3 }} />
              </View>
            </TouchableHighlight>
          </Text>

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
          <Text style={styles.obFieldName}>
            Does your organization have access to a smartphone?
          </Text>
          <View style={pickerStyle.pickerContainer}>
            <Picker
              selectedValue={airtableState.smartphone_type}
              style={pickerStyle.picker}
              itemStyle={pickerStyle.pickerItem}
              onValueChange={itemValue =>
                onChangeText({ ...airtableState, smartphone_type: itemValue })
              }
            >
              <Picker.Item label='No' value='none' />
              <Picker.Item label='Apple' value='apple' />
              <Picker.Item label='Android' value='android' />
            </Picker>
          </View>
          <TouchableOpacity
            style={styles.obFwdContainer}
            onPress={() => {
              if (
                airtableState.other_countries === '' ||
                airtableState.multiple_projects === '' ||
                airtableState.smartphone_type === ''
              ) {
                Alert.alert('Oops', 'Please fill in all sections of form', [
                  { text: 'Got it.' }
                ]);
              } else if (
                airtableState.conservation_optimism === false ||
                airtableState.smartphone_access === false
              ) {
                Alert.alert(
                  'Oops',
                  'Agree to conservation optimism and smart phone use',
                  [{ text: 'Got it.' }]
                );
              } else {
                updateAirtable();
                props.navigation.navigate('AccountScreen', {
                  airtableStateAdd: airtableStateAdd,
                  airtableKey: airtableKey
                }); // This passes the combined fields sent to airtable needed for backend to the next component.
              }
            }}
          >
            <Text style={styles.obFwdBtnText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const pickerStyle = StyleSheet.create({
  pickerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20
  },

  picker: {
    width: 100,
    height: 100
  },
  pickerItem: {
    height: 100
  }
});
export default TellMoreScreen;

import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  Switch
} from 'react-native';
import styles from '../../constants/screens/org-onboarding-styles/ReviewYourInfo';
import NavigateButton from './formElement/NavigateButton.js';
import { MaterialIcons, Entypo, Octicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';

const ReviewYourInfoScreen = props => {
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingOrganization, setIsEditingOrganization] = useState(false);
  const [isEditingAffiliations, setIsEditingAffiliations] = useState(false);
  const [isEditingMisc, setIsEditingMisc] = useState(false);

  const [airtableId, setAirtableId] = useState('');

  const [state, setState] = useState({
    other_countries: '',
    multiple_projects: '',
    affiliations_partnerships: 'project 1, project 2,',
    conservation_optimism: null,
    smartphone_access: null,
    smartphone_type: '',
    org_name: '',
    website: '',
    address: '',
    country: '',
    phone: '',
    point_of_contact: '',
    poc_position: '',
    email: ''
  });

  useEffect(() => {
    setState(props.navigation.getParam('airtableStateAdd', 'defaultValue'));
    getAirtableID();
  }, []); // Grabs state for backend through nav params again.

  const getAirtableID = async () => {
    const id = await SecureStore.getItemAsync('airtableID', {});
    setAirtableId(id);
  };

  const key = props.navigation.getParam('airtableKey', 'defaultValue');

  const updateAirtable = () => {
    var Airtable = require('airtable');
    var base = new Airtable({ apiKey: key }).base('appbPeeXUSNCQWwnQ');
    base('Table 1').update(
      [
        {
          id: airtableId,
          fields: {
            other_countries: state.other_countries,
            affiliations_partnerships: state.affiliations_partnerships,
            conservation_optimism: state.conservation_optimism,
            multiple_projects: state.multiple_projects,
            smartphone_access: state.smartphone_access,
            smartphone_type: state.smartphone_type,
            org_name: state.org_name,
            website: state.website,
            phone: state.phone,
            address: state.address,
            country: state.country,
            point_of_contact: state.point_of_contact,
            poc_position: state.poc_position,
            email: state.email
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
  }; // Updates corresponding airtable form if any fields are changed.

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior='height'
      keyboardVerticalOffset={86}
      enabled
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.obBody}>
          <Text style={styles.obTitle}>Review your info</Text>
        </View>
        <View>
          <View>
            <Text style={styles.obText}>
              Check that everything looks good and tap submit, or go back and
              edit
            </Text>
          </View>
          {!isEditingAccount ? (
            <View style={styles.borderContainer}>
              <View style={[styles.row, styles.opaqueHeader]}>
                <Text style={[styles.obSubtitle, { marginRight: 20 }]}>
                  Account Administrator
                </Text>
                <TouchableOpacity
                  onPress={() => setIsEditingAccount(!isEditingAccount)}
                >
                  <MaterialIcons name='edit' size={28} color={'#9A99A2'} />
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <Text style={styles.obSubtitleSm}>Contact Name: </Text>
                <Text style={styles.obText}>{state.point_of_contact}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.obSubtitleSm}>Contact Position: </Text>
                <Text style={styles.obText}>{state.poc_position}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.borderContainer}>
              <View style={[styles.row, styles.opaqueHeader]}>
                <Text style={[styles.obSubtitle, { marginRight: 20 }]}>
                  Account Administrator
                </Text>
                <TouchableOpacity
                  onPress={() => setIsEditingAccount(!isEditingAccount)}
                >
                  <Entypo name='check' size={36} color={'#00FF9D'} />
                </TouchableOpacity>
              </View>

              <View style={styles.row}>
                <Text style={styles.obSubtitleSm}>Contact Name: </Text>
                <TextInput
                  style={[styles.obText, styles.textInput]}
                  value={state.point_of_contact}
                  placeholder={'Point of Contact Name'}
                  onChangeText={text =>
                    setState({ ...state, point_of_contact: text })
                  }
                />
              </View>

              <View style={styles.row}>
                <Text style={styles.obSubtitleSm}>Contact Position: </Text>
                <TextInput
                  style={[styles.obText, styles.textInput]}
                  value={state.poc_position}
                  placeholder={' Contact Position'}
                  onChangeText={text =>
                    setState({ ...state, poc_position: text })
                  }
                />
              </View>
            </View>
          )}
          {!isEditingContact ? (
            <View style={styles.borderContainer}>
              <View style={[styles.row, styles.opaqueHeader]}>
                <Text style={[styles.obSubtitle, { marginRight: 20 }]}>
                  Contact & Credentials
                </Text>
                <TouchableOpacity
                  onPress={() => setIsEditingContact(!isEditingContact)}
                >
                  <MaterialIcons name='edit' size={28} color={'#9A99A2'} />
                </TouchableOpacity>
              </View>

              <View style={styles.row}>
                <Text style={styles.obSubtitleSm}>Organization Name:</Text>
                <Text style={styles.obText}>{state.org_name}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.obSubtitleSm}>Website:</Text>
                <Text style={styles.obText}>{state.website}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.obSubtitleSm}>Phone:</Text>
                <Text style={styles.obText}>{state.phone}</Text>
              </View>

              <View>
                <Text style={styles.obSubtitleSm}>Address:</Text>
                <Text style={styles.obText}>
                  {state.address} {/*state.country*/}
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.borderContainer}>
              <View style={[styles.row, styles.opaqueHeader]}>
                <Text style={[styles.obSubtitle, { marginRight: 20 }]}>
                  Contact & Credentials
                </Text>
                <TouchableOpacity
                  onPress={() => setIsEditingContact(!isEditingContact)}
                >
                  <Entypo name='check' size={36} color={'#00FF9D'} />
                </TouchableOpacity>
              </View>

              <View style={styles.row}>
                <Text style={styles.obSubtitleSm}>Organization Name:</Text>
                <TextInput
                  style={[styles.obText, styles.textInput]}
                  value={state.org_name}
                  onChangeText={text => setState({ ...state, org_name: text })}
                ></TextInput>
              </View>

              <View style={styles.row}>
                <Text style={styles.obSubtitleSm}>Website:</Text>
                <TextInput
                  style={[styles.obText, styles.textInput]}
                  value={state.website}
                  onChangeText={text => setState({ ...state, website: text })}
                ></TextInput>
              </View>

              <View style={styles.row}>
                <Text style={styles.obSubtitleSm}>Phone:</Text>
                <TextInput
                  style={[styles.obText, styles.textInput]}
                  value={state.phone}
                  onChangeText={text => setState({ ...state, phone: text })}
                ></TextInput>
              </View>

              <View>
                <Text style={styles.obSubtitleSm}>Address:</Text>
                <TextInput
                  style={[styles.obText, styles.textInput]}
                  multiline
                  value={state.address}
                  onChangeText={text => setState({ ...state, address: text })}
                ></TextInput>
              </View>
            </View>
          )}
          {!isEditingOrganization ? (
            <View style={styles.borderContainer}>
              <View style={[styles.row, styles.opaqueHeader]}>
                <Text style={[styles.obSubtitle, { marginRight: 20 }]}>
                  Organization Activity
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    setIsEditingOrganization(!isEditingOrganization)
                  }
                >
                  <MaterialIcons name='edit' size={28} color={'#9A99A2'} />
                </TouchableOpacity>
              </View>
              <Text style={styles.obSubtitleSm}>Countries of Operation:</Text>
              <Text style={styles.obText}>{state.other_countries}</Text>

              {state.multiple_projects.split(',').map((project, idx) => {
                if (project === '') return;
                return (
                  <View key={idx}>
                    <Text style={styles.obSubtitleSm}>Project:{idx + 1}</Text>
                    <Text style={styles.obText}>{project}</Text>
                  </View>
                );
              })}
            </View>
          ) : (
            <View style={styles.borderContainer}>
              <View style={[styles.row, styles.opaqueHeader]}>
                <Text style={[styles.obSubtitle, { marginRight: 20 }]}>
                  Organization Activity
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    setIsEditingOrganization(!isEditingOrganization)
                  }
                >
                  <Entypo name='check' size={36} color={'#00FF9D'} />
                </TouchableOpacity>
              </View>
              <Text style={styles.obSubtitleSm}>Countries of Operation:</Text>
              <TextInput
                style={[styles.obText, styles.textInput]}
                value={state.other_countries}
                onChangeText={text =>
                  setState({ ...state, other_countries: text })
                }
              />

              {state.multiple_projects.split(',').map((project, idx, arr) => {
                if (project === '') return;
                return (
                  <View key={idx}>
                    <Text style={styles.obSubtitleSm}>Project:{idx + 1}</Text>
                    <TextInput
                      style={[styles.obText, styles.textInput]}
                      value={project}
                      onChangeText={text => {
                        arr.splice(idx, 1);
                        arr.splice(idx, 0, text);
                        setState({
                          ...state,
                          multiple_projects: arr.join()
                        });
                      }}
                    />
                  </View>
                );
              })}
            </View>
          )}
          {!isEditingAffiliations ? (
            <View style={styles.borderContainer}>
              <View style={[styles.row, styles.opaqueHeader]}>
                <Text style={[styles.obSubtitle, { marginRight: 20 }]}>
                  Partnerships & Affiliations
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    setIsEditingAffiliations(!isEditingAffiliations)
                  }
                >
                  <MaterialIcons name='edit' size={28} color={'#9A99A2'} />
                </TouchableOpacity>
              </View>
              {state.affiliations_partnerships
                .split(',')
                .map((affilicated, idx) => {
                  if (affilicated === '') return;
                  return (
                    <Text key={idx} style={styles.obText}>
                      {affilicated}
                    </Text>
                  );
                })}
            </View>
          ) : (
            <View style={styles.borderContainer}>
              <View style={[styles.row, styles.opaqueHeader]}>
                <Text style={[styles.obSubtitle, { marginRight: 20 }]}>
                  Partnerships & Affiliations
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    setIsEditingAffiliations(!isEditingAffiliations)
                  }
                >
                  <Entypo name='check' size={36} color={'#00FF9D'} />
                </TouchableOpacity>
              </View>
              {state.affiliations_partnerships
                .split(',')
                .map((affilicated, idx, arr) => {
                  if (affilicated === '') return;
                  return (
                    <TextInput
                      key={idx}
                      style={[styles.obText, styles.textInput]}
                      value={affilicated}
                      onChangeText={text => {
                        arr.splice(idx, 1);
                        arr.splice(idx, 0, text);
                        setState({
                          ...state,
                          affiliations_partnerships: arr.join()
                        });
                      }}
                    />
                  );
                })}
            </View>
          )}
          {!isEditingMisc ? (
            <View style={styles.borderContainer}>
              <View style={[styles.row, styles.opaqueHeader]}>
                <Text style={[styles.obSubtitle, { marginRight: 20 }]}>
                  Miscellaneous Items
                </Text>
                <TouchableOpacity
                  onPress={() => setIsEditingMisc(!isEditingMisc)}
                >
                  <MaterialIcons name='edit' size={28} color={'#9A99A2'} />
                </TouchableOpacity>
              </View>

              {state.conservation_optimism && (
                <Text style={styles.obText}>
                  We will join Key Conservation in practicing Conservation
                  Optimism.
                </Text>
              )}
              {state.smartphone_access && (
                <Text style={styles.obText}>
                  Our Organization does use smartphones.
                </Text>
              )}
            </View>
          ) : (
            <View style={styles.borderContainer}>
              <View style={[styles.row, styles.opaqueHeader]}>
                <Text style={[styles.obSubtitle, { marginRight: 20 }]}>
                  Miscellaneous Items
                </Text>
                <TouchableOpacity
                  onPress={() => setIsEditingMisc(!isEditingMisc)}
                >
                  <MaterialIcons name='edit' size={28} color={'#9A99A2'} />
                </TouchableOpacity>
              </View>
              <View style={styles.column}>
                <Text style={styles.obText}>
                  Will you join us in Conservation Optimism?
                </Text>
                <Switch
                  trackColor={{ true: '#00FF9D' }}
                  style={styles.obSwitchButton}
                  value={state.conservation_optimism}
                  onValueChange={newValue =>
                    setState({ ...state, conservation_optimism: newValue })
                  }
                />
              </View>
              <View style={styles.column}>
                <Text style={styles.obText}>
                  Does your organization have access to a smartphone?
                </Text>
                <Switch
                  style={styles.obSwitchButton}
                  trackColor={{ true: '#00FF9D' }}
                  value={state.smartphone_access}
                  onValueChange={newValue =>
                    setState({ ...state, smartphone_access: newValue })
                  }
                />
              </View>
            </View>
          )}
          <NavigateButton
            label='Next'
            onButtonPress={() => {
              if (
                state.org_name === undefined ||
                state.website === undefined ||
                state.phone === undefined ||
                state.address === undefined ||
                state.country === undefined ||
                state.point_of_contact === undefined ||
                state.poc_position === undefined
                //|| state.email === undefined
              ) {
                Alert.alert('Oops', 'Please fill in all sections of form', [
                  { text: 'Got it' }
                ]);
              } else {
                updateAirtable();
                //TODO this should go to VerifyDocumentation
                props.navigation.navigate('ToExpectNextCreateProfile', {
                  airtableStateAdd: state,
                  airtableKey: key
                }); // Passes updated state down for backend.
              }
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ReviewYourInfoScreen;

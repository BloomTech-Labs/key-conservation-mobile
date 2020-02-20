import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Switch,
  Alert
} from 'react-native';
import styles from '../../constants/screens/org-onboarding-styles/ReviewYourInfo';
import NavigateButton from './formElement/NavigateButton.js';
import { TextInput } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import SVGCheckMark from '../../assets/jsicons/SVGCheckMark';
import EditPencil from '../../assets/jsicons/OnBoarding/EditPencil';
const ReviewYourInfoScreen = props => {
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingOrganization, setIsEditingOrganization] = useState(false);
  const [isEditingAffiliations, setIsEditingAffiliations] = useState(false);
  const [isEditingMisc, setIsEditingMisc] = useState(false);

  const [airtableId, setAirtableId] = useState('');

  const [state, setState] = useState({
    username: '',
    other_countries: '',
    multiple_projects: '',
    affiliations_partnerships: '',
    conservation_optimism: null,
    smartphone_access: null,
    smartphone_type: '',
    org_name: '',
    org_link_url: '',
    twitter: '',
    facebook: '',
    instagram: '',
    location: '',
    country: '',
    phone_number: '',
    point_of_contact_name: '',
    point_of_contact_position: '',
    email: '',
    about_us: '',
    species_and_habitats: '',
    org_cta: '',
    mini_bio: '',
    about_us: ''
  });

  useEffect(() => {
    setState(props.navigation.getParam('airtableState', 'defaultValue'));
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
            website: state.org_link_url,
            phone: state.phone_number,
            address: state.location,
            country: state.country,
            point_of_contact: state.point_of_contact_name,
            poc_position: state.point_of_contact_position,
            email: state.email
          }
        }
      ],
      function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
        records.forEach(function(record) {
          // console.log(record.getId());
        });
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
              Check that everything looks good and tap submit
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
                  <EditPencil />
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <Text style={styles.obSubtitleSm}>Contact Name: </Text>
                <Text style={styles.obText}>{state.point_of_contact_name}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.obSubtitleSm}>Contact Position: </Text>
                <Text style={styles.obText}>
                  {state.point_of_contact_position}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.obSubtitleSm}>username: </Text>
                <Text style={styles.obText}>{state.username}</Text>
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
                  <SVGCheckMark />
                </TouchableOpacity>
              </View>

              <View style={styles.row}>
                <Text style={styles.obSubtitleSm}>Contact Name: </Text>
                <TextInput
                  style={[styles.obText, styles.textInput]}
                  value={state.point_of_contact_name}
                  placeholder={'Point of Contact Name'}
                  onChangeText={text =>
                    setState({ ...state, point_of_contact_name: text })
                  }
                />
              </View>

              <View style={styles.row}>
                <Text style={styles.obSubtitleSm}>Contact Position: </Text>
                <TextInput
                  style={[styles.obText, styles.textInput]}
                  value={state.point_of_contact_position}
                  placeholder={' Contact Position'}
                  onChangeText={text =>
                    setState({ ...state, point_of_contact_position: text })
                  }
                />
              </View>
              <View style={styles.row}>
                <Text style={styles.obSubtitleSm}>Username: </Text>
                <TextInput
                  style={[styles.obText, styles.textInput]}
                  value={state.username}
                  placeholder={' Username'}
                  onChangeText={text => setState({ ...state, username: text })}
                />
              </View>
            </View>
          )}
          {!isEditingContact ? (
            <View style={styles.borderContainer}>
              <View style={[styles.row, styles.opaqueHeader]}>
                <Text style={[styles.obSubtitle, { marginRight: 20 }]}>
                  Contact Information
                </Text>
                <TouchableOpacity
                  onPress={() => setIsEditingContact(!isEditingContact)}
                >
                  <EditPencil />
                </TouchableOpacity>
              </View>

              <View style={styles.row}>
                <Text style={styles.obSubtitleSm}>Organization Name:</Text>
                <Text style={styles.obText}>{state.org_name}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.obSubtitleSm}>Website:</Text>
                <Text style={styles.obText}>{state.org_link_url}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.obSubtitleSm}>Phone:</Text>
                <Text style={styles.obText}>{state.phone_number}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.obSubtitleSm}>Facebook:</Text>
                <Text style={styles.obText}>{state.facebook}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.obSubtitleSm}>Twitter:</Text>
                <Text style={styles.obText}>{state.twitter}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.obSubtitleSm}>Instagram:</Text>
                <Text style={styles.obText}>{state.instagram}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.obSubtitleSm}>Donation Link:</Text>
                <Text style={styles.obText}>{state.org_cta}</Text>
              </View>

              <View>
                <Text style={styles.obSubtitleSm}>Address:</Text>
                <Text style={styles.obText}>
                  {state.location} {/*state.country*/}
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
                  <SVGCheckMark />
                </TouchableOpacity>
              </View>

              <View style={styles.row}>
                <Text style={styles.obSubtitleSm}>Organization Name:</Text>
                <TextInput
                  style={[styles.obText, styles.textInput]}
                  value={state.org_name}
                  onChangeText={text => setState({ ...state, org_name: text })}
                />
              </View>

              <View style={styles.row}>
                <Text style={styles.obSubtitleSm}>Website:</Text>
                <TextInput
                  style={[styles.obText, styles.textInput]}
                  value={state.org_link_url}
                  onChangeText={text =>
                    setState({ ...state, org_link_url: text })
                  }
                />
              </View>

              <View style={styles.row}>
                <Text style={styles.obSubtitleSm}>Phone:</Text>
                <TextInput
                  style={[styles.obText, styles.textInput]}
                  value={state.phone_number}
                  onChangeText={text =>
                    setState({ ...state, phone_number: text })
                  }
                />
              </View>

              <View style={styles.row}>
                <Text style={styles.obSubtitleSm}>Facebook:</Text>
                <TextInput
                  style={[styles.obText, styles.textInput]}
                  value={state.facebook}
                  onChangeText={text => setState({ ...state, facebook: text })}
                />
              </View>

              <View style={styles.row}>
                <Text style={styles.obSubtitleSm}>Twitter:</Text>
                <TextInput
                  style={[styles.obText, styles.textInput]}
                  value={state.twitter}
                  onChangeText={text => setState({ ...state, twitter: text })}
                />
              </View>

              <View style={styles.row}>
                <Text style={styles.obSubtitleSm}>Instagram:</Text>
                <TextInput
                  style={[styles.obText, styles.textInput]}
                  value={state.instagram}
                  onChangeText={text => setState({ ...state, instagram: text })}
                />
              </View>

              <View style={styles.row}>
                <Text style={styles.obSubtitleSm}>Donation Link:</Text>
                <TextInput
                  style={[styles.obText, styles.textInput]}
                  value={state.org_cta}
                  onChangeText={text => setState({ ...state, org_cta: text })}
                />
              </View>

              <View>
                <Text style={styles.obSubtitleSm}>Address:</Text>
                <TextInput
                  style={[styles.obText, styles.textInput]}
                  multiline
                  value={state.location}
                  onChangeText={text => setState({ ...state, location: text })}
                />
              </View>
            </View>
          )}
          {!isEditingAccount ? (
            <View style={styles.borderContainer}>
              <View style={[styles.row, styles.opaqueHeader]}>
                <Text style={[styles.obSubtitle, { marginRight: 20 }]}>
                  About Us
                </Text>
                <TouchableOpacity
                  onPress={() => setIsEditingAccount(!isEditingAccount)}
                >
                  <EditPencil />
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <Text style={styles.obSubtitleSm}>Short Bio:</Text>
                <Text style={styles.obText}>{state.mini_bio}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.obSubtitleSm}>About Us: </Text>
                <Text style={styles.obText}>{state.about_us}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.borderContainer}>
              <View style={[styles.row, styles.opaqueHeader]}>
                <Text style={[styles.obSubtitle, { marginRight: 20 }]}>
                  About Us
                </Text>
                <TouchableOpacity
                  onPress={() => setIsEditingAccount(!isEditingAccount)}
                >
                  <SVGCheckMark />
                </TouchableOpacity>
              </View>

              <View style={styles.row}>
                <Text style={styles.obSubtitleSm}>Mini Bio:</Text>
                <TextInput
                  style={[styles.obText, styles.textInput]}
                  value={state.mini_bio}
                  placeholder={'Mini Bio'}
                  onChangeText={text => setState({ ...state, mini_bio: text })}
                />
              </View>

              <View style={styles.row}>
                <Text style={styles.obSubtitleSm}>ABout Us:</Text>
                <TextInput
                  style={[styles.obText, styles.textInput]}
                  value={state.about_us}
                  placeholder={'About us'}
                  onChangeText={text => setState({ ...state, about_us: text })}
                />
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
                  <EditPencil />
                </TouchableOpacity>
              </View>
              <Text style={styles.obSubtitleSm}>Countries of Operation:</Text>
              <Text style={styles.obText}>{state.other_countries}</Text>

              <View>
                <Text style={styles.obSubtitleSm}>Projects:</Text>
                <Text style={styles.obText}>{state.multiple_projects}</Text>
              </View>
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
                  <SVGCheckMark />
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

              <View>
                <Text style={styles.obSubtitleSm}>Projects:</Text>
                <TextInput
                  style={[styles.obText, styles.textInput]}
                  value={state.multiple_projects}
                  onChangeText={text => {
                    setState({
                      ...state,
                      multiple_projects: text
                    });
                  }}
                />
              </View>
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
                  <EditPencil />
                </TouchableOpacity>
              </View>
              <Text style={styles.obText}>
                {state.affiliations_partnerships}
              </Text>
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
                  <SVGCheckMark />
                </TouchableOpacity>
              </View>
              <TextInput
                style={[styles.obText, styles.textInput]}
                value={state.affiliations_partnerships}
                onChangeText={text => {
                  setState({
                    ...state,
                    affiliations_partnerships: text
                  });
                }}
              />
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
                  <EditPencil />
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
                  <EditPencil />
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
                state.org_link_url === undefined ||
                state.phone_number === undefined ||
                state.location === undefined ||
                state.country === undefined ||
                state.point_of_contact_name === undefined ||
                state.point_of_contact_position === undefined
                //|| state.email === undefined
              ) {
                Alert.alert('Oops', 'Please fill in all sections of form', [
                  { text: 'Got it' }
                ]);
              } else {
                updateAirtable();
                const stringBE = JSON.stringify({
                  username: state.username,
                  org_name: state.org_name,
                  org_link_url: state.org_link_url,
                  twitter: state.twitter,
                  facebook: state.facebook,
                  instagram: state.instagram,
                  location: state.location,
                  country: state.country,
                  phone_number: state.phone_number,
                  point_of_contact_name: state.point_of_contact_name,
                  email: state.email,
                  about_us: state.about_us,
                  species_and_habitats: state.species_and_habitats,
                  org_cta: state.org_cta,
                  mini_bio: state.mini_bio,
                  about_us: state.about_us
                });
                SecureStore.setItemAsync('stateBE', stringBE); // Finally stores data object in SecureStore to be sent to backend once user is vetted

                SecureStore.setItemAsync('vetting', 'true');
                // Sets variables to be checked in 'LoadingScreen' to determine whether current user is in vetting process.
                props.navigation.navigate('VerifyDocumentation', {
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

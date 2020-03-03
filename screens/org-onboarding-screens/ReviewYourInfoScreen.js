import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Switch,
  Alert,
  Image,
  TextInput
} from 'react-native';
import styles from '../../constants/screens/org-onboarding-styles/ReviewYourInfo';
import NavigateButton from './formElement/NavigateButton.js';
import NavigateBack from './formElement/NavigateBack.js';
import ProgressBar from './formElement/ProgressBar';
import ItemCard from '../../components/Onboarding/ItemCard';
import * as SecureStore from 'expo-secure-store';
import SVGCheckMark from '../../assets/jsicons/SVGCheckMark';
import EditPencil from '../../assets/jsicons/OnBoarding/EditPencil';
import UploadMedia from '../../components/UploadMedia';
import { connect } from 'react-redux';
import ChoosePhoneSwitches from '../../components/Onboarding/ChoosePhoneSwitches';

const ReviewYourInfoScreen = props => {
  const [isEditingBasicInfo, setIsEditingBasicInfo] = useState(false);
  const [isEditingOrgDetails, setIsEditingOrgDetails] = useState(false);
  const [isEditingActivityQuest, setIsEditingActivityQuest] = useState(false);
  const [isEditingDocs, setIsEditingDocs] = useState(false);

  const [airtableId, setAirtableId] = useState('');

  const [state, setState] = useState({
    name: '',
    other_countries: '',
    multiple_projects: '',
    affiliations_partnerships: '',
    conservation_optimism: null,
    smartphone_access: null,
    smartphone_type: '',
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
    about_us: '',
    profile_image: ''
  });

  console.log('Review state ->', state.smartphone_type);

  useEffect(() => {
    // Grabs state for backend through nav params again.
    setState(props.navigation.getParam('airtableState', 'defaultValue'));
    getAirtableID();
  }, []);

  const getAirtableID = async () => {
    const id = await SecureStore.getItemAsync('airtableID', {});
    setAirtableId(id);
  };

  const key = props.navigation.getParam('airtableKey', 'defaultValue');

  // Updates corresponding airtable form if any fields are changed.
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
            org_name: state.name,
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
              props.navigation.navigate('VerifyDocumentation');
            }}
            color='#000'
          />
        </View>
        <View style={styles.progressBar}>
          <ProgressBar
            progress={100}
            height={9}
            backgroundColor='#D7FF44'
            animated={false}
          />
          <Text style={styles.progressBarText}>100% Complete!</Text>
        </View>
      </View>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior='padding'
        enabled
      >
        <ScrollView style={styles.obBody}>
          <Text style={styles.obTitle}>Review your Information</Text>

          <Text style={styles.obSubtitle}>
            Check that everything looks good and tap submit, or click the pencil
            icon to edit.
          </Text>

          {!isEditingBasicInfo ? (
            <View style={styles.sectionContainer}>
              <View style={styles.obSectionHeader}>
                <Text style={styles.obSectionHeaderTitle}>
                  Basic Information
                </Text>
                <TouchableOpacity
                  style={styles.editIcons}
                  onPress={() => setIsEditingBasicInfo(!isEditingBasicInfo)}
                >
                  <EditPencil width='23' height='23' />
                </TouchableOpacity>
              </View>

              <View style={styles.basicInfoRow}>
                <Text style={styles.basicInfoRowTitle}>Name</Text>
                <Text style={styles.obFieldName}>{state.org_name}</Text>
              </View>

              <View style={styles.basicInfoRow}>
                <Text style={styles.basicInfoRowTitle}>Address</Text>
                <Text style={styles.obFieldName}>{state.location}</Text>
              </View>

              <View style={styles.basicInfoRow}>
                <Text style={styles.basicInfoRowTitle}>Country</Text>
                <Text style={styles.obFieldName}>{state.country}</Text>
              </View>

              <View style={styles.basicInfoRow}>
                <Text style={styles.basicInfoRowTitle}>Website</Text>
                <Text style={styles.obFieldName}>{state.org_link_url}</Text>
              </View>

              <View style={styles.basicInfoRow}>
                <Text style={styles.basicInfoRowTitle}>Phone</Text>
                <Text style={styles.obFieldName}>{state.phone_number}</Text>
              </View>

              <View style={styles.basicInfoRow}>
                <Text style={styles.basicInfoRowTitle}>Facebook</Text>
                <Text style={styles.obFieldName}>{state.facebook}</Text>
              </View>

              <View style={styles.basicInfoRow}>
                <Text style={styles.basicInfoRowTitle}>Twitter</Text>
                <Text style={styles.obFieldName}>{state.twitter}</Text>
              </View>

              <View style={styles.basicInfoRow}>
                <Text style={styles.basicInfoRowTitle}>Instagram</Text>
                <Text style={styles.obFieldName}>{state.instagram}</Text>
              </View>

              <View style={styles.basicInfoRow}>
                <Text style={styles.basicInfoRowTitle}>Donation Link</Text>
                <Text style={styles.obFieldName}>{state.org_cta}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.sectionContainer}>
              <View style={styles.obSectionHeader}>
                <Text style={styles.obSectionHeaderTitle}>
                  Basic Information
                </Text>
                <TouchableOpacity
                  style={styles.editIcons}
                  onPress={() => setIsEditingBasicInfo(!isEditingBasicInfo)}
                >
                  <SVGCheckMark />
                </TouchableOpacity>
              </View>

              <View style={styles.basicInfoRow}>
                <Text style={styles.basicInfoRowTitle}>Name</Text>
                <TextInput
                  style={[styles.obFieldName, styles.grayBackground]}
                  value={state.org_name}
                  onChangeText={text => setState({ ...state, org_name: text })}
                />
              </View>
              <View style={styles.basicInfoRow}>
                <Text style={styles.basicInfoRowTitle}>Address</Text>
                <TextInput
                  style={[styles.obFieldName, styles.grayBackground]}
                  value={state.location}
                  onChangeText={text => setState({ ...state, location: text })}
                />
              </View>
              <View style={styles.basicInfoRow}>
                <Text style={styles.basicInfoRowTitle}>Country</Text>
                <TextInput
                  style={[styles.obFieldName, styles.grayBackground]}
                  value={state.country}
                  onChangeText={text => setState({ ...state, country: text })}
                />
              </View>

              <View style={styles.basicInfoRow}>
                <Text style={styles.basicInfoRowTitle}>Website</Text>
                <TextInput
                  style={[styles.obFieldName, styles.grayBackground]}
                  value={state.org_link_url}
                  onChangeText={text =>
                    setState({ ...state, org_link_url: text })
                  }
                />
              </View>
              <View style={styles.basicInfoRow}>
                <Text style={styles.basicInfoRowTitle}>Phone</Text>
                <TextInput
                  style={[styles.obFieldName, styles.grayBackground]}
                  value={state.phone_number}
                  onChangeText={text =>
                    setState({ ...state, phone_number: text })
                  }
                />
              </View>

              <View style={styles.basicInfoRow}>
                <Text style={styles.basicInfoRowTitle}>Facebook</Text>
                <TextInput
                  style={[styles.obFieldName, styles.grayBackground]}
                  value={state.facebook}
                  onChangeText={text => setState({ ...state, facebook: text })}
                />
              </View>

              <View style={styles.basicInfoRow}>
                <Text style={styles.basicInfoRowTitle}>Twitter</Text>
                <TextInput
                  style={[styles.obFieldName, styles.grayBackground]}
                  value={state.twitter}
                  onChangeText={text => setState({ ...state, twitter: text })}
                />
              </View>

              <View style={styles.basicInfoRow}>
                <Text style={styles.basicInfoRowTitle}>Instagram</Text>
                <TextInput
                  style={[styles.obFieldName, styles.grayBackground]}
                  value={state.instagram}
                  onChangeText={text => setState({ ...state, instagram: text })}
                />
              </View>

              <View style={styles.basicInfoRow}>
                <Text style={styles.basicInfoRowTitle}>Donation Link</Text>
                <TextInput
                  style={[styles.obFieldName, styles.grayBackground]}
                  value={state.org_cta}
                  onChangeText={text => setState({ ...state, org_cta: text })}
                />
              </View>
            </View>
          )}

          {!isEditingOrgDetails ? (
            <View style={styles.sectionContainer}>
              <View style={styles.obSectionHeader}>
                <Text style={styles.obSectionHeaderTitle}>
                  Organization Details
                </Text>
                <TouchableOpacity
                  style={styles.editIcons}
                  onPress={() => setIsEditingOrgDetails(!isEditingOrgDetails)}
                >
                  <EditPencil width='23' height='23' />
                </TouchableOpacity>
              </View>

              <View style={styles.row}>
                <Text style={styles.obSubtitleSm}>
                  Countries your organization works in:
                </Text>
              </View>
              <View style={styles.listContainer}>
                <ItemCard item={state.other_countries} />
              </View>
              <View>
                <Text style={styles.obSubtitleSm}>
                  Projects within your organization:
                </Text>
                <View style={styles.listContainer}>
                  <ItemCard item={state.multiple_projects} />
                </View>
              </View>
              <View>
                <Text style={styles.obSubtitleSm}>
                  Current partnerships and affiliations:
                </Text>
                <View style={styles.listContainer}>
                  {!state.affiliations_partnerships ? null : (
                    <ItemCard item={state.affiliations_partnerships} />
                  )}
                </View>
              </View>
              <View>
                <Text style={styles.obSubtitleSm}>
                  Will you join us in Conservation Optimism?
                </Text>
              </View>
              <Switch
                disabled={true}
                trackColor={{ true: '#00FF9D' }}
                style={styles.obSwitchButton}
                value={state.conservation_optimism}
                onValueChange={newValue =>
                  setState({
                    ...state,
                    conservation_optimism: newValue
                  })
                }
              />
              <Text style={styles.obSubtitleSm}>
                Does your organization have access to a smartphone?
              </Text>
              <Switch
                disabled={true}
                trackColor={{ true: '#00FF9D' }}
                style={styles.obSwitchButton}
                value={state.smartphone_access}
                onValueChange={newValue =>
                  setState({
                    ...state,
                    smartphone_access: newValue
                  })
                }
              />
              <View>
                <Text style={styles.obSubtitleSm}>
                  What type of smartphones do you use?
                  <Text style={styles.italic}> Select All that apply.</Text>
                </Text>
                <ChoosePhoneSwitches
                  disabled={true}
                  airtableState={state}
                  onChangeText={setState}
                />
              </View>
            </View>
          ) : (
            <View style={styles.sectionContainer}>
              <View style={styles.obSectionHeader}>
                <Text style={styles.obSectionHeaderTitle}>
                  Organization Details
                </Text>
                <TouchableOpacity
                  style={styles.editIcons}
                  onPress={() => setIsEditingOrgDetails(!isEditingOrgDetails)}
                >
                  <SVGCheckMark />
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <Text style={styles.obSubtitleSm}>
                  Countries your organization works in:
                </Text>
              </View>
              <TextInput
                multiline
                style={[styles.OrgDetailTextInput, styles.grayBackground]}
                value={state.other_countries}
                onChangeText={text =>
                  setState({ ...state, other_countries: text })
                }
              />

              <View>
                <Text style={styles.obSubtitleSm}>
                  Projects within your organization:
                </Text>
                <TextInput
                  multiline
                  style={[styles.OrgDetailTextInput, styles.grayBackground]}
                  value={state.multiple_projects}
                  onChangeText={text =>
                    setState({ ...state, multiple_projects: text })
                  }
                />
              </View>
              <View>
                <Text style={styles.obSubtitleSm}>
                  Current partnerships and affiliations:
                </Text>
                <TextInput
                  multiline
                  style={[styles.OrgDetailTextInput, styles.grayBackground]}
                  value={state.affiliations_partnerships}
                  onChangeText={text =>
                    setState({ ...state, affiliations_partnerships: text })
                  }
                />
              </View>
              <View>
                <Text style={styles.obSubtitleSm}>
                  Will you join us in Conservation Optimism?
                </Text>
              </View>
              <Switch
                trackColor={{ true: '#00FF9D' }}
                style={styles.obSwitchButton}
                value={state.conservation_optimism}
                onValueChange={newValue =>
                  setState({
                    ...state,
                    conservation_optimism: newValue
                  })
                }
              />
              <Text style={styles.obSubtitleSm}>
                Does your organization have access to a smartphone?
              </Text>
              <Switch
                trackColor={{ true: '#00FF9D' }}
                style={styles.obSwitchButton}
                value={state.smartphone_access}
                onValueChange={newValue =>
                  setState({
                    ...state,
                    smartphone_access: newValue
                  })
                }
              />
              <View>
                <Text style={styles.obSubtitleSm}>
                  What type of smartphones do you use?
                  <Text style={styles.italic}> Select All that apply.</Text>
                </Text>
                <ChoosePhoneSwitches
                  airtableState={state.smartphone_type}
                  onChangeText={setState}
                />
              </View>
            </View>
          )}

          {!isEditingActivityQuest ? (
            <View style={styles.sectionContainer}>
              <View style={styles.obSectionHeader}>
                <Text style={styles.obSectionHeaderTitle}>
                  Activity Questionnaire
                </Text>
                <TouchableOpacity
                  style={styles.editIcons}
                  onPress={() =>
                    setIsEditingActivityQuest(!isEditingActivityQuest)
                  }
                >
                  <EditPencil width='23' height='23' />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.obSubtitleSm}>
                  In a brief statement, only 150 characters, tell us about your
                  organization.
                </Text>
                <Text style={styles.obText}>{state.mini_bio}</Text>
              </View>
              <View>
                <Text style={styles.obSubtitleSm}>
                  In more depth, tell us about your organization's mission.
                </Text>
                <Text style={styles.obText}>{state.about_us}</Text>
              </View>
              <View>
                <Text style={styles.obSubtitleSm}>
                  What species and habitats does your organization directly work
                  in or with?
                </Text>
                <View style={styles.listContainer}>
                  <ItemCard item={state.species_and_habitats} />
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.sectionContainer}>
              <View style={styles.obSectionHeader}>
                <Text style={styles.obSectionHeaderTitle}>
                  Activity Questionnaire
                </Text>
                <TouchableOpacity
                  style={styles.editIcons}
                  onPress={() =>
                    setIsEditingActivityQuest(!isEditingActivityQuest)
                  }
                >
                  <SVGCheckMark />
                </TouchableOpacity>
              </View>

              <View>
                <Text style={styles.obSubtitleSm}>
                  In a brief statement, only 150 characters, tell us about your
                  organization.
                </Text>
                <TextInput
                  multiline
                  style={[styles.OrgDetailTextInput, styles.grayBackground]}
                  value={state.mini_bio}
                  onChangeText={text => setState({ ...state, mini_bio: text })}
                />
              </View>

              <View>
                <Text style={styles.obSubtitleSm}>
                  In more depth, tell us about your organization's mission.
                </Text>
                <TextInput
                  multiline
                  style={[styles.OrgDetailTextInput, styles.grayBackground]}
                  value={state.about_us}
                  onChangeText={text => setState({ ...state, about_us: text })}
                />
              </View>
              <View>
                <Text style={styles.obSubtitleSm}>
                  What species and habitats does your organization directly work
                  in or with?
                </Text>
                <TextInput
                  multiline
                  style={[styles.OrgDetailTextInput, styles.grayBackground]}
                  value={state.species_and_habitats}
                  onChangeText={text =>
                    setState({ ...state, species_and_habitats: text })
                  }
                />
              </View>
            </View>
          )}

          <View style={styles.sectionContainer}>
            <View style={styles.obSectionHeader}>
              <Text style={styles.obSectionHeaderTitle}>Organization Logo</Text>
            </View>
            <View style={styles.UploadMediaButton}>
              <UploadMedia circular title='Change logo' />
            </View>
          </View>

          <View style={styles.buttons}>
            <NavigateButton
              label='Submit'
              onButtonPress={async () => {
                if (
                  state.org_name === undefined ||
                  state.org_link_url === undefined ||
                  state.phone_number === undefined ||
                  state.location === undefined ||
                  state.country === undefined
                  //   || state.email === undefined
                ) {
                  Alert.alert('Oops', 'Please fill in all sections of form', [
                    { text: 'Got it' }
                  ]);
                } else {
                  updateAirtable();
                  const sub = await SecureStore.getItemAsync('sub', {});
                  if (props.mediaUpload) {
                    setState({ ...state, profile_image: props.mediaUpload });
                  }
                  const stringBE = JSON.stringify({
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
                    about_us: state.about_us,
                    roles: 'conservationist',
                    sub: sub,
                    profile_image: state.profile_image
                  });

                  // Stores data object in SecureStore to be sent to backend once user is vetted
                  SecureStore.setItemAsync('stateBE', stringBE);

                  // Sets variables to be checked in 'LoadingScreen' to determine whether current user is in vetting process.
                  SecureStore.setItemAsync('vetting', 'true');

                  // Passes updated state down for backend.
                  props.navigation.navigate('Welcome', {
                    airtableStateAdd: state,
                    airtableKey: key
                  });
                }
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const mapStateToProps = state => ({
  mediaUpload: state.mediaUpload
});

export default connect(mapStateToProps, {})(ReviewYourInfoScreen);

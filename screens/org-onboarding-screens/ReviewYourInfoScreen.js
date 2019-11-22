import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';
import styles from '../../constants/screens/org-onboarding-styles/ReviewYourInfo';
import NavigateButton from './formElement/NavigateButton.js';
import { MaterialIcons } from '@expo/vector-icons';

const airtableStateAdd = {
  other_countries: 'Algeria, Belgium, USA',
  multiple_projects: [
    { name: 'Project 1', description: 'project description goes here' },
    { name: 'Project 2', description: 'project description goes here' },
    { name: 'Project 3', description: 'project description goes here' }
  ],
  affiliations_partnerships: [
    { name: 'Oregon State University' },
    { name: 'World Wildlife Fund' },
    { name: 'GreenPeace' }
  ],
  conservation_optimism: 'true',
  smartphone_access: 'true',
  smartphone_type: '',
  org_name: 'Key Conservation',
  website: 'keyconservation.org',
  address: '1234 5th Street Eugene, OR 98765',
  country: 'USA',
  phone: '001 458 123 4567',
  point_of_contact: 'Alice Kellan',
  poc_poition: 'Director of Operations',
  email: 'akellan@conservation.org'
};

const ReviewYourInfoScreen = props => {
  const airtableStateAdd = props.navigation.getParam(
    'airtableStateAdd',
    'defaultValue'
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
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
          <View style={styles.borderContainer}>
            <View style={[styles.row, styles.opaqueHeader]}>
              <Text style={[styles.obSubtitle, { marginRight: 20 }]}>
                Account Administrator
              </Text>
              <TouchableOpacity>
                <MaterialIcons name="edit" size={28} color={'#9A99A2'} />
              </TouchableOpacity>
            </View>
            <Text style={styles.obText}>
              {airtableStateAdd.point_of_contact}
            </Text>
            <Text style={styles.obText}>{airtableStateAdd.poc_poition}</Text>
            <Text style={styles.obText}>{airtableStateAdd.email}</Text>
          </View>
          <View style={styles.borderContainer}>
            <View style={[styles.row, styles.opaqueHeader]}>
              <Text style={[styles.obSubtitle, { marginRight: 20 }]}>
                Contact & Credentials
              </Text>
              <TouchableOpacity>
                <MaterialIcons name="edit" size={28} color={'#9A99A2'} />
              </TouchableOpacity>
            </View>
            <Text style={styles.obText}>{airtableStateAdd.org_name}</Text>
            <Text style={styles.obText}>{airtableStateAdd.website}</Text>
            <View style={styles.row}>
              <Text style={styles.obSubtitleSm}>Tel:</Text>
              <Text style={styles.obText}>{airtableStateAdd.phone}</Text>
            </View>
            <View>
              <Text style={styles.obSubtitleSm}>Address:</Text>
              <Text style={styles.obText}>
                {airtableStateAdd.address} {airtableStateAdd.country}
              </Text>
            </View>
            <View>
              <Text style={styles.obSubtitleSm}>Credentials uploaded:</Text>
              <Text style={styles.obText}>
                ConservOrg_501c3.pdf ConservOrg_NGO.pdf
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.borderContainer}>
          <View style={[styles.row, styles.opaqueHeader]}>
            <Text style={[styles.obSubtitle, { marginRight: 20 }]}>
              Organization Activity
            </Text>
            <TouchableOpacity>
              <MaterialIcons name="edit" size={28} color={'#9A99A2'} />
            </TouchableOpacity>
          </View>
          <Text style={styles.obSubtitleSm}>Countries of Operation:</Text>
          <Text style={styles.obText}>{airtableStateAdd.other_countries}</Text>

          {/* {airtableStateAdd.multiple_projects.map(project => {
            return (
              <View key={project.name}>
                <Text style={styles.obSubtitleSm}>{project.name}</Text>
                <Text style={styles.obText}>{project.description}</Text>
              </View>
            );
          })} */}
        </View>
        <View style={styles.borderContainer}>
          <View style={[styles.row, styles.opaqueHeader]}>
            <Text style={[styles.obSubtitle, { marginRight: 20 }]}>
              Partnerships & Affiliations
            </Text>
            <TouchableOpacity>
              <MaterialIcons name="edit" size={28} color={'#9A99A2'} />
            </TouchableOpacity>
          </View>
          {/* {airtableStateAdd.affiliations_partnerships.map(affilicated => {
            return (
              <Text key={affilicated.name} style={styles.obText}>
                {affilicated.name}
              </Text>
            ); 
          })} */}
        </View>
        <View style={styles.borderContainer}>
          <View style={[styles.row, styles.opaqueHeader]}>
            <Text style={[styles.obSubtitle, { marginRight: 20 }]}>
              Miscellaneous Items
            </Text>
            <TouchableOpacity>
              <MaterialIcons name="edit" size={28} color={'#9A99A2'} />
            </TouchableOpacity>
          </View>

          {airtableStateAdd.conservation_optimism === 'true' && (
            <Text style={styles.obText}>
              We will join Key Conservation in practicing Conservation Optimism.
            </Text>
          )}
          {airtableStateAdd.smartphone_access === 'true' && (
            <Text style={styles.obText}>
              Our Organization does use smartphones.
            </Text>
          )}
        </View>
        <NavigateButton
          label="Next"
          onButtonPress={() => {
            props.navigation.navigate('ToExpectNextCreateProfile', {
              airtableStateAdd: airtableStateAdd
            });
            console.log(airtableStateAdd);
          }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ReviewYourInfoScreen;

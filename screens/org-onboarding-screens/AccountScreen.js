import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Image
} from 'react-native';

import styles from '../../constants/screens/org-onboarding-styles/AccountScreen';
import NavigateButton from './formElement/NavigateButton.js';
import NavigateBack from './formElement/NavigateBack.js';
import ProgressBar from './formElement/ProgressBar';

const AccountScreen = props => {
  const [values, handleChange] = useState({
    mini_bio: '',
    about_us: '',
    species_and_habitats: '',
    facebook: '',
    instagram: '',
    twitter: '',
    org_cta: ''
  });

  const airtableState = props.navigation.getParam(
    'airtableStateAdd',
    'defaultValue'
  );
  const key = props.navigation.getParam('airtableKey', 'defaultValue');

  console.log('AccountScreen', airtableState);

  const handleSubmit = async () => {
    const airtableStateAdd = Object.assign({ ...airtableState, ...values }); // Updates state for backend with new fields.
    props.navigation.navigate('VerifyDocumentation', {
      airtableState: airtableStateAdd,
      airtableKey: key
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.arrowView}>
          <NavigateBack
            onButtonPress={() => {
              props.navigation.navigate('TellMore');
            }}
            color='#000'
          />
        </View>
        <View style={styles.progressBar}>
          <ProgressBar
            progress={65}
            height={9}
            backgroundColor='#D7FF44'
            animated={false}
          />
          <Text style={styles.progressBarText}>65% Complete</Text>
        </View>
      </View>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior='padding'
        enabled
      >
        <ScrollView>
          <View style={styles.obBody}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../../assets/images/onboarding/yellow.png')}
              />
              <Text style={styles.obTitle}>
                Tell us about the work{'\n'}your organization does
              </Text>
            </View>
            <Text style={styles.obText}>
              We'll take a deeper dive into your activities. You can separate
              lists of items with a comma.
            </Text>
            <Text style={styles.obSubtitle}>Activity Questionnaire</Text>
            <View style={styles.inputBlock}>
              <Text style={styles.obText}>
                In a brief statement, only 150 characters, tell us about your
                organization.
              </Text>
              <TextInput
                style={styles.textArea}
                multiline
                onChangeText={text =>
                  handleChange({ ...values, mini_bio: text })
                }
                maxLength={150}
                value={values.mini_bio}
                placeholder='Brief Statement'
                type='mini_bio'
                name='mini_bio'
                required
              />
            </View>
            <View style={styles.inputBlock}>
              <Text style={styles.obText}>
                Im more depth, tell us about your organization's mission.
              </Text>
              <TextInput
                style={styles.textArea}
                multiline
                onChangeText={text =>
                  handleChange({ ...values, about_us: text })
                }
                value={values.about_us}
                placeholder='Your Mission'
                type='about_us'
                name='about_us'
                required
              />
            </View>
            <View style={styles.inputBlock}>
              <Text style={styles.obText}>
                Which species and habitats does your organization directly work
                in or with?{' '}
                <Text style={styles.italic}>Add a comma after each item.</Text>
              </Text>
              <TextInput
                style={styles.textArea}
                multiline
                onChangeText={text =>
                  handleChange({ ...values, species_and_habitats: text })
                }
                value={values.species_and_habitats}
                placeholder='Add Species and Habitats'
                type='species_and_habitats'
                name='species_and_habitats'
                required
              />
            </View>
            <Text style={styles.obText}>
              Connect to your social media sites (Optional):
            </Text>
            <View style={styles.inputBlockSm}>
              <Text style={styles.obText}>Facebook</Text>
              <TextInput
                style={styles.textAreaSm}
                onChangeText={text =>
                  handleChange({ ...values, facebook: text })
                }
                placeholder='Enter URL'
                type='url'
                name='facebook'
                value={values.facebook}
              />
            </View>
            <View style={styles.inputBlockSm}>
              <Text style={styles.obText}>Instagram</Text>
              <TextInput
                style={styles.textAreaSm}
                onChangeText={text =>
                  handleChange({ ...values, instagram: text })
                }
                placeholder='Enter URL'
                value={values.instagram}
                type='url'
                name='instagram'
              />
            </View>
            <View style={styles.inputBlockSm}>
              <Text style={styles.obText}>Twitter</Text>
              <TextInput
                style={styles.textAreaSm}
                onChangeText={text =>
                  handleChange({ ...values, twitter: text })
                }
                placeholder='Enter URL'
                value={values.twitter}
                type='url'
                name='twitter'
              />
            </View>
            <View style={styles.inputBlockSm}>
              <Text style={styles.obText}>
                Add a link where your supporters can donate:
              </Text>
              <TextInput
                style={styles.textAreaSm}
                onChangeText={text =>
                  handleChange({ ...values, org_cta: text })
                }
                placeholder='Enter URL'
                type='url'
                name='org_cta'
                value={values.org_cta}
              />
            </View>
            <View style={styles.buttons}>
              <NavigateButton
                label='Next'
                onButtonPress={() => {
                  handleSubmit();
                }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AccountScreen;

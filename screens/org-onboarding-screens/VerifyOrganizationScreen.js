import React, { useState, useEffect } from 'react';
import {
	Button,
	Switch,
	Text,
	TextInput,
	View,
	TouchableOpacity,
	KeyboardAvoidingView,
	ScrollView,
	Alert,
	TouchableHighlight,
} from 'react-native';
import styles from '../../constants/screens/org-onboarding-styles/VerifyOrg.js';
import ConservationOptimismModal from '../../components/ConservationOptimismModal';
import * as SecureStore from 'expo-secure-store';
import SvgUri from 'react-native-svg-uri';
import QuestionCircle from '../../assets/jsicons/OnBoarding/QuestionCircle';

const VerifyOrganizationScreen = (props) => {
	const [ airtableState, onChangeText ] = useState({
		other_countries           : '',
		multiple_projects         : '',
		affiliations_partnerships : '',
		conservation_optimism     : null,
		smartphone_access         : null,
		smartphone_type           : '',
	});

	const [ isModalVisible, setIsModalVisible ] = useState(false);

	const airtableKey = props.navigation.getParam('airtableKey', 'defaultValue');
	const airtableID = props.navigation.getParam('airtableID', 'defaultValue');
	const airtableState2 = props.navigation.getParam('airtableState', 'defaultValue'); // this grabs the airtable form ID and data from previous component.

	setAirtableID = async () => {
		await SecureStore.setItemAsync('airtableID', airtableID);
		console.log(await SecureStore.getItemAsync('airtableID', {}));
	}; // This saves the current airtable form's ID in SecureStore.

	useEffect(() => {
		setAirtableID();
	});

	const airtableStateAdd = Object.assign({
		...airtableState2,
		...airtableState,
	}); // This merges the previous and current fields together for backend.

	const updateAirtable = () => {
		// this updates the airtable form created in the previous component

		var Airtable = require('airtable');
		var base = new Airtable({ apiKey: airtableKey }).base('appbPeeXUSNCQWwnQ');
		base('Table 1').update(
			[
				{
					id     : airtableID,
					fields : {
						other_countries           : airtableState.other_countries,
						affiliations_partnerships : airtableState.affiliations_partnerships,
						conservation_optimism     : airtableState.conservation_optimism,
						multiple_projects         : airtableState.multiple_projects,
						smartphone_access         : airtableState.smartphone_access,
						smartphone_type           : airtableState.smartphone_type,
					},
				},
			],
			function(err, records) {
				if (err) {
					console.error(err);
					return;
				}
				records.forEach(function(record) {
					// console.log(record.getId());
				});
			},
		);
	};

	return (
		<KeyboardAvoidingView style={styles.obBody} behavior='height' keyboardVerticalOffset={86} enabled>
			<ScrollView>
				<View style={styles.obBody}>
					<Text style={styles.obTitle}>Tell us more about your organization</Text>
					<Text style={styles.obText}>
						We'll take a deeper dive into your activities. You can separate lists of items with a comma.
					</Text>
					<Text style={styles.obFieldName}>In what countries does your organization work?</Text>
					<TextInput
						style={styles.obTextInput}
						onChangeText={(text) => onChangeText({ ...airtableState, other_countries: text })}
						value={airtableState.other_countries}
						placeholder='United States, Brazil, France, etc.'
					/>
					<Text style={styles.obFieldName}>Projects your organization is working on:</Text>
					<TextInput
						style={styles.obTextInput}
						onChangeText={(text) => onChangeText({ ...airtableState, multiple_projects: text })}
						value={airtableState.multiple_projects}
						placeholder='Project 1, Project 2, etc.'
					/>
					<Text style={styles.obFieldName}>Current partnerships and affiliations:</Text>
					<TextInput
						style={styles.obTextInput}
						onChangeText={(text) =>
							onChangeText({
								...airtableState,
								affiliations_partnerships : text,
							})}
						value={airtableState.affiliations_partnerships}
						placeholder='Partnership 1, Partnership 2, etc.'
					/>

					<Text style={styles.obFieldName}>
						Will you join us in Conservation Optimism?
						<TouchableHighlight onPress={() => setIsModalVisible(true)}>
							<QuestionCircle style={{ marginLeft: 10, marginTop: 3 }} />
						</TouchableHighlight>
					</Text>

					<ConservationOptimismModal setIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible} />
					<Switch
						trackColor={{ true: '#00FF9D' }}
						style={styles.obSwitchButton}
						value={airtableState.conservation_optimism}
						onValueChange={(newValue) =>
							onChangeText({
								...airtableState,
								conservation_optimism : newValue,
							})}
					/>
					<Text style={styles.obFieldName}>Does your organization have access to a smartphone?</Text>
					<Switch
						style={styles.obSwitchButton}
						trackColor={{ true: '#00FF9D' }}
						value={airtableState.smartphone_access}
						onValueChange={(newValue) => onChangeText({ ...airtableState, smartphone_access: newValue })}
					/>
					<Text style={styles.obFieldName}>If so what kind of smartphone? (Apple or Android)</Text>
					<TextInput
						style={styles.obTextInputBottom}
						onChangeText={(text) => onChangeText({ ...airtableState, smartphone_type: text })}
						value={airtableState.smartphone_type}
					/>
					<TouchableOpacity
						style={styles.obFwdContainer}
						onPress={() => {
							if (
								airtableState.other_countries === '' ||
								airtableState.multiple_projects === '' ||
								//airtableState.affiliations_partnerships === "" ||
								airtableState.smartphone_type === ''
							) {
								Alert.alert('Oops', 'Please fill in all sections of form', [ { text: 'Got it.' } ]);
							} else if (airtableState.conservation_optimism === false || airtableState.smartphone_access === false) {
								Alert.alert('Oops', 'Agree to conservation optimism and smart phone use', [ { text: 'Got it.' } ]);
							} else {
								updateAirtable();
								props.navigation.navigate('VerifyDocumentation', {
									airtableStateAdd : airtableStateAdd,
									airtableKey      : airtableKey,
								}); // This passes the combined fields sent to airtable needed for backend to the next component.
							}
						}}>
						<Text style={styles.obFwdBtnText}>Next</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};
export default VerifyOrganizationScreen;

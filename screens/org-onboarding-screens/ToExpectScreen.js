import React from 'react';
import { View, ScrollView, Text, Button, TouchableOpacity } from 'react-native';
import styles from '../../constants/screens/org-onboarding-styles/ToExpect.js';
import CheckCircleWhite from '../../assets/jsicons/OnBoarding/CheckCircleWhite';

const ToExpectScreen = (props) => {
	return (
		<View style={styles.obBody}>
			<ScrollView>
				<Text style={styles.obTitle}>Here's what you can expect:</Text>

				<View style={styles.contentWrapper}>
					<View style={styles.iconWrapper}>
						<CheckCircleWhite />
					</View>
					<View style={{ width: '90%' }}>
						<Text style={styles.obSubtitle}>Overview</Text>
						<Text style={styles.obText}>
							You already know how Key Conservation can help connect you with individual contributors. That's why you're
							here! We'll keep it brief.
						</Text>
					</View>
				</View>
				<View style={styles.contentWrapper}>
					<View style={styles.iconWrapper}>
						<CheckCircleWhite />
					</View>
					<View style={{ width: '90%' }}>
						<Text style={styles.obSubtitle}>Register</Text>
						<Text style={styles.obText}>
							Let's set up your account! You'll need to fill out a form, upload your credentials, and set up a profile
							on the following screens.
						</Text>
					</View>
				</View>
				<View style={styles.contentWrapper}>
					<View style={styles.iconWrapper}>
						<CheckCircleWhite />
					</View>
					<View style={{ width: '90%' }}>
						<Text style={styles.obSubtitle}>Create Your Profile</Text>
						<Text style={styles.obTextBottom}>
							Complete your base profile while we verify your organization. Once approved, you'll receive a survey by
							email, followed by a welcome kit. Now you can go visible! Start adding connections and campaigns.
						</Text>
					</View>
				</View>
				<TouchableOpacity
					style={styles.obFwdContainer}
					onPress={() => {
						props.navigation.navigate('KeyConservation');
					}}>
					<Text style={styles.obFwdBtnText}>Got It!</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
};

export default ToExpectScreen;

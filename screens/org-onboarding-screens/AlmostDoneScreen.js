import React, { Component } from 'react';
import { Button, View, Text, TouchableOpacity, Linking, Alert } from 'react-native';
import styles from '../../constants/screens/org-onboarding-styles/AlmostDone.js';
import * as WebBrowser from 'expo-web-browser';

export default AlmostDoneScreen = (props) => {
		return (
			<View style={styles.obBody}>
				<Text style={styles.obTitle}>Review your info</Text>
				<View>
					<Text style={styles.obTextBottom}>
						Check that everything looks good and tap submit, or go back and edit.
					</Text>
				</View>
				<TouchableOpacity
					style={styles.obFwdContainer}
					onPress={() => {
						props.navigation.navigate('ThankYou');
					}}
				>
					<Text style={styles.obFwdBtnText}>Submit</Text>
				</TouchableOpacity>
			</View>
		);
	}

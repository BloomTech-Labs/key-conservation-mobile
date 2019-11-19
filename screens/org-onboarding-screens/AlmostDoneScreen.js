import React, { Component } from 'react';
import { Button, View, Text, TouchableOpacity, Linking, Alert } from 'react-native';
import styles from '../../constants/screens/org-onboarding-styles/AlmostDone.js';

import * as WebBrowser from 'expo-web-browser';

export default class AlmostDoneScreen extends Component {
	state = {
		result: null
	};

	_handlePressButtonAsync = async () => {
		try {
			let result = await WebBrowser.openAuthSessionAsync('https://airtable.com/shr5OS4sz84gmXgdh');
			let redirectData;
			if (result.url) {
				redirectData = 'https://airtable.com/shr5OS4sz84gmXgdh';
			}
			this.setState({ result, redirectData });
		} catch (error) {
			alert(error);
		}
	};

	checkBoxTest() {
		this.setState({
			check: !this.state.check
		});
		alert('hello');
	}
	render() {
		return (
			<View style={styles.obBody}>
				<Text style={styles.obTitle}>You're Almost done!</Text>
				<View>
					<Text style={styles.obTextBottom}>
						We want to know a little bit more about your organization so we can best improve your
						experience. To finish verifying please fill out this quick survey (12 mins or less).
					</Text>
				</View>
				<TouchableOpacity style={styles.obFwdContainer} onPress={this._handlePressButtonAsync}>
					<Text style={styles.obFwdBtnText}>Survey</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

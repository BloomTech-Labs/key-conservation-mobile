import React from 'react';

import { View, ScrollView, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableOpacityBase } from 'react-native';
import styles from '../../constants/screens/org-onboarding-styles/MakeAccount.js';

const MakeAccountScreen = (props) => {
	return (
		<KeyboardAvoidingView style={styles.obBody} behavior="height" keyboardVerticalOffset={86} enabled>
			<ScrollView>
				<View>
					<Text>Let's get started</Text>
				</View>
				<TouchableOpacity style={styles.obFwdContainer}
                onPress={() => {
                    props.navigation.navigate("TellAboutOrganization")
                }}
            >
                <Text style={styles.obFwdBtnText}>Next</Text>
            </TouchableOpacity>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default MakeAccountScreen;

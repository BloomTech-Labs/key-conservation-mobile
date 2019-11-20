import React from 'react';

import { View, ScrollView, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableOpacityBase } from 'react-native';
import styles from '../../constants/screens/org-onboarding-styles/MakeAccount.js';

const MakeAccountScreen = (props) => {
	return (
		<View style={styles.obBody}>
			<Text style={styles.obTitle}>Let's get acquainted</Text>
				<TouchableOpacity 
					style={styles.obFwdContainer}
                	onPress={() => {
                    props.navigation.navigate("TellAboutOrganization")
               		 }}
            	>
                	<Text style={styles.obFwdBtnText}>Next</Text>
            	</TouchableOpacity>

				

		</View>
	);
};

export default MakeAccountScreen;

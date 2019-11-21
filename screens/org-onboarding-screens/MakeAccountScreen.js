import React, { useEffect, useState } from 'react';

import { View, ScrollView, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableOpacityBase } from 'react-native';
import styles from '../../constants/screens/org-onboarding-styles/MakeAccount.js';

const MakeAccountScreen = (props) => {

	const [screen, setScreen] = useState(false)
	
    useEffect(() => {
		console.log('hello')
	}, [])
	
    useEffect(() => {
        const timer = setTimeout(() => {setScreen(true)}, 3000)
        if (screen === true) {
            props.navigation.navigate("TellAboutOrganization");
            return() => clearTimeout(timer);
        }
        setScreen(false)
	})

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

import React, { useEffect, useState } from 'react';

import { View, ScrollView, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableOpacityBase } from 'react-native';
import styles from '../../constants/screens/org-onboarding-styles/MakeAccount.js';

import SvgUri from 'react-native-svg-uri';

const MakeAccountScreen = (props) => {

	// const [screen, setScreen] = useState(false)
	
    // useEffect(() => {
	// 	console.log('hello')
	// }, [])
	
    // useEffect(() => {
    //     const timer = setTimeout(() => {setScreen(true)}, 3000)
    //     if (screen === true) {
    //         props.navigation.navigate("TellAboutOrganization");
    //         return() => clearTimeout(timer);
    //     }
    //     setScreen(false)
	// })

	return (
		<View style={styles.obBody}>
			<SvgUri 
				style={styles.svg}
				source={require('../../assets/icons/Timed.svg')}
			/>
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

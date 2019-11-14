import React from 'react';

import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableOpacityBase } from 'react-native';
import styles from '../../constants/screens/org-onboarding-styles/OnboardingStyles.js';

const MakeAccountScreen = (props) => {
	return (
		<KeyboardAvoidingView behavior="height" keyboardVerticalOffset={86} enabled>
			<View style={styles.obBody}>
				<View>
					<View>
						<Text  style={styles.obTitle}>First let's make your account</Text>
					</View>
					<View>
						<Text style={styles.obText}>
							We want to make sure we can autosave your progress. So first things first let's get you some
							login credentials.
						</Text>
					</View>
				</View>
				<View>
					<View>
						<Text style={styles.obSubtitle}>Create Account</Text>
					</View>

					<View>
						<Text style={styles.obFieldName}>Full Name</Text>
						<TextInput style={styles.obTextInput}returnKeyType="next" />
					</View>

                    <View>
						<Text style={styles.obFieldName}>Email</Text>
						<TextInput style={styles.obTextInput}returnKeyType="next" />
					</View>

                    <View>
						<Text style={styles.obFieldName}>Password</Text>
                        <TextInput style={styles.obTextInput}
                        returnKeyType="next" 
                        secureTextEntry={true}
                        />
					</View>

                    <View>
						<Text style={styles.obFieldName}>Re-type password</Text>
                        <TextInput style={styles.obTextInput}
                        returnKeyType="next" 
                        secureTextEntry={true}
                        />
					</View>

                    <View>
                        <TouchableOpacity style={styles.obFwdContainer}
							onPress={() => {
								props.navigation.navigate("TellAboutOrganization")
							}}
						>
                            <Text style={styles.obFwdBtnText}>Let's do this!</Text>
                        </TouchableOpacity>
                    </View>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
};

export default MakeAccountScreen;

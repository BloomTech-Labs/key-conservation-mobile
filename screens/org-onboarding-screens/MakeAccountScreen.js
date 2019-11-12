import React from 'react';

import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableOpacityBase } from 'react-native';

const MakeAccountScreen = (props) => {
	return (
		<KeyboardAvoidingView behavior="height" keyboardVerticalOffset={86} enabled>
			<View>
				<View>
					<View>
						<Text>First let's make your account</Text>
					</View>
					<View>
						<Text>
							We want to make sure we can autosave your progress. So first things first let's get you some
							login credentials.
						</Text>
					</View>
				</View>
				<View>
					<View>
						<Text>Create Account</Text>
					</View>

					<View>
						<Text>Full Name</Text>
						<TextInput returnKeyType="next" />
					</View>

                    <View>
						<Text>Email</Text>
						<TextInput returnKeyType="next" />
					</View>

                    <View>
						<Text>Password</Text>
                        <TextInput 
                        returnKeyType="next" 
                        secureTextEntry={true}
                        />
					</View>

                    <View>
						<Text>Re-type password</Text>
                        <TextInput 
                        returnKeyType="next" 
                        secureTextEntry={true}
                        />
					</View>

                    <View>
                        <TouchableOpacity>
                            <Text>Let's do this!</Text>
                        </TouchableOpacity>
                    </View>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
};

export default MakeAccountScreen;

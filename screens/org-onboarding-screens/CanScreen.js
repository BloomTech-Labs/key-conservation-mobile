import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const CanScreen = (props) => {
	return (
		<View>
			<View>
				<Text>What we can do to help your organization...</Text>
			</View>
			<View>
				<View>
					<Text>
						Commodo enim cupidatat consequat cupidatat ea Lorem cupidatat consequat aliquip aliqua ullamco
						id. Consequat sit elit ea labore fugiat culpa eiusmod proident duis. Elit mollit veniam
						cupidatat minim est incididunt ullamco et laboris minim velit in.
					</Text>
				</View>
				<View>
					<Text>
						Commodo enim cupidatat consequat cupidatat ea Lorem cupidatat consequat aliquip aliqua ullamco
						id. Consequat sit elit ea labore fugiat culpa eiusmod proident duis. Elit mollit veniam
						cupidatat minim est incididunt ullamco et laboris minim velit in.
					</Text>
				</View>
				<View>
					<Text>
						Commodo enim cupidatat consequat cupidatat ea Lorem cupidatat consequat aliquip aliqua ullamco
						id. Consequat sit elit ea labore fugiat culpa eiusmod proident duis. Elit mollit veniam
						cupidatat minim est incididunt ullamco et laboris minim velit in.
					</Text>
				</View>
			</View>
			<View>
				<TouchableOpacity onPress={() => {
					props.navigation.navigate("Cant")
				}}>
					<Text>Next</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default CanScreen

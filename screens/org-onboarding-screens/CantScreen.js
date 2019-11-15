import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
import styles from '../../constants/screens/org-onboarding-styles/CantScreen.js';

const CantScreen = (props) => {
	return (
		<View style={styles.obBody}>
			<ScrollView>
			<View>
				<Text style={styles.obTitle}>What we cannot do...</Text>
			</View>
			<View>
				<View>
					<Text style={styles.obText}>
						Commodo enim cupidatat consequat cupidatat ea Lorem cupidatat consequat aliquip aliqua ullamco
						id. Consequat sit elit ea labore fugiat culpa eiusmod proident duis. Elit mollit veniam
						cupidatat minim est incididunt ullamco et laboris minim velit in.
					</Text>
				</View>
				<View>
					<Text style={styles.obText}>
						Commodo enim cupidatat consequat cupidatat ea Lorem cupidatat consequat aliquip aliqua ullamco
						id. Consequat sit elit ea labore fugiat culpa eiusmod proident duis. Elit mollit veniam
						cupidatat minim est incididunt ullamco et laboris minim velit in.
					</Text>
				</View>
				<View>
					<Text style={styles.obTextBottom}>
						Commodo enim  cupidatat consequat cupidatat ea Lorem cupidatat consequat aliquip aliqua ullamco
						id. Consequat sit elit ea labore fugiat culpa eiusmod proident duis. Elit mollit veniam
						cupidatat minim est incididunt ullamco et laboris minim velit in.
					</Text>
				</View>
			</View>
			<View>
				<TouchableOpacity style={styles.obFwdContainer}
					onPress={() => {
						props.navigation.navigate("MakeAccount")
					}}
				>
					<Text style={styles.obFwdBtnText}>Next</Text>
				</TouchableOpacity>
			</View>
			</ScrollView>
		</View>
	);
};

export default CantScreen


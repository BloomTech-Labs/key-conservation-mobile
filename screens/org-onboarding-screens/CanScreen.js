import React from 'react';
import { View, ScrollView, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../../constants/screens/org-onboarding-styles/CanScreen.js';

import { AntDesign } from '@expo/vector-icons';

const CanScreen = (props) => {
	return (
		<View style={styles.obBody}>
			<ScrollView>
			<View>
				<Text style={styles.obTitle}>What we can do to help your organization...</Text>
			</View>
			<View>
				<View style={styles.contentWrapper}>
					<View style={styles.iconWrapper}>
					<AntDesign 
						name="checkcircle" 
						size={24}
						color="#00ff9d"
					/>
					</View>
					<Text style={styles.obText}>
						Commodo enim cupidatat consequat cupidatat ea Lorem cupidatat consequat aliquip aliqua ullamco
						id. Consequat sit elit ea labore fugiat culpa eiusmod proident duis. Elit mollit veniam
						cupidatat minim est incididunt ullamco et laboris minim velit in.
					</Text>
				</View>
				<View style={styles.contentWrapper}>
					<View style={styles.iconWrapper}>
					<AntDesign 
					name="checkcircle"
					size={24}
					color="#00ff9d"					
					/>
					</View>
					<Text style={styles.obText}>
						Commodo enim cupidatat consequat cupidatat ea Lorem cupidatat consequat aliquip aliqua ullamco
						id. Consequat sit elit ea labore fugiat culpa eiusmod proident duis. Elit mollit veniam
						cupidatat minim est incididunt ullamco et laboris minim velit in.
					</Text>
				</View>
				<View style={styles.contentWrapper}>
					<View style={styles.iconWrapper}>
					<AntDesign 
						name="checkcircle"
						size={24}
						color="#00ff9d" 
					/>
					</View>
					<Text style={styles.obTextBottom}>
						Commodo enim cupidatat consequat cupidatat ea Lorem cupidatat consequat aliquip aliqua ullamco
						id. Consequat sit elit ea labore fugiat culpa eiusmod proident duis. Elit mollit veniam
						cupidatat minim est incididunt ullamco et laboris minim velit in.
					</Text>
				</View>
			</View>
			<View>
				<TouchableOpacity style={styles.obFwdContainer} onPress={() => {
					props.navigation.navigate("Cant")
				}}>
					<Text style={styles.obFwdBtnText}>Next</Text>
				</TouchableOpacity>
			</View>
			</ScrollView>
		</View>
	);
};

export default CanScreen

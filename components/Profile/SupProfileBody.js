import React from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-navigation';
import styles from '../../constants/Profile/SupProfileBody';
import Clipboard from '../../assets/jsicons/detailAboutUs/Clipboard';
import Seedling from '../../assets/jsicons/detailAboutUs/Seedling';

const SupProfileBody = (props) => {
	let profile = props.profile;

	return (
		<ScrollView>
			<View style={styles.container}>
				<View style={styles.sections}>
					<View style={styles.iconWrap}>
						<Clipboard />
						<Text style={styles.titleText}>{'About Me'}</Text>
					</View>
					<View style={styles.body}>
						<Text style={styles.bodyText}>{profile.mini_bio}</Text>
					</View>
				</View>

				<View style={styles.sections}>
					<View style={styles.iconWrap}>
						<Seedling />
						<Text style={styles.titleText}>{'Species & Habitats'}</Text>
					</View>
					<View style={styles.body}>
						<Text style={styles.bodyText}>{profile.species_and_habitats}</Text>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

export default SupProfileBody;

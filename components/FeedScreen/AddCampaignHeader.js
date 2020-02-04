import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../constants/FeedScreen/AddCampaignHeader';
import { Avatar } from 'react-native-elements';
import Lightening from '../../assets/js icons/bottom navigation/Lightening';

const AddCampaignHeader = (props) => {
	let profile = props.currentUserProfile;
	return (
		<View style={styles.container}>
			<View style={styles.avatarContainer}>
				<Avatar
					size={48}
					rounded
					source={{
						uri : props.name,
					}}
				/>
			</View>
			<Text style={styles.text}>Add New Campaign</Text>
			<View style={styles.lightening}>
				<Lightening />
			</View>
		</View>
	);
};

export default AddCampaignHeader;

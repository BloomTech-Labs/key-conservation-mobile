import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../constants/FeedScreen/AddCampaignHeader';
import { Avatar } from 'react-native-elements';
import PlusLightening from '../../assets/js icons/headerIcons/plusLightening';
import { createStackNavigator } from 'react-navigation-stack';
import CreateCampScreen from '../../screens/CreateCampScreen';
import { withNavigation } from 'react-navigation';

const AddCampaignHeader = ({ navigation }) => {
	// const CreateCampStack = createStackNavigator(
	// 	{ CreateCampaign: CreateCampScreen },
	// 	{
	// 		navigationOptions : {
	// 			headerLeft : null,
	// 		},
	// 	},
	// );

	// const CreateCampNavigator = createStackNavigator({
	// 	createStackNavigator : { screen: CreateCampScreen, path: '' },
	// });
	return (
		<View style={styles.container}>
			<View style={styles.avatarContainer}>
				<Avatar
					size={48}
					rounded
					// 	source={{
					// 		uri : name,
					// 	}}
				/>
			</View>
			<Text style={styles.text}>Add New Campaign</Text>
			<View style={styles.plusLightening}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						navigation.navigate('CreateCampaign');
					}}>
					<View>
						<PlusLightening />
					</View>
				</TouchableOpacity>
				{/* <TouchableOpacity
					onPress={(navigation) => {
						alert('You tapped the button!');
						navigation.navigate('Loading');
					}}
				/> */}
			</View>
		</View>
	);
};

export default withNavigation(AddCampaignHeader);

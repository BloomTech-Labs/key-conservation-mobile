import React from 'react';
import { View, Text } from 'react-native';
import PlusSignCircle from '../../assets/jsicons/PlusSignCircle';
import style from '../../constants/Profile/CampBlankSpace';
const CampBlankSpace = () => {
	return (
		<View style={style.container}>
			<View>
				<View style={style.plusIcon}>
					<PlusSignCircle />
				</View>
				<Text style={style.text}>This organization has not created a campaign yet.</Text>
			</View>
		</View>
	);
};
export default CampBlankSpace;

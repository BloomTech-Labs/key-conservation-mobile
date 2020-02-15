import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import SettingsGear from '../assets/jsicons/SettingsGear';

const SettingsButton = (props) => {
	const { navigation } = props;
	return (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate(props.settingsRoute);
			}}
			style={{ padding: 18, paddingTop: 20 }}>
			<View
				style={{
					alignItems     : 'center',
					justifyContent : 'center',
					borderRadius   : 5,
					height         : 35,
				}}>
				<SettingsGear fill='#fff' />
			</View>
		</TouchableOpacity>
	);
};

export default SettingsButton;

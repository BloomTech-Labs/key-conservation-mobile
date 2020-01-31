import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { ScrollView } from 'react-navigation';
import * as WebBrowser from 'expo-web-browser';
import { Avatar } from 'react-native-elements';
import SvgUri from 'react-native-svg-uri';

import styles from '../../constants/Profile/SupProfileHeader';
import test from '../../constants/DetailScreen/DetailHeader';
//icons
import Envelope from '../../assets/js icons/social media /Envelope';
import Instagram from '../../assets/js icons/social media /Instagram';
import Twitter from '../../assets/js icons/social media /Twitter';
import Facebook from '../../assets/js icons/social media /Facebook';

const SupProfileHeader = (props) => {
	let profile = props.profile;
	return (
		<ScrollView style={styles.pic}>
			<View style={styles.container}>
				<View style={styles.leftContainer}>
					<Avatar
						size={61}
						rounded
						source={{
							uri : profile.profile_image,
						}}
					/>
				</View>
				<View style={styles.rightContainer}>
					<View style={styles.textContainer}>
						<View style={test.nameContainer}>
							<Text style={styles.titleText}>{profile.sup_name}</Text>
							<TouchableOpacity style={{ padding: 0, padding: 0 }}>
								<SvgUri
									fill='#DCDCDC'
									width='15'
									height='15'
									source={require('../../assets/icons/trash-alt-solid.svg')}
								/>
							</TouchableOpacity>
						</View>
						<Text style={styles.userText}>{profile.location}</Text>
						<Text style={styles.userText}>@{profile.username}</Text>
					</View>
					<View style={styles.socialContainer}>
						<TouchableOpacity
							onPress={async () => {
								profile.email && profile.email !== null && (await Linking.openURL(`mailto:${profile.email}`));
							}}>
							<Envelope />
						</TouchableOpacity>
						<TouchableOpacity
							style={{ padding: 0, padding: 0 }}
							onPress={async () =>
								profile.instagram &&
								profile.instagram !== null &&
								(await WebBrowser.openBrowserAsync(profile.instagram))}>
							<Instagram />
						</TouchableOpacity>
						<TouchableOpacity
							onPress={async () =>
								profile.twitter && profile.twitter !== null && (await WebBrowser.openBrowserAsync(profile.twitter))}>
							<Twitter />
						</TouchableOpacity>
						<TouchableOpacity
							onPress={async () =>
								profile.facebook && profile.facebook !== null && (await WebBrowser.openBrowserAsync(profile.facebook))}>
							<Facebook />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

export default SupProfileHeader;

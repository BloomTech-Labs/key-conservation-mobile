import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../../constants/Reports/ReportCard';
import ChevronLeftBlack from '../../assets/jsicons/miscIcons/ChevronLeftBlack';
import FlagIcon from '../../assets/jsicons/reports/FlagIcon';

const ReportCard = (props) => {
	let type;
	switch (props.table_name) {
		case 'campaignUpdates':
			type = 'Campaign Reported';
			break;
		case 'campaigns':
			type = 'Campaign Reported';
			break;
		case 'comments':
			type = 'Comment Reported';
			break;
		case 'users':
			type = 'User Reported';
			break;

		default:
			type = props.table_name;
	}

	return (
		<View style={styles.reportCard}>
			<View style={styles.left}>
				<View style={styles.imageContainer}>
					<Image source={{ uri: props.image }} style={styles.image} />
				</View>
				<View style={styles.reportInfo}>
					<Text style={styles.reportName}>{props.name}</Text>
					<Text style={styles.reportType}>{type.toUpperCase()}</Text>
				</View>
			</View>
			<View style={styles.right}>
				<View style={styles.reportCount}>
					<FlagIcon style={styles.flagIcon} />
					<Text style={styles.unique_reports}>{props.unique_reports}</Text>
				</View>
				<View style={styles.arrowContainer}>
					<ChevronLeftBlack style={styles.arrowIcon} />
				</View>
			</View>
		</View>
	);
};

export default ReportCard;

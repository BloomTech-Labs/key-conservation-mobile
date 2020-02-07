import React from 'react';
import { View, Text, Image, } from 'react-native';

import styles from '../../constants/Reports/ReportCard';

import flag from '../../assets/icons/flag-alt-solid.svg';

import SvgUri from 'react-native-svg-uri';

const ReportCard = props => {
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
          <Image source={{ uri: props.image }} style={styles.image}></Image>
        </View>
        <View style={styles.reportInfo}>
          <Text style={styles.reportName}>{props.name}</Text>
          <Text style={styles.reportType}>{type.toUpperCase()}</Text>
        </View>
      </View>
      <View style={styles.right}>
        <View style={styles.reportCount}>
          <SvgUri
            style={styles.flagIcon}
            source={flag}
            fill="#000000"
            width='15'
            height='100%'
          />
          <Text style={styles.unique_reports}>{props.unique_reports}</Text>
        </View>
        <View style={styles.arrowContainer}>
          <SvgUri
            style={styles.arrowIcon}
            source={require('../../assets/icons/chevron-left-solid.svg')}
            fill='#000000'
            width='25'
            height='100%'
          />
        </View>
      </View>
    </View>
  );
};

export default ReportCard;

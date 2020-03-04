import React from 'react';
import { View, Text } from 'react-native';

import styles from '../../../constants/Profile/tabs/Details';

import FileIcon from '../../../assets/jsicons/detailAboutUs/File';
import ConnectFurther from '../ConnectFurther';

const Details = props => {
  const { profile } = props;

  return (
    <View style={styles.container}>
      {profile.roles !== 'supporter' && (
        <View>
          <View style={styles.sections}>
            <View style={styles.iconWrap}>
              <FileIcon />
              <Text style={styles.title}>{'About Us'}</Text>
            </View>
            <Text style={styles.body}>{profile.about_us}</Text>
          </View>

          {/* Species and Habitats is a feature not yet in place */}
          {/* <View style={styles.sections}>
            <View style={styles.iconWrap}>
              <Seedling />
              <Text style={styles.title}>{'Species & Habitats'}</Text>
            </View>
            <View style={styles.body}>
              <Text style={styles.bodyText}>
                {profile.species_and_habitats}
              </Text>
            </View>
          </View> */}
        </View>
      )}
      {profile.roles === 'supporter' && (
        <View style={styles.sections}>
          <ConnectFurther profile={profile} />
        </View>
      )}
    </View>
  );
};

export default Details;

import React, { forwardRef } from 'react';
import { View, Text, Animated, Image } from 'react-native';
import animalData from '../../components/Animals/animalData';
import styles from '../../constants/SkilledImpact/SupporterSkilledImpactHeader';

const SupporterSkilledImpactHeader = forwardRef((props, ref) => {
  const headerImage = animalData[3].image;

  return (
    <View style={styles.container}>
      <Image source={headerImage} style={styles.headerImageContainer} />
      <View style={styles.headerTitleContainer}>
        <View style={styles.avatarContainer}>
          <View style={styles.CircleShapeView}>
            <Text style={styles.headerTitle}>USE YOUR SKILLS FOR GOOD</Text>
          </View>
        </View>
      </View>
    </View>
  );
});

export default SupporterSkilledImpactHeader;

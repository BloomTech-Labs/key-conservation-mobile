import React from 'react';
import { View, Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { TouchableOpacity } from 'react-native-gesture-handler';

import styles from '../../../constants/Profile/tabs/Details';
import ConnectFurther from '../ConnectFurther';
import ComingSoon from '../ComingSoon';

import Clipboard from '../../../assets/jsicons/detailAboutUs/Clipboard';
import Seedling from '../../../assets/jsicons/detailAboutUs/Seedling';
import Lightbulb from '../../../assets/jsicons/detailAboutUs/Lightbulb';
import Hand from '../../../assets/jsicons/detailAboutUs/Hand';

const Details = props => {
  const { profile } = props;
  const { myProfile } = props;

  return (
    <View style={styles.container}>
      {profile.roles === 'supporter' && (
        <View>
          <View style={styles.sections}>
            <ConnectFurther profile={profile} myProfile={myProfile} />
          </View>
          <View style={styles.sections}>
            <ComingSoon />
          </View>
        </View>
      )}

      {profile.roles !== 'supporter' && (
        <View>
          <ConnectFurther profile={profile} />
          <View style={styles.sections}>
            <View style={styles.sections}>
              <View style={styles.iconWrap}>
                <Clipboard />
                <Text style={styles.title}>{'About Us'}</Text>
              </View>
              <Text style={styles.body}>{profile.about_us}</Text>
            </View>

            <View style={styles.sections}>
              <View style={styles.iconWrap}>
                <Seedling />
                <Text style={styles.title}>{'Species & Habitats'}</Text>
              </View>
              <View style={styles.body}>
                <Text style={styles.bodyText}>
                  {profile.species_and_habitats}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.sections}>
            <View style={styles.iconWrap}>
              <Lightbulb />
              <Text style={styles.title}>{'Big Issues'}</Text>
            </View>
            <View>
              <Text style={styles.body}>{profile.issues}</Text>
            </View>
          </View>
          <View style={styles.campMission}>
            <View style={styles.iconWrap}>
              <Hand />
              <Text style={styles.donateTitle}>{'Support Our Mission'}</Text>
            </View>
            <View>
              <Text style={styles.donateText}>
                Your donation helps us more{'\n'}than you know. Thanks!
              </Text>
              <View style={styles.donateButton}>
                <TouchableOpacity
                  onPress={async () =>
                    profile.org_cta &&
                    profile.org_cta !== null &&
                    (await WebBrowser.openBrowserAsync(profile.org_cta))
                  }
                  style={{
                    width: 243,
                    height: 48
                  }}
                >
                  <View
                    style={{
                      backgroundColor: '#00ff9d',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 5,
                      height: '100%'
                    }}
                  >
                    <Text
                      style={{
                        color: '#323339',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        letterSpacing: 2
                      }}
                    >
                      Donate
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Details;

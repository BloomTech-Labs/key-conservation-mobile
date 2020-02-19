import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-navigation';
import * as WebBrowser from 'expo-web-browser';
import styles from '../../constants/DetailScreen/DetailAboutUs';
import Clipboard from '../../assets/jsicons/detailAboutUs/Clipboard';
import Seedling from '../../assets/jsicons/detailAboutUs/Seedling';
import Lightbulb from '../../assets/jsicons/detailAboutUs/Lightbulb';
import Hand from '../../assets/jsicons/detailAboutUs/Hand';

const DetailAboutUs = props => {
  let profile = props.profile;

  return (
    <ScrollView>
      <View style={styles.container}>
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
          <View>
            <Text style={styles.body}>{profile.species_and_habitats}</Text>
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
                  paddingTop: 25,
                  paddingBottom: 25,
                  width: 243,
                  height: 50
                }}
              >
                <View
                  style={{
                    backgroundColor: '#00ff9d',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                    height: 35
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
    </ScrollView>
  );
};

export default DetailAboutUs;

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-navigation';
import * as WebBrowser from 'expo-web-browser';
import { Icon, Image } from 'react-native-elements';
import SvgUri from 'react-native-svg-uri';

const DetailAboutUs = props => {
  let profile = props.profile;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.sections}>
          <View style={styles.iconWrap}>
            <SvgUri
              width='25'
              height='25'
              source={require('../../assets/icons/clipboard.svg')}
            />
            <Text style={styles.title}>{'About Us'}</Text>
          </View>
          <Text style={styles.body}>{profile.about_us}</Text>
        </View>

        <View style={styles.sections}>
          <View style={styles.iconWrap}>
            <SvgUri
              width='25'
              height='25'
              source={require('../../assets/icons/seedling.svg')}
            />
            <Text style={styles.title}>{'Species & Habitats'}</Text>
          </View>
          <View style={styles.body}>
            <Text>{profile.species_and_habitats}</Text>
          </View>
        </View>

        <View style={styles.sections}>
          <View style={styles.iconWrap}>
            <SvgUri
              width='25'
              height='25'
              source={require('../../assets/icons/lightbulb.svg')}
            />
            <Text style={styles.title}>{'Big Issues'}</Text>
          </View>
          <View style={styles.body}>
            <Text>{profile.issues}</Text>
          </View>
        </View>
        <View style={styles.sections}>
          <View style={styles.iconWrap}>
            <SvgUri
              width='25'
              height='25'
              source={require('../../assets/icons/hand.svg')}
            />
            <Text style={styles.title}>{'Support Our Mission'}</Text>
          </View>
          <View style={styles.body}>
            <Text>{profile.support_us}</Text>
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

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    margin: 15,
    textAlign: 'justify',
    lineHeight: 30
  },
  title: {
    fontSize: 20
  },
  body: {
    marginTop: 10,
    flexDirection: 'column',
    flexWrap: 'nowrap'
  },
  iconWrap: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginBottom: 2,
    paddingBottom: 20
  },
  sections: {
    marginTop: 20,
    backgroundColor: '#fff',
    width: '100%',
    padding: 25
  },
  title: {
    fontSize: 18,
    alignSelf: 'center',
    marginLeft: 10,
    fontFamily: 'OpenSans-Regular'
  },
  donateButton: {
    alignItems: 'center',
    width: '100%'
  },
  forcedMargin: {
    marginTop: 10
  }
});

export default DetailAboutUs;

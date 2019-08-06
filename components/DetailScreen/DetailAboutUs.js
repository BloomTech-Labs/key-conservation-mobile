import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import { Icon, ListItem } from 'react-native-elements';

const DetailAboutUs = props => {
  let profile = props.profile;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.sections}>
          <View style={styles.iconWrap}>
            <Icon type='font-awesome' name='info-circle' />
            <Text style={styles.title}>{'  About Us'}</Text>
          </View>
          <Text style={styles.body}>{profile.about_us}</Text>
        </View>

        <View style={styles.sections}>
          <View style={styles.iconWrap}>
            <Icon type='font-awesome' name='leaf' />
            <Text style={styles.title}>
              {'  Species & Habitats we work with'}
            </Text>
          </View>
          <View style={styles.body}>
            <Text>{profile.species_and_habitats}</Text>
          </View>
        </View>

        <View style={styles.sections}>
          <View style={styles.iconWrap}>
            <Icon type='font-awesome' name='leaf' />
            <Text style={styles.title}>{'  Big Issues'}</Text>
          </View>
          <View style={styles.body}>
            <Text>{profile.issues}</Text>
          </View>
        </View>
        <View style={styles.sections}>
          <View style={styles.iconWrap}>
            <Icon type='font-awesome' name='rocket' />
            <Text style={styles.title}>{'  Support Our Mission'}</Text>
          </View>
          <View style={styles.body}>
            <Text>{profile.support_us}</Text>
            <View style={styles.donateButton}>
              <TouchableOpacity
                style={{
                  paddingTop: 25,
                  paddingBottom: 25,
                  width: '100%',
                  height: 50
                }}
              >
                <View
                  style={{
                    backgroundColor: 'black',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                    height: 35
                  }}
                >
                  <Text
                    style={{
                      color: '#fff',
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
    flexDirection: 'row',
    alignItems: 'baseline',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginBottom: 2,
    paddingBottom: 10
  },
  sections: {
    marginTop: 20,
    backgroundColor: '#fff',
    width: '100%',
    padding: 25
  },
  title: { fontSize: 18 },
  donateButton: {
    alignItems: 'center',
    width: '100%'
  },
  forcedMargin: {
    marginTop: 10
  }
});

export default DetailAboutUs;

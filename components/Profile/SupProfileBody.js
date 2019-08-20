import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-navigation';
import * as WebBrowser from 'expo-web-browser';
import { Icon, Image } from 'react-native-elements';
import SvgUri from 'react-native-svg-uri';

const SupProfileBody = props => {
  let profile = props.profile;

  return(
    <ScrollView>
      <View style={styles.container}>
      <View style={styles.sections}>
          <View style={styles.iconWrap}>
            <SvgUri
              width='25'
              height='25'
              source={require('../../assets/icons/clipboard.svg')}
            />
            <Text style={styles.titleText}>{'About Me'}</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.bodyText}>{profile.mini_bio}</Text>
          </View>
        </View>

        <View style={styles.sections}>
          <View style={styles.iconWrap}>
            <SvgUri
              width='25'
              height='25'
              source={require('../../assets/icons/seedling.svg')}
            />
            <Text style={styles.titleText}>{'Species & Habitats'}</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.bodyText}>{profile.species_and_habitats}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 2,
    borderTopColor: '#eee',
    alignItems: 'flex-start',
    marginLeft: 15,
    marginRight: 15,
    width: '90%',
    textAlign: 'justify',
  
  },
  titleText: {
    fontSize: 17,
    fontFamily: 'OpenSans-SemiBold',
    lineHeight: 23,
    marginLeft: 5

  },
  body: {
    marginTop: 10,
    flexDirection: 'column',
    flexWrap: 'nowrap',   
    
  },
  bodyText: { 
    fontSize: 15, 
    lineHeight: 20,
    marginLeft: 5
  },
  iconWrap: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
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

export default SupProfileBody;
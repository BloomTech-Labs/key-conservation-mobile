import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

import { ListItem } from 'react-native-elements';

const Campaign = props => {
  const title = props.data.username;
  return (
    <View style={styles.container}>
      <ListItem
        title={props.data.username}
        leftAvatar={{ source: { uri: props.data.camp_img } }}
        subtitle={props.data.location}
      />

      {/* Must have a Width && Height or is won't display anything! */}
      <Image
        source={{ uri: props.data.camp_img }}
        style={{ width: '100%', height: 400 }}
      />
      <View style={styles.campDesc}>
        <Text style={styles.campDescUsername}>{props.data.username}</Text>
        <Text>{props.data.camp_desc}</Text>
      </View>
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
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginBottom: 40
  },
  donateButton: {
    width: '60%',
    alignSelf: 'center'
  },
  listItem: {
    color: 'black',
    backgroundColor: 'black'
  },
  campDesc: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginLeft: 15,
    paddingTop: 15
  },
  campDescUsername: {
    fontWeight: 'bold',
    paddingRight: 10
  }
});

export default Campaign;

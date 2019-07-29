import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { ListItem } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';

import { getProfileData } from '../../store/actions';

import styles from '../../constants/Stylesheet';

const Campaign = props => {
  const dispatch = useDispatch();
  const { title, users_id } = props.data;

  const handlePress = () => {
    dispatch(getProfileData(users_id));
    props.navigation.navigate('Pro', { orgId: users_id });
  };

  return (
    <View style={styles.container}>
      <ListItem
        onPress={() => handlePress(users_id)}
        title={props.data.username}
        leftAvatar={{ source: { uri: props.data.camp_img } }}
        subtitle={props.data.location}
      />
      <Image
        source={{ uri: props.data.camp_img }}
        style={styles.campImgContain}
      />
      <View style={styles.campDesc}>
        <Text style={styles.campDescUsername}>{props.data.username}</Text>
        <Text>{props.data.camp_desc}</Text>
      </View>
      <View style={styles.donateButton}>
        <TouchableOpacity style={styles.touchableButton}>
          <View style={styles.touchableView}>
            <Text style={styles.touchableText}>Donate</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Campaign;

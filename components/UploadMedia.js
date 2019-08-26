import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { setMedia } from '../store/actions';

class UploadMedia extends Component {
  state = {
    media: ''
  };

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1]
    });
    // console.log(result, 'Pick Image ----------------------------------');
    if (!result.cancelled) {
      this.setState(
        {
          media: result.uri
        },
        () => this.props.setMedia(this.state)
      );
    }
  };

  componentDidMount() {
    this.getPermissionAsync();
  }

  render() {
    const { media } = this.state;
    return (
      <>
        <TouchableOpacity
          style={styles.sectionButton}
          onPress={this._pickImage}
        >
          <Text style={styles.sectionsText}>Choose an image</Text>
        </TouchableOpacity>
        {media ? (
          <Image source={{ uri: media }} style={styles.sectionImage} />
        ) : null}
      </>
    );
  }
}

const styles = StyleSheet.create({
  sectionButton: {
    alignSelf: 'center',
    marginBottom: 10
  },
  sectionsText: {
    fontFamily: 'OpenSans-SemiBold',
    color: '#18A0FB',
    fontSize: 20,
    marginBottom: 10
  },
  sectionImage: {
    alignSelf: 'center',
    width: 300,
    height: 300,
    marginBottom: 10
  }
});

export default connect(
  null,
  { setMedia }
)(UploadMedia);

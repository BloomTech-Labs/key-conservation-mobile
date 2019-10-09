import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, View, Text, Image, Platform } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { setMedia } from '../store/actions';

import styles from '../constants/UploadMedia';

class UploadMedia extends Component {
  state = {
    media: ''
  };

  getPermissionAsync = async () => {
    if (Constants.platform.ios || Constants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    // let result = await DocumentPicker.getDocumentAsync({});
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
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

  clearState = () => {
    this.setState({
      media: ''
    });
  };

  render() {
    console.log(this.state);
    const { media } = this.state;
    return (
      <>
        <NavigationEvents onDidBlur={this.clearState} />
        <View style={styles.imageButton}>
          <TouchableOpacity onPress={this._pickImage}>
            <View style={styles.touchableView}>
              <Text style={styles.touchableText}>
                Choose your image or video
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContain}>
          {media ? (
            Platform.OS === 'android' ? (
              <Image
                source={{
                  uri: media
                }}
                style={{
                  height: 300,
                  width: 300,
                  borderRadius: this.props.circular ? 150 : 0
                }}
              />
            ) : media.includes('.mp4') ||
              media.includes('.mp3') ||
              media.includes('.mov') ? (
              <Video
                source={{ uri: media }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode='cover'
                useNativeControls={true}
                style={{ width: 300, height: 300 }}
              />
            ) : (
              <Image
                source={{
                  uri: media
                }}
                style={{
                  height: 300,
                  width: 300,
                  borderRadius: this.props.circular ? 150 : 0
                }}
              />
            )
          ) : null}
          {/* Couldn't coerce android to display a full video preview, only an image of the video. iOS, on the other hand, cannot display an image of the video. */}
        </View>
      </>
    );
  }
}

export default connect(
  null,
  { setMedia }
)(UploadMedia);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  Platform,
  TouchableWithoutFeedback
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { setMedia } from '../store/actions';

import styles from '../constants/UploadMedia';

// Props:
// mediaType = 'All', 'Images', 'Videos'
// style
// fontSize (default is 10)
// circular
// size (default is 100)
// media

class UploadMedia extends Component {
  constructor(props) {
    super(props);

    this.state = {
      media: this.props.media || ''
    }
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios || Constants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert(`Sorry, we can't get an image upload without permission`);
        return false;
      }
      return true;
    }
  };

  _pickImage = async () => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      const permitted = await this.getPermissionAsync();
      if (!permitted) return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions[this.props.mediaType || 'All'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });
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

    const { media } = this.state;

    const textStyle = {
      ...styles.touchableText,
      fontSize: this.props.fontSize || 10
    }

    return (
      <TouchableWithoutFeedback onPress={this._pickImage}>
        <View
          style={{
            ...styles.container,
            borderRadius: this.props.circular ? 100 : 8,
            ...this.props.style,
            width: this.props.size || 100,
            height: this.props.size || 100
          }}
        >
          <NavigationEvents onDidBlur={this.clearState} />
          <View style={styles.imageButton}>
            {
              media ? (
                <View style={styles.editOverlay}>
                  <Text style={textStyle}>Edit</Text>
                </View>
              ) : (
                <Text style={textStyle}>{this.props.title}</Text>
              )
            }
          </View>
          <View style={styles.imageContain}>
            {media ? (
              Platform.OS === 'android' ? (
                <Image
                  source={{
                    uri: media
                  }}
                  style={{
                    height: '100%',
                    width: '100%'
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
                  style={{ height: '100%', width: '100%' }}
                />
              ) : (
                <Image
                  source={{
                    uri: media
                  }}
                  style={{
                    height: '100%',
                    width: '100%'
                  }}
                />
              )
            ) : null}
            {/* Couldn't coerce android to display a full video preview, only an image of the video. iOS, on the other hand, cannot display an image of the video. */}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default connect(null, { setMedia })(UploadMedia);

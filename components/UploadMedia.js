import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import ActionSheet from 'react-native-actionsheet';

import styles from '../constants/UploadMedia';

// Props:
// mediaType = 'All', 'Images', 'Videos'
// style
// fontSize (default is 10)
// circular
// size (default is 100)
// media
// removable

// Required prop:
// onChangeMedia

const PLACEHOLDERS = [
  // Default profile placeholder image
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
];

class UploadMedia extends Component {
  constructor(props) {
    super(props);

    this.state = {
      media: this.props.media || '',
    };

    this.actionSheet = React.createRef();
    this.ACTIONSHEET_OPTIONS = {
      title: 'Edit Image',
      options: ['Change', 'Remove Image', 'Cancel'],
      cancelIndex: 2,
      destructiveIndex: 1,
      onPress: (index) => {
        switch (index) {
          case 0: {
            this._pickImage();
          }
          case 1: {
            this.clearState();
          }
        }
      },
    };
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
    await this.getPermissionAsync();
    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      const permitted = await this.getPermissionAsync();
      if (!permitted) return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions[this.props.mediaType || 'All'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      this.setState(
        {
          media: result.uri,
        },
        () => this.props.onChangeMedia?.(this.state.media)
      );
    }
  };

  onEdit = () => {
    if (
      this.props.removable &&
      this.state.media &&
      !PLACEHOLDERS.includes(this.state.media)
    ) {
      this.actionSheet.current?.show();
    } else {
      this._pickImage();
    }
  };

  componentDidMount() {
    // Warn developer if onChangeMedia is not present
    if (typeof this.props.onChangeMedia !== 'function') {
      console.warn(
        'UploadMedia: onChangeMedia is a required prop, but a function with that name was not passed'
      );
    }
  }

  clearState = () => {
    this.setState(
      {
        media: '',
      },
      () => this.props.onChangeMedia?.(this.state.media)
    );
  };

  render() {
    const { media } = this.state;

    const textStyle = {
      ...styles.touchableText,
      fontSize: this.props.fontSize || 10,
    };

    return (
      <TouchableWithoutFeedback onPress={this.onEdit}>
        <View
          style={{
            ...styles.container,
            borderRadius: this.props.circular ? 100 : 8,
            ...this.props.style,
            width: this.props.size || 100,
            height: this.props.size || 100,
          }}
        >
          {/* If this image is marked 'removable', this action sheet will
          pop up to present options to user when component is pressed */}
          <ActionSheet
            ref={this.actionSheet}
            title={this.ACTIONSHEET_OPTIONS.title}
            options={this.ACTIONSHEET_OPTIONS.options}
            cancelButtonIndex={this.ACTIONSHEET_OPTIONS.cancelIndex}
            destructiveButtonIndex={this.ACTIONSHEET_OPTIONS.destructiveIndex}
            onPress={this.ACTIONSHEET_OPTIONS.onPress}
          />
          <NavigationEvents onDidBlur={this.clearState} />
          <View style={styles.imageButton}>
            {media ? (
              <View style={styles.editOverlay}>
                <Text style={textStyle}>Edit</Text>
              </View>
            ) : (
              <Text style={textStyle}>{this.props.title}</Text>
            )}
          </View>
          <View style={styles.imageContain}>
            {media ? (
              Platform.OS === 'android' ? (
                <Image
                  source={{
                    uri: media,
                  }}
                  style={{
                    height: '100%',
                    width: '100%',
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
                  resizeMode="cover"
                  useNativeControls={true}
                  style={{ height: '100%', width: '100%' }}
                />
              ) : (
                <Image
                  source={{
                    uri: media,
                  }}
                  style={{
                    height: '100%',
                    width: '100%',
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

export default UploadMedia;

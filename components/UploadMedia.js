import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { setMedia } from '../store/actions';

class UploadMedia extends Component {
  state = {
    media: ''
  }

  getPermissionAsync = async() => {
      if (Constants.platform.ios) {
          const {status }= await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if(status !==  'granted'){
              alert('Sorry, we need camera roll permissions to make this work!');
          }
      }
  }

  _pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
      })
      // console.log(result, 'Pick Image ----------------------------------');
      if(!result.cancelled){
          this.setState({
            media: result.uri
          }, () => this.props.setMedia(this.state))
      }
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  clearState = () => {
    this.setState({
      media: ''
    })
  }

  render() {
    const { media } = this.state
    // console.log(image)
    return (
      <>
        <NavigationEvents
          onDidBlur={this.clearState}
        />
        <Text style={styles.sectionsText}>Pick An Image</Text>
        <View style={styles.imageButton}>
          <TouchableOpacity
            onPress={this._pickImage}
          >
            <View style={styles.touchableView}>
              <Text style={styles.touchableText}>Click here to choose an image</Text>
            </View>
          </TouchableOpacity>
          </View>
          <View style={styles.imageContain}>
            {media ?
            // to make profile image circular, border radius must be set at half of height/width
            <Image source={{ uri: media }} style={{height: 300, width: 300, borderRadius: this.props.circular ? 150 : 0}}/> : null}
          </View>
      </>
    );
  }

};

const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    margin: 15
  },
  sectionsText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 20,
    marginBottom: 5
  },
  touchableView: {
    backgroundColor: '#00FF9D',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 48,
    width: 243,
    marginBottom: 10
  },
  touchableText: {
    fontFamily: 'OpenSans-SemiBold',
    color: '#323338',
    fontSize: 16
  },
  imageButton: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  imageContain: {
    marginBottom: 10,
    alignSelf: 'center',
  },  
});

export default connect(
  null,
  { setMedia }
)(UploadMedia);
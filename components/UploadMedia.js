import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, View, Text, Button, StyleSheet, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'

import { setMedia } from '../store/actions'

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
          aspect: [4, 3],
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


  render() {
    const { media } = this.state
    // console.log(image)
    return (
      <>
        <Text style={styles.sectionsText}>Pick An Image</Text>
          <Button
          title= 'Click here to choose an Image'
          onPress={this._pickImage}
          />
          {media ?
          <Image source={{ uri: media }} style={{width: 200, height: 200}}/> : null}
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
  }
});

export default connect(
  null,
  { setMedia }
)(UploadMedia);
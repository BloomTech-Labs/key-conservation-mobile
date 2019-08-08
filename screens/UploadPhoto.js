import React from 'react'
import { Button, Image, View, Text } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import {Constants, Permissions} from 'expo';

export default class UploadPhoto extends React.Component {
    state= {
        image: null,
    }
    render() {
        let {image} = this.state;
        return (
            <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Button 
            title= 'sam, pick an image'
            onPress={this._pickImage}
            />
            {image &&
            <Image source={{url:image}} style={{width: 200, height: 200}}/>}
            </View>
        );
    }

    componentDidMount(){
        this.getPermissionAsync();
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
        let result= await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
        })
        console.log(result);
        if(!result.cancelled){
            this.setState({image:result.url})
        }
    }
}

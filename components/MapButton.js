import React, {Component} from 'react';
import {Button} from 'react-native';
import {withNavigation} from 'react-navigation';

class MapButton extends Component {
    render(){
        return(
            <Button 
            title="More Info"

            />
        )
    }
}

export default withNavigation(MapButton);
import React from "react";
import { View, Screen, Text } from "react-native";
import WideMap from './WideMap.js';
import {MapView, permissions} from 'expo';

const WideMapScreen = (props) => {
    return(
        <View>
            <WideMap navigation={props.navigation}/>
        </View>
    );
}

export default WideMapScreen;
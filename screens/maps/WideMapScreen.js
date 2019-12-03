import React from "react";
import { View, Screen, Text } from "react-native";
import WideMap from './WideMap.js';
import {MapView, permissions} from 'expo';

const WideMapScreen = () => {
    return(
        <View>
            <WideMap />
        </View>
    );
}

export default WideMapScreen;
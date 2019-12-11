import React from "react";
import {View, Screen, Text, StyleSheet} from "react-native";
// import WideMap from './WideMap.js';
import {MapView, permissions} from 'expo';
import WideMap from './WideMap'
import MapSearchBarComponent from '../../components/Search/MapSearchComponent'

const WideMapScreen = () => {
    return(
        <View style={styles.container}>
            <MapSearchBarComponent style={styles.mapSearchBar}/>
            <WideMap style={styles.mapSearchBar}/>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:"column",
        paddingTop: '10%',
        paddingBottom: '5%',
        justifyContent: 'flex-start',
        alignItems:'center'
    },
});


export default WideMapScreen;

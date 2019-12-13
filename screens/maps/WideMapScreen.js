import React from "react";
import {View, StyleSheet} from "react-native";
import WideMap from './WideMap'
import MapSearchBarComponent from '../../components/Search/MapSearchComponent'

const WideMapScreen = (props) => {
    return(
        <View style={styles.container}>
            <MapSearchBarComponent style={styles.mapSearchBar}/>
            <WideMap navigation={props.navigation}/>
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
    mapSearchBar:{
        zIndex:1000,
    }
});


export default WideMapScreen;

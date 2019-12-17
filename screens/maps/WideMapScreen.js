import React from "react";
import {View, StyleSheet} from "react-native";
import WideMap from './WideMap'
import MapSearchBarComponent from '../../components/Search/MapSearchComponent';


class WideMapScreen extends React.Component {
    constructor(props) {
        super(props)
    }
    static navigationOptions = ({ navigation }) => {
        return {
          title: "Organization Locations",
          headerStyle: {
            backgroundColor: "#323338"
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            textAlign: "center",
            flexGrow: 1,
            alignSelf: "center"
          },
        };
      };


    render () {
        return(
            <View style={styles.container}>
                {/* <MapScreenHeader /> */}
                <MapSearchBarComponent style={styles.mapSearchBar}/>
                <WideMap navigation={this.props.navigation}/>
            </View>
        );
   } 
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

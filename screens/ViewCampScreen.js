import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,  
  Image
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { ScrollView } from 'react-navigation';
import * as WebBrowser from 'expo-web-browser';
import { connect } from 'react-redux';
import SvgUri from 'react-native-svg-uri';

import { getProfileData } from '../store/actions'
import BackButton from '../components/BackButton'



class ViewCampScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Campaign',
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        textAlign: 'center',
        flexGrow: 1,
        alignSelf: 'center'
      },
      headerLeft: <BackButton navigation={navigation} />,
      headerRight:  <View />
    };
  };

  goToProfile = () => {
    this.props.getProfileData(this.props.selectedCampaign.users_id);
    this.props.navigation.navigate('Pro');
  };

  render() {
    return (
      <ScrollView>
        <View>
          <ListItem
            onPress={this.goToProfile}
            title={
              <View>
                <Text style={styles.listUsername}>{this.props.selectedCampaign.username}</Text>
              </View>
            }
            leftAvatar={{ source: { uri: this.props.selectedCampaign.profile_image } }}
            subtitle={this.props.selectedCampaign.location}
          />        
            <Image
              source={{ uri: this.props.selectedCampaign.camp_img }}
              style={styles.campImgContain}
            />
          <View style={styles.campDescContain}>            
            <Text style={styles.campDescName}>{this.props.selectedCampaign.camp_name}</Text>
            <Text style={styles.campDesc}>{this.props.selectedCampaign.camp_desc}</Text>            
          </View>
          <View style={styles.donateView}>
            <View style={styles.campMission}>
              <SvgUri
                width='25'
                height='25'
                source={require('../assets/icons/hand.svg')}
              />
              <Text style={styles.supportMissionText}>Support Our Mission</Text>
              <Text style={styles.campMissionText}>Your donation helps us more{"\n"}than you know. Thanks!</Text>
            </View>
            <View style={styles.donateButton}>
              <TouchableOpacity
                style={styles.touchableButton}
                // If these links are empty string and don't have an http:// or a https:// it will send you with unpromised rejections.
                onPress={async () =>
                  this.props.selectedCampaign.camp_cta &&
                  this.props.selectedCampaign.camp_cta !== null &&
                  (await WebBrowser.openBrowserAsync(this.props.selectedCampaign.camp_cta))
                }
              >
                <View style={styles.touchableView}>
                  <Text style={styles.touchableText}>Donate</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.whiteSpace} />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  selectedCampaign: state.selectedCampaign
});

const styles =  StyleSheet.create({
  touchableButton: {
    paddingTop: 25,
    paddingBottom: 25,
    width: '100%',
    height: 50,
   
  },
  touchableView: {
    backgroundColor: '#00FF9D',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 48,
    width: 243,
    
  },
  touchableText: {
    fontFamily: 'OpenSans-Regular',
    color: '#323338',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 2,
    fontSize: 16
  },
  donateButton: {
    fontFamily: "OpenSans-SemiBold",
    width: '60%',
    alignSelf: 'center',
  },
  supportMissionText: {
    fontFamily: 'OpenSans-SemiBold',
     fontSize: 14,
     paddingLeft: 10,
  },
  campMissionText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    lineHeight: 19,
    paddingTop: 10,
  },
  campMission: {
    width: '68%',
    fontFamily: 'OpenSans-Regular',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    fontSize: 14,
    marginTop: 20,
    paddingTop: 19,
    borderTopWidth: 2,
    borderTopColor: '#eee',
  },
  campImgContain: {
    /* Must have a Width && Height or it won't display anything! */
    resizeMode: 'cover',
    height: 300
  },
  campDescContain: {
    marginLeft: 15,
    paddingTop: 15,
    marginRight: 15,
  },
  campDescName: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
    lineHeight: 22
  },
  campDesc: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    lineHeight: 19
  },
  listUsername: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
    lineHeight: 22,
  },
  donateView: {
    alignItems: 'center',
  },
  whiteSpace: {
    height: 40
  },

})

export default connect(
  mapStateToProps,
  { getProfileData }
)(ViewCampScreen);


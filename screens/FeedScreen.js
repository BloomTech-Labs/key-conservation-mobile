import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-navigation';
import { connect } from 'react-redux';
import * as SecureStorage from 'expo-secure-store';
import { Icon } from 'react-native-elements';
import { getCampaigns } from '../store/actions';
import FeedCampaign from '../components/FeedScreen/FeedCampaign';
import FeedUpdate from '../components/FeedScreen/FeedUpdate';
import LoginButton from '../components/LoginButton';
import SvgUri from 'react-native-svg-uri';
import styles from '../constants/Stylesheet';

class FeedScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Feed',
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        textAlign: 'center',
        flexGrow: 1,
        alignSelf: 'center',
        fontFamily: 'OpenSans-SemiBold'
      },
      headerLeft: <View />,
      headerRight: (
        <TouchableOpacity
          onPress={() => navigation.navigate('Search')}
          style={{ marginRight: 15 }}
        >
          <SvgUri
            width='25'
            height='25'
            source={require('../assets/icons/search-regular.svg')}
          />
        </TouchableOpacity>
      )
    };
  };

  state = {
    campaignsVisible: 8
  }

  componentDidMount() {
    this.props.navigation.setParams({
      roles: this.props.currentUserProfile.roles
    });
    this.props.getCampaigns();
    let refreshInterval = setInterval(() => this.props.getCampaigns(), 10000);
  }

  addMoreCampaigns = () => {
    this.setState({
      campaignsVisible: this.state.campaignsVisible + 8
    })
  }

  render() {
    const { navigation } = this.props;
    return (
      <ScrollView>
        <View style={styles.feedContainer}>
          {this.props.allCampaigns.length > 0 &&
            this.props.allCampaigns.slice(0, this.state.campaignsVisible).map(camp => {
              if (camp.update_id) {
                return (
                  <FeedUpdate
                    key={`update${camp.update_id}`}
                    data={camp}
                    toggled={this.props.campaignsToggled.includes(`update${camp.update_id}`)}
                    navigation={navigation}
                  />
                )
              } else {
                return (
                  <FeedCampaign
                    key={camp.camp_id}
                    data={camp}
                    toggled={this.props.campaignsToggled.includes(camp.camp_id)}
                    navigation={navigation}
                  />
                );
              }
            })}
        </View>
        {this.state.campaignsVisible < this.props.allCampaigns.length &&
          <View style={styles.loadMoreView}>
            <TouchableOpacity onPress={this.addMoreCampaigns} style={styles.loadMoreTouchable}>
                <Text style={styles.loadMoreText}>Load More Campaigns</Text>
            </TouchableOpacity>
          </View>
        }
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  allCampaigns: state.allCampaigns,
  currentUserProfile: state.currentUserProfile,
  campaignsToggled: state.campaignsToggled
});

export default connect(
  mapStateToProps,
  { getCampaigns }
)(FeedScreen);

import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { ScrollView, NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import { getCampaigns } from '../store/actions';
import FeedCampaign from '../components/FeedScreen/FeedCampaign';
import FeedUpdate from '../components/FeedScreen/FeedUpdate';
import SvgUri from 'react-native-svg-uri';
import styles from '../constants/screens/FeedScreen';
import { AmpInit } from '../components/withAmplitude';
import { Viewport } from '@skele/components';

import Search from '../assets/js icons/SearchIcon';

class FeedScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'LIVE Feed',
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        textAlign: 'center',
        flexGrow: 1,
        alignSelf: 'center',
        fontFamily: 'Lato-Bold'
      },
      headerLeft: <View />,
      headerRight: (
        <TouchableOpacity
          onPress={() => navigation.navigate('Search')}
          style={{
            width: 70,
            height: 45,
            justifyContent: 'center',
            alignItems: 'flex-end',
            marginRight: 15
          }}
        >
          <Search />
          {/* <SvgUri
            fill="#fff"
            width="25"
            height="25"
            source={require("../assets/icons/search-regular.svg")}
          /> */}
        </TouchableOpacity>
      )
    };
  };

  state = {
    campaignsVisible: 8
  };

  componentDidMount() {
    this.props.navigation.setParams({
      roles: this.props.currentUserProfile.roles
    });
  }

  startGettingCampaigns = () => {
    this.props.getCampaigns();
    this.refreshInterval = setInterval(() => this.props.getCampaigns(), 10000);
  };

  stopGettingCampaigns = () => {
    clearInterval(this.refreshInterval);
  };

  addMoreCampaigns = () => {
    this.setState({
      campaignsVisible: this.state.campaignsVisible + 8
    });
  };

  render() {
    const { navigation } = this.props;
    return (
      <Viewport.Tracker>
        <ScrollView scrollEventThrottle={16}>
          <View style={styles.feedContainer}>
            <NavigationEvents
              onDidFocus={this.startGettingCampaigns}
              onDidBlur={this.stopGettingCampaigns}
            />
            {this.props.allCampaigns.length > 0 &&
              this.props.allCampaigns
                .slice(0, this.state.campaignsVisible)
                .map(camp => {
                  if (camp.update_id) {
                    return (
                      <FeedUpdate
                        key={`update${camp.update_id}`}
                        data={camp}
                        toggled={this.props.campaignsToggled.includes(
                          `update${camp.update_id}`
                        )}
                        navigation={navigation}
                      />
                    );
                  } else {
                    return (
                      <FeedCampaign
                        key={camp.camp_id}
                        data={camp}
                        toggled={this.props.campaignsToggled.includes(
                          camp.camp_id
                        )}
                        navigation={navigation}
                      />
                    );
                  }
                })}
          </View>
          {this.state.campaignsVisible < this.props.allCampaigns.length && (
            <View style={styles.loadMoreView}>
              <TouchableOpacity
                onPress={this.addMoreCampaigns}
                style={styles.loadMoreTouchable}
              >
                <Text style={styles.loadMoreText}>View More Campaigns</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </Viewport.Tracker>
    );
  }
}

const mapStateToProps = state => ({
  allCampaigns: state.allCampaigns,
  currentUserProfile: state.currentUserProfile,
  campaignsToggled: state.campaignsToggled
});

export default connect(mapStateToProps, { getCampaigns })(FeedScreen);

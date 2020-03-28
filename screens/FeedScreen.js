import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { ScrollView, NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import { getCampaigns } from '../store/actions';
import FeedCampaign from '../components/FeedScreen/FeedCampaign';
import FeedUpdate from '../components/FeedScreen/FeedUpdate';
import styles from '../constants/screens/FeedScreen';
import { AmpInit } from '../components/withAmplitude';
import { Viewport } from '@skele/components';
import AddCampaignHeader from '../components/FeedScreen/AddCampaignHeader';

import Search from '../assets/jsicons/SearchIcon';

class FeedScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'LIVE Feed',
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff',
      headerLeft: () => <View />,
      headerRight: () => (
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
        <ScrollView scrollEventThrottle={16} stickyHeaderIndices={[0]}>
          <View>
            {this.props.currentUserProfile.roles === 'conservationist' ? (
              <AddCampaignHeader profile={this.props.currentUserProfile} />
            ) : null}
          </View>
          <View style={styles.feedContainer}>
            <NavigationEvents
              onDidFocus={this.startGettingCampaigns}
              onDidBlur={this.stopGettingCampaigns}
            />
            {this.props.allCampaigns.length > 0 &&
              this.props.allCampaigns
                .slice(0, this.state.campaignsVisible)
                .map(campaign => {
                  if (campaign) {
                    return (
                      <FeedCampaign
                        key={campaign.id}
                        data={campaign}
                        toggled={this.props.campaignsToggled.includes(
                          campaign.id
                        )}
                        navigation={navigation}
                      />
                    )
                  }
                }
                )}
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

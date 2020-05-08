import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { ScrollView, NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import { getFeed } from '../store/actions';
import FeedCampaign from '../components/FeedScreen/FeedCampaign';
import styles from '../constants/screens/FeedScreen';
import { Viewport } from '@skele/components';
import AddCampaignHeader from '../components/FeedScreen/AddCampaignHeader';

import Search from '../assets/jsicons/SearchIcon';

const WEBSOCKET_URL = 'ws://192.168.1.146:8080';

class FeedScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'LIVE Feed',
      headerStyle: {
        backgroundColor: '#323338',
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
            marginRight: 15,
          }}
        >
          <Search />
        </TouchableOpacity>
      ),
    };
  };

  state = {
    campaignsVisible: 8,
    webSocketStatus: 'Nothing so far',
  };

  componentDidMount() {
    this.props.getFeed();
    this.props.navigation.setParams({
      roles: this.props.currentUserProfile.roles,
    });

    // Establish WebSocket connection for new incoming
    // posts
    const connection = new WebSocket(WEBSOCKET_URL);

    connection.onopen = () => {
      connection.send('hey there');
    };

    connection.onmessage = (e) => {
      this.setState({ webSocketStatus: e.data });
      console.log(e.data);
    };

    connection.onerror = (e) => {
      console.log('Error occurred trying to connect to WebSocket', e);
    };
  }

  addMoreCampaigns = () => {
    // this.setState({
    //   campaignsVisible: this.state.campaignsVisible + 8,
    // });
  };

  render() {
    const { navigation } = this.props;
    // return (
    //   <View>
    //     <Text>{this.state.webSocketStatus}</Text>
    //   </View>
    // );
    return (
      <Viewport.Tracker>
        <ScrollView scrollEventThrottle={16} stickyHeaderIndices={[0]}>
          <View>
            {this.props.currentUserProfile.roles === 'conservationist' ? (
              <AddCampaignHeader profile={this.props.currentUserProfile} />
            ) : null}
          </View>
          <View style={styles.feedContainer}>
            {this.props.allCampaigns.length > 0 &&
              this.props.allCampaigns.map((campaign) => {
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
                  );
                }
              })}
          </View>
          {/* {this.state.campaignsVisible < this.props.allCampaigns.length && (
            <View style={styles.loadMoreView}>
              <TouchableOpacity
                onPress={this.addMoreCampaigns}
                style={styles.loadMoreTouchable}
              >
                <Text style={styles.loadMoreText}>View More Campaigns</Text>
              </TouchableOpacity>
            </View>
          )} */}
        </ScrollView>
      </Viewport.Tracker>
    );
  }
}

const mapStateToProps = (state) => ({
  allCampaigns: state.allCampaigns,
  currentUserProfile: state.currentUserProfile,
  campaignsToggled: state.campaignsToggled,
});

export default connect(mapStateToProps, { getFeed })(FeedScreen);

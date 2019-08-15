import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { Avatar, Icon, ListItem } from 'react-native-elements';
import FeedCampaign from '../components/FeedScreen/FeedCampaign';
import ProfileHeader from '../components/Profile/ProfileHeader';

const ProScreen = props => {
  let { selectedProfile } = useSelector(state => state);
  const dispatch = useDispatch();
  const { navigation } = props;
  const orgId = props.navigation.getParam('orgId');

  return (
    <ScrollView>
      <ProfileHeader navigation={navigation} profile={selectedProfile} myProfile={false} />
      <View />
      <View>
        {selectedProfile.campaigns.map(campaign => {
          return (
            <ListItem
              key={campaign.camp_id}
              title={campaign.camp_name}
              leftAvatar={{ source: { uri: campaign.camp_img } }}
              subtitle={campaign.location}
              // rightIcon={
              //   <Icon name='ellipsis-v' type='font-awesome' color='black' />
              // }
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

class ProScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Profile',
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        textAlign: 'center',
        flexGrow: 1,
        alignSelf: 'center',
        fontFamily: 'OpenSans-SemiBold',
      },
      headerLeft: <BackButton navigation={navigation} />,
      headerRight: <View />
    };
  };
  
  render() {
    return (
      <ScrollView stickyHeaderIndices={[0]}>
        <View style={{borderBottomWidth: 2, borderBottomColor: '#929292'}}>
          <ProfileHeader navigation={this.props.navigation} profile={this.props.selectedProfile} myProfile={false} />
        </View>
        {this.props.selectedProfile.campaigns.map(camp => {
          return (
            <FeedCampaign
              key={camp.camp_id}
              data={camp}
              toggled={true}
              navigation={this.props.navigation}
            />
          );
        })}
      </ScrollView>
      
      
    );
  }
};

export default ProScreen;

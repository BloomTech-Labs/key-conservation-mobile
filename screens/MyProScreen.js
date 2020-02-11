import React from 'react';
import { View, Text, Alert } from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu';
import { ScrollView } from 'react-navigation';
import { connect } from 'react-redux';
import SvgUri from 'react-native-svg-uri';
import { ListItem } from 'react-native-elements';

import {
  getProfileData,
  deleteCampaign,
  setCampaign,
  deleteCampaignUpdate
} from '../store/actions';

import EditButton from '../components/EditButton';
import SettingsButton from '../components/SettingsButton';

import ProfileHeader from '../components/Profile/ProfileHeader';
import CampBlankSpace from '../components/Profile/CampBlankSpace';

class MyProScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: true,
      title: '',
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff',
      headerLeft: () => (
        <SettingsButton
          navigation={navigation}
          settingsRoute={'AccountSettings'}
        />
      ),
      headerRight: () => (
        <EditButton navigation={navigation} editRoute={'EditPro'} />
      )
    };
  };

  componentDidMount() {
    console.log('currentUserProfile', this.props.currentUserProfile);
    this.props.getProfileData(
      this.props.currentUserProfile.id,
      false,
      'myProfile'
    );
  }

  delete = (id, type) => {
    let message, onPressFunction;
    if (type === 'campaign') {
      message =
        'Deleting a campaign will also delete all updates associated with it.\nAre you sure you want to delete this campaign?';
      onPressFunction = () => this.props.deleteCampaign(id);
    } else if (type === 'update') {
      message = 'Are you sure you want to delete this update?';
      onPressFunction = () => this.props.deleteCampaignUpdate(id);
    }
    Alert.alert('Warning', message, [
      { text: 'Yes', onPress: onPressFunction },
      { text: 'No', style: 'cancel' }
    ]);
  };

  goToCampaign = camp => {
    this.props.setCampaign(camp);
    this.props.navigation.navigate('Camp', {
      likes: camp.likes.length,
      media: camp.camp_img
    });
  };

  goToEditCampaign = camp => {
    this.props.setCampaign(camp);
    this.props.navigation.navigate('EditCamp');
  };

  goToCreateCampUpdate = camp => {
    this.props.setCampaign(camp);
    this.props.navigation.navigate('CreateCampUpdate');
  };

  goToCampUpdate = camp => {
    this.props.setCampaign(camp);
    this.props.navigation.navigate('CampUpdate', { backBehavior: 'MyPro' });
  };

  goToEditCampUpdate = camp => {
    this.props.setCampaign(camp);
    this.props.navigation.navigate('EditCampUpdate');
  };

  render() {
    const video = require('../assets/images/videocam.png');
    return (
      <ScrollView>
        <ProfileHeader
          navigation={this.props.navigation}
          myProfile={true}
          profile={this.props.currentUserProfile}
        />
        <View />
        {this.props.currentUserProfile.campaigns?.length === 0 ? (
          <CampBlankSpace />
        ) : (
          <View>
            {this.props.currentUserProfile.campaigns &&
              this.props.currentUserProfile.campaigns?.map(camp => {
                if (camp.update_id) {
                  if (
                    camp.update_img.includes('.mov') ||
                    camp.update_img.includes('.mp3') ||
                    camp.update_img.includes('.mp4')
                  ) {
                    return (
                      <ListItem
                        onPress={() => this.goToCampUpdate(camp)}
                        key={`update${camp.update_id}`}
                        title={`${camp.camp_name} - Update`}
                        leftAvatar={{ source: video }}
                        subtitle={camp.location}
                        rightIcon={
                          <Menu>
                            <MenuTrigger
                              customStyles={triggerStyles}
                              children={
                                <View
                                  style={{
                                    alignItems: 'flex-end',
                                    justifyContent: 'center',
                                    width: 50,
                                    height: 50,
                                    paddingRight: 5,
                                    borderRadius: 50
                                  }}
                                >
                                  <SvgUri
                                    fill='#3b3b3b'
                                    width='25'
                                    height='25'
                                    source={require('../assets/icons/ellipsis-vertical.svg')}
                                  />
                                </View>
                              }
                            />
                            <MenuOptions customStyles={optionsStyles}>
                              <MenuOption
                                onSelect={() =>
                                  this.delete(camp.update_id, 'update')
                                }
                              >
                                <Text
                                  style={{ color: '#ff0a55', fontSize: 16 }}
                                >
                                  Delete Update
                                </Text>
                              </MenuOption>
                              <MenuOption
                                onSelect={() => this.goToEditCampUpdate(camp)}
                              >
                                <Text style={{ color: '#000', fontSize: 16 }}>
                                  Edit Update Post
                                </Text>
                              </MenuOption>
                            </MenuOptions>
                          </Menu>
                        }
                      />
                    );
                  } else {
                    return (
                      <ListItem
                        onPress={() => this.goToCampUpdate(camp)}
                        key={`update${camp.update_id}`}
                        title={`${camp.camp_name} - Update`}
                        leftAvatar={{ source: { uri: camp.update_img } }}
                        subtitle={camp.location}
                        rightIcon={
                          <Menu>
                            <MenuTrigger
                              customStyles={triggerStyles}
                              children={
                                <View
                                  style={{
                                    alignItems: 'flex-end',
                                    justifyContent: 'center',
                                    width: 50,
                                    height: 50,
                                    paddingRight: 5,
                                    borderRadius: 50
                                  }}
                                >
                                  <SvgUri
                                    fill='#3b3b3b'
                                    width='25'
                                    height='25'
                                    source={require('../assets/icons/ellipsis-vertical.svg')}
                                  />
                                </View>
                              }
                            />
                            <MenuOptions customStyles={optionsStyles}>
                              <MenuOption
                                onSelect={() =>
                                  this.delete(camp.update_id, 'update')
                                }
                              >
                                <Text
                                  style={{ color: '#ff0a55', fontSize: 16 }}
                                >
                                  Delete Update
                                </Text>
                              </MenuOption>
                              <MenuOption
                                onSelect={() => this.goToEditCampUpdate(camp)}
                              >
                                <Text style={{ color: '#000', fontSize: 16 }}>
                                  Edit Update Post
                                </Text>
                              </MenuOption>
                            </MenuOptions>
                          </Menu>
                        }
                      />
                    );
                  }
                } else {
                  if (
                    camp.camp_img.includes('.mov') ||
                    camp.camp_img.includes('.mp3') ||
                    camp.camp_img.includes('.mp4')
                  ) {
                    return (
                      <ListItem
                        onPress={() => this.goToCampaign(camp)}
                        key={camp.camp_id}
                        title={camp.camp_name}
                        leftAvatar={{ source: video }}
                        subtitle={camp.location}
                        rightIcon={
                          <Menu>
                            <MenuTrigger
                              customStyles={triggerStyles}
                              children={
                                <View
                                  style={{
                                    alignItems: 'flex-end',
                                    justifyContent: 'center',
                                    width: 50,
                                    height: 50,
                                    paddingRight: 5,
                                    borderRadius: 50
                                  }}
                                >
                                  <SvgUri
                                    fill='#3b3b3b'
                                    width='25'
                                    height='25'
                                    source={require('../assets/icons/ellipsis-vertical.svg')}
                                  />
                                </View>
                              }
                            />
                            <MenuOptions customStyles={optionsStyles}>
                              <MenuOption
                                onSelect={() =>
                                  this.delete(camp.camp_id, 'campaign')
                                }
                              >
                                <Text
                                  style={{ color: '#ff0a55', fontSize: 16 }}
                                >
                                  Delete Campaign
                                </Text>
                              </MenuOption>
                              <MenuOption
                                onSelect={() => this.goToCreateCampUpdate(camp)}
                              >
                                <Text style={{ color: '#000', fontSize: 16 }}>
                                  Make Update Post
                                </Text>
                              </MenuOption>
                              <MenuOption
                                onSelect={() => this.goToEditCampaign(camp)}
                              >
                                <Text style={{ color: '#000', fontSize: 16 }}>
                                  Edit Post
                                </Text>
                              </MenuOption>
                            </MenuOptions>
                          </Menu>
                        }
                      />
                    );
                  } else {
                    return (
                      <ListItem
                        onPress={() => this.goToCampaign(camp)}
                        key={camp.camp_id}
                        title={camp.camp_name}
                        leftAvatar={{ source: { uri: camp.camp_img } }}
                        subtitle={camp.location}
                        rightIcon={
                          <Menu>
                            <MenuTrigger
                              customStyles={triggerStyles}
                              children={
                                <View
                                  style={{
                                    alignItems: 'flex-end',
                                    justifyContent: 'center',
                                    width: 50,
                                    height: 50,
                                    paddingRight: 5,
                                    borderRadius: 50
                                  }}
                                >
                                  <SvgUri
                                    fill='#3b3b3b'
                                    width='25'
                                    height='25'
                                    source={require('../assets/icons/ellipsis-vertical.svg')}
                                  />
                                </View>
                              }
                            />
                            <MenuOptions customStyles={optionsStyles}>
                              <MenuOption
                                onSelect={() =>
                                  this.delete(camp.camp_id, 'campaign')
                                }
                              >
                                <Text
                                  style={{ color: '#ff0a55', fontSize: 16 }}
                                >
                                  Delete Campaign
                                </Text>
                              </MenuOption>
                              <MenuOption
                                onSelect={() => this.goToCreateCampUpdate(camp)}
                              >
                                <Text style={{ color: '#000', fontSize: 16 }}>
                                  Make Update Post
                                </Text>
                              </MenuOption>
                              <MenuOption
                                onSelect={() => this.goToEditCampaign(camp)}
                              >
                                <Text style={{ color: '#000', fontSize: 16 }}>
                                  Edit Post
                                </Text>
                              </MenuOption>
                            </MenuOptions>
                          </Menu>
                        }
                      />
                    );
                  }
                }
              })}
          </View>
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  currentUserProfile: state.currentUserProfile,
  selectedCampaign: state.selectedCampaign
});

const optionsStyles = {
  optionsContainer: {
    width: 175
  }
};

const triggerStyles = {
  triggerTouchable: {
    underlayColor: '#fff',
    activeOpacity: 0.8,
    background: null
  }
};

export default connect(mapStateToProps, {
  getProfileData,
  deleteCampaign,
  setCampaign,
  deleteCampaignUpdate
})(MyProScreen);
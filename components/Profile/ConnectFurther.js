import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Linking, Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import { navigate } from '../../navigation/RootNavigator';

import ConnectFurtherIcon from '../../assets/jsicons/socialmedia/ConnectFurtherIcon';
import Envelope from '../../assets/jsicons/socialmedia/Envelope';
import Twitter from '../../assets/jsicons/socialmedia/Twitter';
import TwitterAdd from '../../assets/jsicons/socialmedia/TwitterAdd';
import Instagram from '../../assets/jsicons/socialmedia/Instagram';
import IgAdd from '../../assets/jsicons/socialmedia/IgAdd';
import Facebook from '../../assets/jsicons/socialmedia/Facebook';
import FbAdd from '../../assets/jsicons/socialmedia/FbAdd';
// import LinkedIn from '../../assets/jsicons/socialmedia/LinkedIn';
// import LinkedInAdd from '../../assets/jsicons/socialmedia/LinkedInAdd';
// import GitHub from '../../assets/jsicons/socialmedia/GitHub';
// import GitHubAdd from '../../assets/jsicons/socialmedia/GitHubAdd';

import styles from '../../constants/Profile/ConnectFurther';

const ConnectFurther = props => {
  const profile = props.profile;
  const myProfile = props.currentUserProfile.id === profile.id ? true : false;

  const editRoute = profile.roles === 'supporter' ? 'EditSupPro' : 'EditPro';

  return (
    <View>
      <View style={styles.titleSection}>
        <ConnectFurtherIcon width='30' height='30' />
        <Text style={styles.title}>Connect Further</Text>
      </View>
      <View style={styles.iconSection}>
        <TouchableOpacity
          style={[styles.iconWrap, styles.envelope]}
          onPress={async () => {
            profile.email &&
              profile.email !== null &&
              (await Linking.openURL(`mailto:${profile.email}`));
          }}
        >
          <Envelope fill='#323338' width='35' height='35' />
        </TouchableOpacity>

        {/* {!profile.linkedin ? (
          myProfile ? (
            <TouchableOpacity
              style={styles.iconWrap}
              //   style={{ padding: 0, padding: 0 }}
              onPress={() => navigate(editRoute)}
            >
              <LinkedInAdd fill='#323338' width='35' height='35' />
            </TouchableOpacity>
          ) : null
        ) : (
          <TouchableOpacity
            style={styles.iconWrap}
            //   style={{ padding: 0, padding: 0 }}
            onPress={() => WebBrowser.openBrowserAsync(profile.linkedin)}
          >
            <LinkedIn fill='#323338' width='35' height='35' />
          </TouchableOpacity>
        )} */}

        {!profile.instagram ? (
          myProfile ? (
            <TouchableOpacity
              style={styles.iconWrap}
              //   style={{ padding: 0, padding: 0 }}
              onPress={() => navigate(editRoute)}
            >
              <IgAdd fill='#323338' width='35' height='35' />
            </TouchableOpacity>
          ) : null
        ) : (
          <TouchableOpacity
            style={styles.iconWrap}
            //   style={{ padding: 0, padding: 0 }}
            onPress={() => WebBrowser.openBrowserAsync(profile.instagram)}
          >
            <Instagram fill='#323338' width='35' height='35' />
          </TouchableOpacity>
        )}

        {!profile.facebook ? (
          myProfile ? (
            <TouchableOpacity
              style={styles.iconWrap}
              //   style={{ padding: 0, padding: 0 }}
              onPress={() => navigate(editRoute)}
            >
              <FbAdd fill='#323338' width='35' height='35' />
            </TouchableOpacity>
          ) : null
        ) : (
          <TouchableOpacity
            style={styles.iconWrap}
            onPress={() => WebBrowser.openBrowserAsync(profile.facebook)}
          >
            <Facebook fill='#323338' width='35' height='35' />
          </TouchableOpacity>
        )}

        {!profile.twitter ? (
          myProfile ? (
            <TouchableOpacity
              style={styles.iconWrap}
              //   style={{ padding: 0, padding: 0 }}
              onPress={() => navigate(editRoute)}
            >
              <TwitterAdd fill='#323338' width='35' height='35' />
            </TouchableOpacity>
          ) : null
        ) : (
          <TouchableOpacity
            style={styles.iconWrap}
            onPress={() => WebBrowser.openBrowserAsync(profile.twitter)}
          >
            <Twitter fill='#323338' width='35' height='35' />
          </TouchableOpacity>
        )}
        {/* the following is ready to go for when gihub added to backend */}
        {/* {!profile.github ? (
          myProfile ? (
            <TouchableOpacity
              style={styles.iconWrap}
              //   style={{ padding: 0, padding: 0 }}
              onPress={() => navigate(editRoute)}
            >
              <GitHubAdd fill='#323338' width='35' height='35' />
            </TouchableOpacity>
          ) : null
        ) : (
          <TouchableOpacity
            style={styles.iconWrap}
            onPress={() => WebBrowser.openBrowserAsync(profile.github)}
          >
            <GitHub fill='#323338' width='35' height='35' />
          </TouchableOpacity>
        )} */}
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  currentUserProfile: state.currentUserProfile
});

export default connect(mapStateToProps)(ConnectFurther);

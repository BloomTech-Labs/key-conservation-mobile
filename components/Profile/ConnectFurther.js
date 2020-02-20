import React from 'react';
import { View, TouchableOpacity, Linking, Text } from 'react-native';

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

import styles from '../../constants/Profile/ConnectFurther';

const ConnectFurther = props => {
  const profile = props.profile;

  console.log(props.profile.id, props.profile.roles);

  const role = profile.roles;

  //   const makeCall = () => {
  //     let phoneNumber = profile.phone_number;
  //     // let phoneNumber = 123456789 -- used for testing purposes
  //     if (Platform.OS === 'android') {
  //       phoneNumber = `tel:${phoneNumber}`;
  //     } else {
  //       phoneNumber = `telprompt:${phoneNumber}`;
  //     }
  //     Linking.openURL(phoneNumber);
  //   };

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
        {/* {profile.linkedin === null ? (
          props.myProfile === true ? (
            <TouchableOpacity
              style={styles.iconWrap}
              //   style={{ padding: 0, padding: 0 }}
              onPress={() => navigate('EditPro')}
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
            <LinkedIn fill='#323338' width='35' height='35'/>
          </TouchableOpacity>
        )} */}

        {profile.instagram === null ? (
          props.myProfile === true ? (
            <TouchableOpacity
              style={styles.iconWrap}
              //   style={{ padding: 0, padding: 0 }}
              onPress={() => navigate('EditPro')}
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

        {profile.facebook === null ? (
          props.myProfile === true ? (
            <TouchableOpacity
              style={styles.iconWrap}
              //   style={{ padding: 0, padding: 0 }}
              onPress={() => navigate('EditPro')}
            >
              <FbAdd width='35' height='35' />
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

        {profile.twitter === null ? (
          props.myProfile === true ? (
            <TouchableOpacity
              style={styles.iconWrap}
              //   style={{ padding: 0, padding: 0 }}
              onPress={() => navigate('EditPro')}
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
      </View>
    </View>
  );
};

export default ConnectFurther;

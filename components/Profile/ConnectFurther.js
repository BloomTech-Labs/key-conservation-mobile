import React from 'react';
import { View, TouchableOpacity, Linking, Text } from 'react-native';

import Envelope from '../../assets/jsicons/socialmedia/Envelope';
import Twitter from '../../assets/jsicons/socialmedia/Twitter';
import TwitterAdd from '../../assets/jsicons/socialmedia/TwitterAdd';
import Instagram from '../../assets/jsicons/socialmedia/Instagram';
import IgAdd from '../../assets/jsicons/socialmedia/IgAdd';
import Facebook from '../../assets/jsicons/socialmedia/Facebook';
import FbAdd from '../../assets/jsicons/socialmedia/FbAdd';
import ConnectFurtherIcon from '../../assets/jsicons/socialmedia/ConnectFurtherIcon';

import styles from '../../constants/Profile/ConnectFurther';

const ConnectFurther = props => {
  const { profile } = props;
  //console.log(props);

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
    // <View>
    //   <View style={styles.titleSection}>
    //     <ConnectFurtherIcon width='30' height='30' />
    //     <Text style={styles.title}>Connect Further</Text>
    //   </View>
    //   <View style={styles.iconSection}>
    //     <TouchableOpacity
    //       onPress={async () => {
    //         profile.email &&
    //           profile.email !== null &&
    //           (await Linking.openURL(`mailto:${profile.email}`));
    //       }}
    //     >
    //       <Envelope fill='black' />
    //     </TouchableOpacity>
    //     {profile.instagram === null ? (
    //       props.myProfile === true ? (
    //         <TouchableOpacity
    //           style={styles.iconWrap}
    //           //   style={{ padding: 0, padding: 0 }}
    //           onPress={() => props.navigation.navigate('EditPro')}
    //         >
    //           <IgAdd fill='black' />
    //         </TouchableOpacity>
    //       ) : null
    //     ) : (
    //       <TouchableOpacity
    //         style={styles.iconWrap}
    //         //   style={{ padding: 0, padding: 0 }}
    //         onPress={() => WebBrowser.openBrowserAsync(profile.instagram)}
    //       >
    //         <Instagram />
    //       </TouchableOpacity>
    //     )}

    //     {profile.facebook === null ? (
    //       props.myProfile === true ? (
    //         <TouchableOpacity
    //           style={styles.iconWrap}
    //           //   style={{ padding: 0, padding: 0 }}
    //           onPress={() => props.navigation.navigate('EditPro')}
    //         >
    //           <FbAdd />
    //         </TouchableOpacity>
    //       ) : null
    //     ) : (
    //       <TouchableOpacity
    //         style={styles.iconWrap}
    //         onPress={() => WebBrowser.openBrowserAsync(profile.facebook)}
    //       >
    //         <Facebook />
    //       </TouchableOpacity>
    //     )}

    //     {profile.twitter === null ? (
    //       props.myProfile === true ? (
    //         <TouchableOpacity
    //           style={styles.iconWrap}
    //           //   style={{ padding: 0, padding: 0 }}
    //           onPress={() => props.navigation.navigate('EditPro')}
    //         >
    //           <TwitterAdd />
    //         </TouchableOpacity>
    //       ) : null
    //     ) : (
    //       <TouchableOpacity
    //         style={styles.iconWrap}
    //         onPress={() => WebBrowser.openBrowserAsync(profile.twitter)}
    //       >
    //         <Twitter />
    //       </TouchableOpacity>
    //     )}
    //   </View>
    // </View>

    <View style={styles.socialContainer}>
      <TouchableOpacity
        onPress={async () => {
          profile.email &&
            profile.email !== null &&
            (await Linking.openURL(`mailto:${profile.email}`));
        }}
      >
        <Envelope fill='pink' />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ padding: 0, padding: 0 }}
        onPress={async () =>
          profile.instagram &&
          profile.instagram !== null &&
          (await WebBrowser.openBrowserAsync(profile.instagram))
        }
      >
        <Instagram />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () =>
          profile.twitter &&
          profile.twitter !== null &&
          (await WebBrowser.openBrowserAsync(profile.twitter))
        }
      >
        <Twitter />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () =>
          profile.facebook &&
          profile.facebook !== null &&
          (await WebBrowser.openBrowserAsync(profile.facebook))
        }
      >
        <IgAdd />
      </TouchableOpacity>
    </View>
  );
};

export default ConnectFurther;

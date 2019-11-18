import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';

function getBrand(brand) {
  const brands = {
    twitter: {
      displayName: 'Twitter',
      getIcon() {
        return (
          <View style={styles.button}>
            <FontAwesome name="twitter" size={35} />
          </View>
        );
      },
      share: shareToTwitter,
    },
    facebook: {
      displayName: 'Facebook',
      getIcon() {
        return (
          <View style={styles.button}>
            <FontAwesome name="facebook-official" size={35} />
          </View>
        );
      },
      share: shareToFacebook,
    },
    linkedIn: {
      displayName: 'LinkedIn',
      getIcon() {
        return (
          <View style={styles.button}>
            <FontAwesome name="linkedin-square" size={35} />
          </View>
        );
      }
    },
    instagram: {
      displayName: 'Instagram',
      getIcon() {
        return (
          <View style={styles.button}>
            <FontAwesome name="instagram" size={35} />
          </View>
        );
      }
    }
  };
  return typeof brand === 'undefined' ? brands : brands[brand];
}

function shareToFacebook() {
  let parameters = '';
  const params = {
    u: 'https://expo.io/artifacts/f3dab764-00e4-45e3-b7de-8bc7a8afd392',
    t: 'Hello Guys, This is a testing of twitter share example',
  };

  Object.keys(params).map((key, index) => {
    if (index === 0) {
      parameters += '?';
    }
    parameters += `${key}=${encodeURI(params[key])}&`;
  });

  let url = 'https://www.facebook.com/sharer/sharer.php' + parameters;
  console.log('url', url);

  WebBrowser.openBrowserAsync(url)
    .then(data => {
      alert('Posted');
    })
    .catch(() => {
      alert('Something went wrong');
    });
}

function shareToTwitter() {
  let parameters = '';
  const params = {
    url: 'https://expo.io/artifacts/f3dab764-00e4-45e3-b7de-8bc7a8afd392',
    content: 'Hello Guys, This is a testing of twitter share example',
  };

  Object.keys(params).map((key, index) => {
    if (index === 0) {
      parameters += '?';
    }
    parameters += `${key}=${encodeURI(params[key])}&`;
  });

  let url = 'https://twitter.com/intent/tweet' + parameters;
  console.log('url', url);

  WebBrowser.openBrowserAsync(url)
    .then(data => {
      alert('tweeted');
    })
    .catch(() => {
      alert('Something went wrong');
    });
}

const SharingDialog = ({ navigation, onClose }) => {
  function getSocialButton(brand) {
    const brandObj = getBrand(brand);
    return (
      <TouchableOpacity
        onPress={() => {
          brandObj.share();
          onClose();
        }}
      >
        {brandObj.getIcon()}
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Click to Share Post</Text>
      <View style={styles.socialRow}>
        {getSocialButton('twitter')}
        {getSocialButton('facebook')}
        {getSocialButton('linkedIn')}
        {getSocialButton('instagram')}
      </View>
    </View>
  );
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },
  socialRow: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10
  },
  headline: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.6)',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10
  },
  button: {
    borderRadius: 4,
    padding: 10,
    margin: 10,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'white',
    borderColor: '#888',
    borderWidth: 1,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  }
});

export default SharingDialog;

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';

import { shorten } from '../../util/';

import { connect } from 'react-redux';
import { cancelUploadPost } from '../../store/actions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import X from '../../assets/jsicons/miscIcons/X';

class UploadQueueCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleCancel() {
    Alert.alert(
      'Discard',
      'Are you sure you want to discard this post? This cannot be undone',
      [
        {
          style: 'destructive',
          text: 'Discard',
          onPress: () => {
            this.props.cancelUploadPost(this.props.id);
          },
        },
        {
          style: 'cancel',
          text: 'Cancel',
        },
      ]
    );
  }

  handleRetry() {
    //TODO: Implement Retry
  }

  render() {
    const data = this.props.post;

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <Image
              source={{ uri: data?.image || undefined }}
              style={styles.image}
            />
            <Text style={styles.text}>
              {shorten(data?.name || data?.description, 40)}
            </Text>
          </View>
          <View style={styles.rightContainer}>
            {data?.status === 'Failed' ? null : <ActivityIndicator />}
            <Text style={styles.text}>{data?.status || 'Posting...'}</Text>
            <TouchableOpacity onPress={this.handleCancel.bind(this)}>
              <X />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            ...styles.progressBar,
            backgroundColor: data?.status === 'Failed' ? 'crimson' : 'gray',
          }}
        >
          <View
            style={{
              ...styles.fill,
              width: `${data?.progress || 0}%`,
              backgroundColor:
                data?.status === 'Failed' ? 'crimson' : 'rgba(202,255,0, 1)',
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    height: 56,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  image: { width: 40, height: 40, marginRight: 16 },
  text: {
    fontFamily: 'Lato-Bold',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    marginLeft: 8,
    width: '35%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  progressBar: {
    height: 2,
    flex: 1,
    backgroundColor: 'gray',
  },
  fill: {
    flex: 1,
    height: '100%',
    backgroundColor: 'rgba(202,255,0, 1)',
  },
});

export default connect(null, { cancelUploadPost })(UploadQueueCard);

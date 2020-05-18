import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import styles from '../../constants/FeedScreen/AddCampaignHeader';
import { Avatar } from 'react-native-elements';
import PlusLightening from '../../assets/jsicons/headerIcons/plusLightening';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import UploadQueueCard from './UploadQueueCard';

class AddCampaignHeader extends React.Component {
  constructor(props) {
    super(props);
    this.showAnimation = new Animated.Value(0);

    this.animateIn = Animated.timing(this.showAnimation, {
      useNativeDriver: true,
      toValue: this.props.uploadQueue.length,
      duration: 300,
    });

    this.animateOut = Animated.timing(this.showAnimation, {
      useNativeDriver: true,
      toValue: 0,
      duration: 300,
    });
  }

  componentDidUpdate() {
    if (this.props.uploadQueue.length > 0) {
      this.showAnimation.setValue(this.props.uploadQueue.length - 1);
      this.animateOut.stop();
      this.animateIn.start();
    } else {
      this.animateIn.stop();
      this.animateOut.start();
    }
  }

  render() {
    const opacity = this.showAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    const translateY = this.showAnimation.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 5600],
    });

    return (
      <View style={{ flex: 1 }}>
        <Animated.View
          stlye={{ opacity, transform: [{ translateY: translateY }] }}
        >
          {Object.entries(this.props.uploadQueue)
            .sort(([_a, a], [_b, b]) => a.id > b.id)
            .map(([key, value]) => (
              <UploadQueueCard key={key} id={key} post={value} />
            ))}
          {/* <UploadQueueCard
            post={{
              image:
                'https://keyconservation.s3.us-west-1.amazonaws.com/files/1589401690048_photo.png',
              name: 'Test Post',
              progress: 34.0,
            }}
          /> */}
        </Animated.View>
        <TouchableOpacity
          style={styles.container}
          activeOpacity={0.7}
          onPress={() => {
            this.props.navigation.navigate('CreateCampaign');
          }}
          disabled={this.props.disabled}
        >
          <View style={styles.avatarContainer}>
            <Avatar
              size={48}
              rounded
              source={{
                uri: this.props.profile.profile_image,
              }}
            />
          </View>
          <Text style={styles.text}>Add New Campaign</Text>
          <View style={styles.plusLightening}>
            <View>
              <PlusLightening />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  uploadQueue: state.postUploadQueue,
});

export default connect(mapStateToProps)(withNavigation(AddCampaignHeader));

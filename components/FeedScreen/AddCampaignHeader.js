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
      toValue: 1,
      duration: 200,
    });

    this.animateOut = Animated.timing(this.showAnimation, {
      toValue: 0,
      duration: 200,
    });
  }

  componentDidUpdate() {
    if (this.props.uploadQueue.length > 0) {
      this.animateOut.stop();
      this.animateIn.start();
    } else {
      this.animateIn.stop();
      this.animateOut.start();
    }
  }

  render() {
    const flex = this.showAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    return (
      <View style={{ flex: 1 }}>
        <Animated.View stlye={{ flex }}>
          {Object.entries(this.props.uploadQueue).map(([key, value]) => (
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

import React, { Component } from 'react';
import { View, Text, ImageBackground, ActivityIndicator } from 'react-native';

import { ViewportAwareVideo } from '../util';

import styles from '../constants/MediaViewer';
import { withNavigationFocus } from 'react-navigation';

import { setActiveVideo, unsetActiveVideo } from '../store/actions';

import { connect } from 'react-redux';

// This component shall be responsible for handling videos and
// images and displaying them intelligently making sure that
// only one video ever plays at once, and that videos only play
// when in view
const VIDEO_EXTS = ['mov', 'mp3', 'mp4'];

class MediaViewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  determineIfVideo = () => {
    return VIDEO_EXTS.some((ext) => this.props.source?.includes(ext));
  };

  componentDidUpdate() {
    if (this.props.urgency) {
      this.parseUrgency();
    }
  }

  parseUrgency = () => {
    let urgencyColor;
    if (this.props.is_update || this.props.urgency == 'null') {
      urgencyColor = 'rgba(202,255,0, 0.7)';
    } else if (this.props.urgency === 'Critical') {
      urgencyColor = 'rgba(227,16,89,0.6)';
    } else if (this.props.urgency === 'Urgent') {
      urgencyColor = 'rgba(255,199,0,0.6)';
    } else if (this.props.urgency === 'Longterm') {
      urgencyColor = 'rgba(0,255,157,0.6)';
    } else {
      urgencyColor = 'none';
    }
    let urgencyStatus;
    if (
      this.props.is_update ||
      !this.props.urgency ||
      this.props.urgency == 'null'
    ) {
      urgencyStatus = 'UPDATE';
    } else {
      urgencyStatus = this.props.urgency.toUpperCase();
    }

    if (
      this.state.urgency !== urgencyStatus ||
      this.state.urgencyColor !== urgencyColor
    ) {
      this.setState({
        urgency: urgencyStatus,
        urgencyColor,
      });
    }
  };

  onPlaybackStatusUpdate = (status) => {
    if (status.isBuffering && !status.isPlaying) {
      this.setState({
        loading: true,
      });
    } else {
      this.setState({
        loading: false,
      });
    }
  };

  onViewportEnter = () => {
    this.props.setActiveVideo(this.props.source);
  };

  onViewportLeave = () => {
    this.props.unsetActiveVideo(this.props.source);
  };

  render() {
    return (
      <View>
        {this.state.urgency ? (
          <View
            style={{
              ...styles.urgencyBar,
              backgroundColor: this.state.urgencyColor || 'none',
            }}
          >
            <Text style={styles.urgencyBarText}>{this.state.urgency}</Text>
          </View>
        ) : null}
        {this.state.loading ? (
          <View style={styles.indicator}>
            <ActivityIndicator size="large" />
          </View>
        ) : null}
        {this.determineIfVideo() ? (
          <ViewportAwareVideo
            source={{
              uri: this.props.source,
            }}
            retainOnceInViewport={false}
            preTriggerRatio={-0.1}
            rate={1.0}
            isMuted={false}
            shouldPlay={
              this.props.isFocused &&
              this.props.activeVideo === this.props.source
            }
            isLooping
            resizeMode="cover"
            onPlaybackStatusUpdate={this.onPlaybackStatusUpdate}
            style={styles.campImgContain}
            onViewportEnter={this.onViewportEnter}
            onViewportLeave={this.onViewportLeave}
          />
        ) : (
          <ImageBackground
            source={{ uri: this.props.source || undefined }}
            style={styles.campImgContain}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  activeVideo: state.activeVideos[state.activeVideos.length - 1],
});

export default connect(mapStateToProps, { setActiveVideo, unsetActiveVideo })(
  withNavigationFocus(MediaViewer)
);

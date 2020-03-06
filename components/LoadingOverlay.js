import React from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  Animated
} from 'react-native';

// Loading overlay is a component that will absolutely fill its container
// when the props 'loading' is true and display a loading indicator,
// which can be customized by the parent component

// customization props:

// activityIndicator: A valid React component to display in place of the
// default ActivityIndicator component

// activeOpacity: Opacity of loading overlay when it is active - Default is 0.7

// backgroundColor: Background color of overlay - Default is black

export default class LoadingOverlay extends React.Component {
  constructor(props) {
    super(props);

    this.opacity = new Animated.Value(0);
    this.animateIn = new Animated.timing(this.opacity, {
      toValue: this.props.activeOpacity || 0.7,
      duration: 150
    });
    this.animateOut = new Animated.timing(this.opacity, {
      toValue: 0,
      duration: 150
    });
  }

  componentDidUpdate() {
    if (this.props.loading) {
      this.animateIn.start();
    } else this.animateOut.start();
  }

  render() {
    const overlayStyle = {
      ...styles.load_overlay,
      backgroundColor: this.props.backgroundColor || styles.load_overlay.backgroundColor
    }

    return (
      <Animated.View
        pointerEvents={this.props.loading ? 'auto' : 'none'}
        style={[overlayStyle, { opacity: this.opacity }]}
      >
        {this.props.activityIndicator || <ActivityIndicator size='large' />}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  load_overlay: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999
  },
  load_text: {
    fontWeight: 'bold',
    color: 'white'
  }
});

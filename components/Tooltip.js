import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

// To use tooltip, simply:
/*
  <Tooltip show={toShowOrNotToShow}>
    ...  
    <ChildrenGoHere... />
    ...
  </Tooltip>
*/
// Optional props: opacity, noShadow, color, backgroundColor,
// width, maxWidth, height, position ('top', 'bottom', 'left', 'right'),
// align ('left', 'right')

// Feel free to modify this file to accept more props and allow for more
// customization -- As long as this component remains generalized

const Tooltip = props => {
  const height = props.height || 64;
  const opacity = props.opacity || 0.9;
  let placement;

  switch(props.position) {
    case 'bottom' || 'left' || 'right': {
      placement = props.position;
      break;
    }
    default: placement = 'top';
  }

  const [animation] = useState(new Animated.Value(0));
  
  const showAnim = Animated.timing(animation, {
    toValue: opacity,
    duration: 160
  })

  const hideAnim = Animated.timing(animation, {
    toValue: 0,
    duration: 160
  })

  const animate = () => {
    if(props.show) {
      showAnim.start();
    } else {
      hideAnim.start();
    }
  }

  useEffect(animate, [props.show])

  const styles = StyleSheet.create({
    container: {
      maxWidth: props.maxWidth || undefined,
      width: props.width || '100%',
      backgroundColor: props.backgroundColor || 'white',
      zIndex: 100,
      height,
      left: props.align === 'left' ? 0 : undefined,
      right: props.align === 'right' ? 0 : undefined,
      [placement]: -height - 8,
      shadowColor: props.noShadow ? '#0000' : 'gray',
      shadowRadius: 10,
      elevation: 5,
      shadowOpacity: 1,
      borderRadius: 8,
      padding: 10,
      position: 'absolute'
    }
  });

  return (
    <Animated.View pointerEvents='none' style={[styles.container, { opacity: animation, }]}>
      {props.children}
    </Animated.View>
  );
};

export default Tooltip;

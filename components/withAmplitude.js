import * as Amplitude from 'expo-analytics-amplitude';
import * as SecureStore from 'expo-secure-store';

import React from 'react';

export function withAmplitude(WrappedComponent) {
  return class extends React.Component {
    render() {
      const newProps = {
        ...this.props,
        AmpEvent: AmpEvent
      };
      // Wraps the input component in a container, without mutating it. Good!
      return <WrappedComponent {...newProps} />;
    }
  };
}

export function AmpEvent(name, properties) {
  console.log(typeof properties);
  if (!name) {
    return console.log(
      'You need to include a name for your event, and can also send event properties.'
    );
  }

  if (typeof name !== 'string') {
    return console.log('You must use the data type of String for the name');
  }

  if (name && !properties) {
    return console.log('sent event name but no properties');
    // return Amplitude.logEvent(name);
  } else if (name && properties) {
    if (typeof properties !== 'array' || typeof properties !== 'object') {
      return console.log('You must use the data type Array or Object');
    }
    return console.log('sent name and properties');
    // return Amplitude.logEventWithProperties(name, properties);
  }
}

let count = 0;

export async function AmpInit() {
  const id = await SecureStore.getItemAsync('id');
  console.log('found their id', id);
  if ((count = 0)) {
    console.log('initializing connection');
  }
  // Amplitude.initialize('0e3d4f261c96385cef3f8ab5973ea054');
}

// Amplitude.initialize('0e3d4f261c96385cef3f8ab5973ea054');
// Amplitude.logEvent('Connected');
// Amplitude.setUserId('testingBasicSetup');
//   const userState = (sub, id, role, email, username) => {
//     const object = {
//       sub: sub,
//       id: id,
//       role: role,
//       email: email,
//       username: username
//     };
//     return object;
//   };

//   console.log(userState());
//   // sub: 'testingBasicSetup',
//   // id: null,
//   // role: 'conservationist',
//   // email: 'testingBasic@gmail.com',
//   // username: null

//   Amplitude.setUserProperties(userState());
//   console.log(
//     userState(
//       'testingBasicSetup',
//       null,
//       'conservationist',
//       'testingBasic@gmail.com',
//       null
//     )
//   );

//   Amplitude.logEventWithProperties(
//     'Connected with Properties',
//     userState(
//       'testingBasicSetup',
//       null,
//       'conservationist',
//       'testingBasic@gmail.com',
//       null
//     )
//   );
// }

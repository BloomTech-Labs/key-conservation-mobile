import * as Amplitude from 'expo-analytics-amplitude';
import * as SecureStore from 'expo-secure-store';

import React from 'react';
import { getProfileData } from '../store/actions';

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
    console.log('sent event name but no properties');
    Amplitude.logEvent(name);
  } else if (name && properties) {
    if (typeof properties !== 'object' && typeof properties !== 'array') {
      return console.log(
        'You must use the data type of Object for Event Properties'
      );
    }
    console.log('sent name and properties');
    Amplitude.logEventWithProperties(name, properties);
  }
}

let count = 0;

export async function AmpInit() {
  const id = await SecureStore.getItemAsync('id', {});
  if (id) {
    console.log('found their id', id);
    const userData = getProfileData(id, null, true, true);
    const data = await userData();
    if (data) {
      const profileData = {
        campaignsTotal: data.campaigns.length,
        cons_id: data.cons_id,
        email: data.email,
        id: data.id,
        location: data.location,
        org_name: data.org_name,
        roles: data.roles,
        species_and_habitats: data.species_and_habitats,
        sub: data.sub,
        username: data.username
      };
      Amplitude.initialize('fae81e5eeff3b6917f9d76566b67a7da');
      Amplitude.setUserId(`${profileData.id}`);
      const message = {
        details:
          'Local data has been found for the user. Setting their data to user properties.'
      };
      Amplitude.setUserProperties(profileData);
      AmpEvent('User Connection', message);
    }
  }
  if (!id) {
    Amplitude.initialize('fae81e5eeff3b6917f9d76566b67a7da');
    const message = {
      details:
        'There is no local data available for the user on this device. This is there first time using the app on this device, it is their first use with the app, they have logged out and are signing back in, or they are using the guest view to see the Campaings Feed.'
    };
    AmpEvent(`User Connection`, message);
  }
}

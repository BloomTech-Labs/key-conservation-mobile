import * as Amplitude from 'expo-analytics-amplitude';
import * as SecureStore from 'expo-secure-store';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getProfileData } from '../store/actions';

//this function can be imported and is the HOC meaning you can wrap your component with and it will pass down the props which in this case are functions that you can use.
export function withAmplitude(WrappedComponent, isApp) {
  if (isApp) {
    return function(props) {
      const newProps = {
        ...props,
        AmpEvent: AmpEvent,
        AmpUserProps: AmpUserProps
      };
      return <WrappedComponent {...newProps} />;
    };
  }
  return function(props) {
    const userProps = useSelector(state => state.currentUserProfile);
    const newProps = {
      ...props,
      AmpEvent: AmpEvent,
      AmpUserProps: AmpUserProps,
      setAmpId: id => Amplitude.setUserId(`${id}`)
    };
    if (userProps !== null) {
      AmpUserProps(userProps);
    }
    // Wraps the input component in a container, without mutating it. Good!
    return <WrappedComponent {...newProps} />;
  };
}

export function AmpUserProps(properties) {
  if (typeof properties !== 'object') {
    return console.log('Properties need to be an object');
  } else if (properties) {
    Amplitude.setUserProperties(properties);
  }
}
//this is one of the more important functions becasue it will fire off an an event to the amplitude analytics dashboard. this function will automatically know whether you set properties to the event or not.
export function AmpEvent(name, properties) {
  if (!name) {
    return console.log(
      'You need to include a name for your event, and can also send event properties.'
    );
  }

  if (typeof name !== 'string') {
    return console.log('You must use the data type of String for the name');
  }

  if (name && !properties) {
    // console.log('sent event name but no properties', name);
    Amplitude.logEvent(name);
  } else if (name && properties) {
    if (typeof properties !== 'object' && typeof properties !== 'array') {
      return console.log(
        'You must use the data type of Object for Event Properties'
      );
    }
    // console.log('sent name and properties', name, properties);
    Amplitude.logEventWithProperties(name, properties);
  }
}

//AmpInit initalizes the amplitude session for the user based on the subID from their auth0 login.
export async function AmpInit() {
  const id = await SecureStore.getItemAsync('id', {});
  const sub = await SecureStore.getItemAsync('sub', {});
  console.log('****** id from withamplitude', id);
  if (sub === null) {
    console.log('id is null*******');
    await Amplitude.initialize('fae81e5eeff3b6917f9d76566b67a7da');
    Amplitude.clearUserProperties();
    const message = {
      details:
        'There is no local data available for the user on this device. This is there first time using the app on this device, it is their first use with the app, they have logged out and are signing back in, or they are using the guest view to see the Campaings Feed.'
    };
    AmpEvent(`User Connection`, message);
  } else if (sub) {
    //console.log('found their id', id);
    const userData = getProfileData(id, null, true, true);
    const data = await userData();
    if (data) {
      const profileData = {
        campaignsTotal: data.campaigns && data.campaigns.length,
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
      await Amplitude.initialize(
        'fae81e5eeff3b6917f9d76566b67a7da'
      );
      Amplitude.setUserId(`${profileData.id}`);
      const message = {
        details:
          'Local data has been found for the user. Setting their data to user properties.'
      };
      Amplitude.setUserProperties(profileData);
      AmpEvent('User Connection', message);
    }
  }
}

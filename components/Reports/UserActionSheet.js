import React, { forwardRef } from 'react';
import ActionSheet from 'react-native-actionsheet';

import { goBack, navigate } from '../../navigation/RootNavigator';

import { useDispatch } from 'react-redux';

import { deactivateUser } from '../../store/actions';
import { Alert } from 'react-native';

// Usage:

// To define
/*
...
  <ActionSheet
    ref={o => this.ActionSheet = o}
    admin={boolean}
    userId={id}
  />
...
*/

// To show
/*
...
  this.ActionSheet.show();
...
*/

export default forwardRef((props, ref) => {

  const dispatch = useDispatch();

  const report = () => {
    if(!props.userId) {
      console.warn('UserActionSheet: userId prop not found - action canceled');
      return;
    }
    // Take the user to a report screen
  }

  const deactivate = () => {
    if(!props.userId) {
      console.warn('UserActionSheet: userId prop not found - action canceled');
      return;
    }
    dispatch(deactivateUser(props.userId)).then(() => {
      Alert.alert("Deactivated successfully!");
      goBack();
    });
  }

  // Options for actions to take on a user differ
  // for admins and regular users, so we use this
  // constant to initialize those options
  const ACTIONSHEET_OPTIONS = props.admin ? {
    title: 'Admin Controls',
    options: ['Deactivate User', 'Report', 'Cancel'],
    cancelIndex: 2,
    destructiveIndex: 0,
    onPress: (index) => {
      switch(index) {
        case 0: {
          deactivate();
          break;
        }
        case 1: {
          report();
          break;
        }
      }
    }
  } : {
    title: 'Actions',
    options: ['Report', 'Cancel'],
    cancelIndex: 1,
    destructiveIndex: 0,
    onPress: (index) => {
      switch(index) {
        case 0: {
          report();
          break;
        }
      }
    }
  }

  return (
    <ActionSheet
      ref={ref}
      title={ACTIONSHEET_OPTIONS.title}
      options={ACTIONSHEET_OPTIONS.options}
      cancelButtonIndex={ACTIONSHEET_OPTIONS.cancelIndex}
      destructiveButtonIndex={ACTIONSHEET_OPTIONS.destructiveIndex}
      onPress={ACTIONSHEET_OPTIONS.onPress}
    />
  );
});

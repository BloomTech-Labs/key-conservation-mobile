import React, { forwardRef } from 'react';
import ActionSheet from 'react-native-actionsheet';

import { goBack, navigate } from '../../navigation/RootNavigator';

import { useDispatch } from 'react-redux';

import { deleteCampaign, deleteCampaignUpdate, setCampaign } from '../../store/actions';
import { Alert } from 'react-native';

// Usage:

// To define
/*
...
  <ActionSheet
    ref={o => this.ActionSheet = o}
    admin={boolean}
    camp={object}                   // The campaign data
    OPTIONAL: goBack={boolean}      // Do we need to navigate back?
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
    const id = props.camp?.camp_id || props.update?.update_id;

    if(typeof id === 'undefined') {
      console.warn(
        'CampaignActionSheet: `camp` or `update` property missing or invalid - action canceled'
      );
      return;
    }

    dispatch(setCampaign(props.camp || props.update));
    
    const type = props.camp ? 'campaigns' : 'campaign_updates';

    // Take the user to a report screen
    navigate('CreateReport', {
      type,
      id
    });
  };

  const deleteCamp = () => {
    const id = props.camp?.camp_id || props.update?.update_id;
    if(typeof id === 'undefined') {
      console.warn(
        'CampaignActionSheet: `camp` or `update` property missing or invalid - action canceled'
      );
      return;
    }

    let del;

    if (props.camp) {
      del = deleteCampaign;
    } else if (props.update) {
      del = deleteCampaignUpdate;
    }

    dispatch(del(id)).then(() => {
      Alert.alert('Deleted successfully!');
      if (props.goBack) goBack();
    });
  };

  const editCamp = () => {
    navigate('EditCamp', {
      selectedCampaign: props.camp
    })
  }

  const editUpdate = () => {
    navigate('EditCampUpdate', {
      selectedCampaign: props.update
    })
  }

  const postUpdate = () => {
    navigate('CreateCampUpdate', {
      selectedCampaign: props.camp || props.update
    })
  }

  // Options for actions to take on a campaign differ
  // for admins and regular users, so we use this
  // constant to initialize those options
  const ACTIONSHEET_OPTIONS = props.isMine
    ? {
        title: 'Actions',
        options: ['Delete', 'Edit', 'Post Update', 'Cancel'],
        cancelIndex: 3,
        destructiveIndex: 0,
        onPress: index => {
          switch(index) {
            case 0: {
              deleteCamp();
              break;
            }
            case 1: {
              if(props.camp) {
                editCamp();
              } else if (props.update) {
                editUpdate();
              }
              break;
            }
            case 2: {
              postUpdate();
              break;
            }
          }
        }
      }
    : props.admin
    ? {
        title: 'Admin Controls',
        options: ['Delete', 'Report', 'Cancel'],
        cancelIndex: 2,
        destructiveIndex: 0,
        onPress: index => {
          switch (index) {
            case 0: {
              deleteCamp();
              break;
            }
            case 1: {
              report();
              break;
            }
          }
        }
      }
    : {
        title: 'Actions',
        options: ['Report', 'Cancel'],
        cancelIndex: 1,
        destructiveIndex: 0,
        onPress: index => {
          switch (index) {
            case 0: {
              report();
              break;
            }
          }
        }
      };

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

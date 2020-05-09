import React, { forwardRef } from 'react';
import ActionSheet from 'react-native-actionsheet';

import { goBack, navigate } from '../../navigation/RootNavigator';

import { useDispatch } from 'react-redux';

import { deleteCampaignPost, setCampaign } from '../../store/actions';

// Usage:

// To define
/*
...
  <ActionSheet
    ref={o => this.ActionSheet = o}
    admin={boolean}
    post={object}                   // The campaign post data
    OPTIONAL: goBack={boolean}      // Do we need to navigate back?
  />
...
*/

// To show
/*
...
  this.ActionSheet.current?.show();
...
*/

export default forwardRef((props, ref) => {
  const dispatch = useDispatch();

  const report = () => {
    const id = props.campaign?.id || props.update?.id;

    if (typeof id === 'undefined') {
      console.warn(
        'CampaignActionSheet: `campaign` or `update` property missing or invalid - action canceled'
      );
      return;
    }

    dispatch(setCampaign(props.campaign || props.update));

    const type = props.campaign ? 'campaigns' : 'campaign_updates';

    // Take the user to a report screen
    navigate('CreateReport', {
      type,
      id,
    });
  };

  const deletePost = () => {
    const id = post?.id;
    console.log(props.post);
    if (typeof id === 'undefined') {
      console.warn(
        'CampaignActionSheet: `post` property missing or invalid - action canceled'
      );
      return;
    }

    dispatch(deleteCampaignPost(id)).finally(() => {
      if (props.goBack) goBack();
    });
  };

  const editCampaign = () => {
    navigate('EditCampaign', {
      selectedCampaign: props.post,
    });
  };

  const editUpdate = () => {
    navigate('EditCampaignUpdate', {
      selectedCampaign: props.post,
    });
  };

  const postUpdate = () => {
    navigate('CreateCampaignUpdate', {
      selectedCampaign: props.post,
    });
  };

  // Options for actions to take on a campaign differ
  // for admins and regular users, so we use this
  // constant to initialize those options
  const ACTIONSHEET_OPTIONS =
    props.isMine && props.post?.is_update
      ? {
          title: 'Actions',
          options: ['Delete', 'Edit', 'Cancel'],
          cancelIndex: 2,
          destructiveIndex: 0,
          onPress: (index) => {
            switch (index) {
              case 0: {
                deletePost();
                break;
              }
              case 1: {
                if (props.campaign) {
                  editCampaign();
                } else if (props.update) {
                  editUpdate();
                }
                break;
              }
            }
          },
        }
      : props.isMine
      ? {
          title: 'Actions',
          options: ['Delete', 'Edit', 'Post Update', 'Cancel'],
          cancelIndex: 3,
          destructiveIndex: 0,
          onPress: (index) => {
            switch (index) {
              case 0: {
                deletePost();
                break;
              }
              case 1: {
                if (props.campaign) {
                  editCampaign();
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
          },
        }
      : props.admin
      ? {
          title: 'Admin Controls',
          options: ['Delete', 'Report', 'Cancel'],
          cancelIndex: 2,
          destructiveIndex: 0,
          onPress: (index) => {
            switch (index) {
              case 0: {
                deletePost();
                break;
              }
              case 1: {
                report();
                break;
              }
            }
          },
        }
      : {
          title: 'Actions',
          options: ['Report', 'Cancel'],
          cancelIndex: 1,
          destructiveIndex: 0,
          onPress: (index) => {
            switch (index) {
              case 0: {
                report();
                break;
              }
            }
          },
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

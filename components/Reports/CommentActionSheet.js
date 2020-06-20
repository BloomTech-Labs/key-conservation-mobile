import React, { forwardRef } from 'react';
import ActionSheet from 'react-native-actionsheet';

import { navigate } from '../../navigation/RootNavigator';

import { useDispatch } from 'react-redux';

import { deleteComment } from '../../store/actions';
import { Alert } from 'react-native';

// Usage:

// To define
/*
...
  <ActionSheet
    ref={o => this.ActionSheet = o}
    admin={boolean}
    commentId={id}
    post={object}                   // The post data
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
    if (!props.commentId) {
      console.warn(
        'CommentActionSheet: commentId prop not found - action canceled'
      );
      return;
    }

    // Take the user to a report screen
    navigate('CreateReport', {
      type: 'comments',
      postId: props.postId,
      id: props.commentId,
    });
  };

  const deleteCom = () => {
    if (!props.commentId) {
      console.warn(
        'CommentActionSheet: commentId prop not found - action canceled'
      );
      return;
    }
    props.onDelete?.();
    dispatch(deleteComment(props.commentId)).then((err) => {
      if (err) {
        Alert.alert('Failed to delete comment');
        props.onDelete?.(true);
      }
    });
  };

  // Options for actions to take on a comment differ
  // for admins and regular users, so we use this
  // constant to initialize those options
  const ACTIONSHEET_OPTIONS = props.isMine
    ? {
        title: 'Actions',
        options: ['Delete comment', 'Cancel'],
        cancelIndex: 1,
        destructiveIndex: 0,
        onPress: (index) => {
          switch (index) {
            case 0: {
              deleteCom();
              break;
            }
          }
        },
      }
    : props.admin
    ? {
        title: 'Admin Controls',
        options: ['Delete comment', 'Report', 'Cancel'],
        cancelIndex: 2,
        destructiveIndex: 0,
        onPress: (index) => {
          switch (index) {
            case 0: {
              deleteCom();
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

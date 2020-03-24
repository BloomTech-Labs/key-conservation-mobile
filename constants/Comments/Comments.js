import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  commentWrapper: {
    flexDirection: 'column',
    flex: 1
  },
  commentView: {
    flex: 1,
    flexDirection: 'row'
  },
  feedCommentWrapper: {
    flexDirection: 'column',
    width: '90%',
    marginTop: 5
  },
  commentButton: {
    color: 'grey',
    fontSize: 18,
    fontFamily: 'Lato',
    minHeight: '100%',
    paddingTop: 8,
    marginLeft: 12
  },
  replyView: {
    flexDirection: 'row',
    marginTop: 20
  },
  name: {
    paddingBottom: 3,
    marginTop: 5,
    fontFamily: 'Lato-Bold'
  },
  commentBody: {
    marginLeft: 7,
    flex: 1
  },
  commentOptions: {
    transform: [{ rotate: '90deg' }],
    padding: 8,
    alignSelf: 'center'
  },
  commentText: {
    flexDirection: 'column',
    width: 300,
    fontFamily: 'Lato-Bold'
  },
  input: {
    color: 'grey',
    minHeight: 40,
    // paddingTop: 7,
    // padding: 5,
    borderRadius: 5,
    fontSize: 18,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 20,
    width: '75%'
  },
  inputWrapper: {
    flexDirection: 'row',
    height: '70%',
    marginLeft: 6,
    borderRadius: 5,
    backgroundColor: '#f5f5f5'
  },
  interaction: {
    flexDirection: 'row',
    marginBottom: 15
  },
  timeText: {
    color: '#929292',
    fontSize: 10,
    marginLeft: 43,
    marginRight: 15,
    marginTop: 10
  },
  deleteText: {
    fontSize: 10,
    marginRight: 15,
    marginTop: 10
  },
  avatar: {
    marginTop: 5
  },
  feedAvatar: {
    marginTop: 8
  },
  replyAvatar: {
    marginTop: 7
  },
  confirmation: {
    flexDirection: 'row'
  },
  confirmText: {
    color: '#ff0a55',
    fontSize: 12,
    marginRight: 15,
    marginTop: 7
  },
  confirmNo: {
    color: '#00FF9D',
    fontSize: 12,
    marginRight: 10,
    marginTop: 7
  },
  indicator: {
    flex: 1,
    justifyContent: 'center'
  },
  moreContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  more: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 28,
    width: 243
  },
  moreText: {
    fontSize: 14,
    fontFamily: 'Lato',
    color: 'black'
  },
  icon: {
    fontSize: 30,
    marginTop: 9,
    color: '#7B7D88'
  }
});

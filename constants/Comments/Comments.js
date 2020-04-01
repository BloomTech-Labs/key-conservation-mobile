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
    fontSize: 17,
    fontFamily: 'Lato',
    minHeight: '100%',
    paddingTop: 8,
    marginLeft: 12
  },
  replyView: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
    paddingTop: 10
  },
  name: {
    paddingBottom: 3,
    marginTop: 5,
    fontFamily: 'Lato-Bold'
  },
  commentBody: {
    marginLeft: 7,
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingLeft: 5
  },
  commentOptions: {
    transform: [{ rotate: '180deg' }],
    padding: 8,
    alignSelf: 'center'
  },
  commentText: {
    flexDirection: 'column',
    width: 300,
    fontFamily: 'Lato-Bold'
  },
  input: {
    minHeight: 40,
    borderRadius: 5,
    fontSize: 17,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 20,
    width: '75%'
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: '70%',
    marginLeft: 6,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
    width: '85%'
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
    fontSize: 13,
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
    // marginTop: 7
  },
  confirmation: {
    flexDirection: 'row'
  },
  confirmText: {
    color: '#ff0a55',
    fontSize: 13,
    marginRight: 15,
    marginTop: 7
  },
  confirmNo: {
    color: '#00FF9D',
    fontSize: 13,
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
    alignItems: 'center',
    paddingBottom: 20
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
    fontSize: 15,
    fontFamily: 'Lato',
    color: 'black'
  },
  icon: {
    fontSize: 30,
    marginTop: 9,
    color: '#7B7D88'
  }
});

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  commentWrapper: {
    flexDirection: 'column',
    flex: 1,
    width: '100%',
  },
  commentView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
  },
  commentButton: {
    color: 'grey',
    fontSize: 17,
    fontFamily: 'Lato',
    minHeight: '100%',
    paddingTop: 10,
    marginLeft: 7,
  },
  replyView: {
    flexDirection: 'row',
    width: '100%',
  },
  name: {
    paddingBottom: 3,
    marginTop: 3,
    fontFamily: 'Lato-Bold',
  },
  commentBody: {
    marginLeft: 7,
    marginTop: 3,
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingLeft: 5,
    borderRadius: 10,
    paddingTop: 3,
    paddingBottom: 5,
    paddingRight: 5,
  },
  commentOptions: {
    transform: [{ rotate: '180deg' }],
    padding: 8,
    alignSelf: 'center',
  },
  commentText: {
    flexDirection: 'column',
    fontFamily: 'Lato-Bold',
  },
  input: {
    justifyContent: 'center',
    minHeight: 40,
    borderRadius: 5,
    fontSize: 16,
    marginRight: 5,
    marginBottom: 20,
    paddingTop: 12,
    width: '78%',
  },
  inputWrapper: {
    marginTop: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    height: '70%',
    marginLeft: 6,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
    width: '84%',
  },
  interaction: {
    flexDirection: 'row',
    marginBottom: 15,
    marginLeft: 50,
  },
  timeText: {
    color: '#929292',
    fontSize: 10,
    marginTop: 5,
  },
  deleteText: {
    fontSize: 13,
    marginRight: 15,
    marginTop: 10,
  },
  avatar: {
    marginTop: 5,
  },
  feedAvatar: {
    marginTop: 8,
  },
  replyAvatar: {},
  confirmation: {
    flexDirection: 'row',
  },
  confirmText: {
    color: '#ff0a55',
    fontSize: 13,
    marginRight: 15,
    marginTop: 7,
  },
  confirmNo: {
    color: '#00FF9D',
    fontSize: 13,
    marginRight: 10,
    marginTop: 7,
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
  },
  moreContainer: {
    flex: 1,
    padding: 15,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontSize: 18,
  },
  moreText: {
    color: '#323339',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Lato-Bold',
  },
  icon: {
    fontSize: 30,
    marginTop: 9,
    color: '#7B7D88',
  },
  commentsEmpty: {
    color: 'gray',
    textAlign: 'center',
    padding: 16,
    backgroundColor: '#F0F0F0'
  }
});

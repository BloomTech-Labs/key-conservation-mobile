import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 2,
    marginTop: 200,
  },
  bigContainer:{
    flexDirection: 'column',
    flex:1
  },
  itemContainers: {
    flexDirection: 'column',
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8
  },
  itemContentBody: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemTitleRow: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'stretch',
    paddingLeft: 5,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  itemContentTitle:{
    fontSize: 17,
    marginLeft: 7,
    textAlign: 'left',
    fontFamily: 'Lato-Bold',
    alignSelf: 'flex-start',
    paddingTop:5
  },
  itemContentRows: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'stretch',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 10,
    paddingBottom: 5,
  },
  itemFooterRow: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'stretch',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  itemTitleText: {
    fontSize: 17,
    marginLeft: 7,
    textAlign: 'left',
    fontFamily: 'Lato-Bold',
    alignSelf: 'flex-start',
  },
  buttonSelectedContainer:{
    height: 28,
    borderRadius: 4,
    marginLeft: 7,
    paddingHorizontal:10,
    backgroundColor: '#00FF9D',
    justifyContent: 'center',
  },
  buttonSelectedText:{
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
    letterSpacing: 1,
    textAlign: 'center',
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 8
  },
  chevronArrowContainer: {
    marginLeft: 'auto',
  },
  fullWidthButtonContainer: {
    padding: 15,
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
  },
  fullWidthButton: {
    width: '95%',
    flex: 1,
    height: 48,
    backgroundColor: '#31ffa5',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    textAlign: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: {
      height: 4,
    },
    shadowRadius: 5,
    shadowOpacity: 10,
  },
  buttonTextPlusIcon: {
    fontSize: 25,
    width: '15%',
    color: '#30d985',
  },
  mediumButtonText: {
    fontSize: 14,
  },
  responsiveButton: {
    height: 34,
    backgroundColor: '#f2f2f2',
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    textAlign: 'center',
    shadowColor: 'rgba(0, 0, 0, 0)',
    shadowOffset: {
      height: 4,
    },
    shadowRadius: 5,
    shadowOpacity: 10,
  },
  skillsButton: {
    height: 34,
    backgroundColor: '#31ffa5',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    marginRight: 4,
    marginBottom: 4,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: 'center',
    shadowColor: 'rgba(0, 0, 0, 0)',
    shadowOffset: {
      height: 4,
    },
    shadowRadius: 5,
    shadowOpacity: 10,
  },
  buttonText: {
    color: '#323339',
    textTransform: 'uppercase',
    fontSize: 17,
    textAlign: 'center',
    fontFamily: 'Lato-Bold',
  },
  reachMeText: {
    color: '#323339',
    width: '70%',
  },
  reachMeSwitch: {
    marginLeft: 'auto',
  },
  avatarImageContainer: {
    alignSelf: 'flex-start',
    width:"12%",
    flexDirection:'row'
  },
  campaignRightContainer: {
    width: '78%',
    marginLeft: 'auto',
  },
  elementLeftContainer:{
    alignSelf: 'flex-start',
    width:'15%'
  },
  elementRightContainer:{
    width: '85%',
    marginLeft: 'auto',
  },
  campaignOrganizationName: {
    fontSize: 16,
    fontFamily: 'Lato',
    width: '90%',
  },
  campaignRow: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 3,
  },
  campaignRowFooter: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  openTag: {
    height: 34,
    width: 80,
    backgroundColor: 'rgba(202,255,0, 0.7)',
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    textAlign: 'center',
    shadowColor: 'rgba(0, 0, 0, 0)',
    shadowOffset: {
      height: 4,
    },
    shadowRadius: 5,
    shadowOpacity: 10,
  },
  closeTag: {
    height: 34,
    width: 80,
    backgroundColor: '#E31059',
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    textAlign: 'center',
    shadowColor: 'rgba(0, 0, 0, 0)',
    shadowOffset: {
      height: 4,
    },
    shadowRadius: 5,
    shadowOpacity: 10,
  },
  closeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  intervalPostedText: {
    color: '#b6b9bc',
    fontSize: 12,
  },
  itemBodyText:{
    color: '#ADADAD',
    fontSize: 16,
    fontFamily: 'Lato',
  },
  skillButtonText:{
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
    letterSpacing: 1,
    textAlign: 'center',
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 13
  },
  textInput:{
    flex: 1,
    height: 34,
    backgroundColor: '#F5F5F5',
    padding: 8,
    borderRadius: 5,
    fontSize: 16,
    marginTop:4,
    textAlignVertical : "top"
  },
  addGoalButton:{
    flex: 1,
    height: 34,
    backgroundColor: '#F5F5F5',
    color: '#ADADAD',
    padding: 8,
    borderRadius: 5,
    fontSize: 16,
    marginTop:4
  },
  textBox:{
    flex: 1,
    height: 120,
    backgroundColor: '#F5F5F5',
    padding: 8,
    borderRadius: 5,
    fontSize: 16,
    textAlignVertical : "top"
  },
  goalDescriptionBox:{
    flex: 1,
    height: 120,
    backgroundColor: '#F5F5F5',
    padding: 8,
    borderRadius: 5,
    fontSize: 16,
    marginTop:6,
    textAlignVertical : "top"
  },
  itemContentIconContainer:{
    marginRight:5,
    height:'100%',
    width: 40,
  },
  leftLine:{
    height:164,
    width:3,
    backgroundColor:'#D7FF43'
  },
  leftLineAddGoal:{
    height:40,
    width:3,
    backgroundColor:'#D7FF43'
  },
  plusSign:{
    alignSelf:'center',
    marginTop:5,
  },
  rightEllipseContainer:{
    flex:1,
    flexDirection:"column"
  },
  ellipseIndicator:{
    marginTop:5,
    marginLeft:10,
    width:30,
    height:30,
    borderWidth:2,
    borderRadius: 15
  }
});
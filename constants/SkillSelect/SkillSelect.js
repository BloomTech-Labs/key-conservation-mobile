const buttonContainer = {
  height: 35,
  flexDirection: 'column',
  flexWrap: 'nowrap',
  marginHorizontal: 3,
  marginVertical: 5,
  padding: 10,
  borderRadius: 4,
  backgroundColor: '#00FF9D',
  justifyContent: 'center',
};

export default {
  list: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  unselectedContainer: {
    ...buttonContainer,
    backgroundColor: '#F5F5F5'
  },
  selectedContainer: {
    ...buttonContainer,
    backgroundColor: '#00FF9D'
  },
  text: {
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
    letterSpacing: 1,
    textAlign: 'center',
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 13
  },
  otherSkillContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    marginTop: 15,
    padding: 15
  },
  otherSkillLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  otherSkillTitleContainer: {
    flex: 1,
    height: 35,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  otherSkillText: {
    marginLeft: 5,
    flex: 5,
    fontFamily: 'Lato',
    fontSize: 16,
  },
  inputField: {
    height: 35,
    backgroundColor: '#FFFFFF',
    padding: 5,
    borderRadius: 5,
    fontSize: 20,
    marginHorizontal: 'auto',
    marginTop: 15
  }
}
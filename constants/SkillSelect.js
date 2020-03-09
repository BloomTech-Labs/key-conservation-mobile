const buttonContainer = {
  height: 40,
  flexDirection: 'column',
  flexWrap: 'nowrap',
  margin: 5,
  padding: 10,
  borderRadius: 4,
  backgroundColor: '#00FF9D',
  justifyContent: 'center',
};

export default {
  list: {
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
  }
}

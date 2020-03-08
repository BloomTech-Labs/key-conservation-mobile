const buttonContainer = {
  width: '30%',
  height: 30,
  marginBottom: 18,
  borderRadius: 4,
  fontFamily: 'Lato',
  justifyContent: 'center'
};

export default {
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
    letterSpacing: 1,
    textAlign: 'center',
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 13
  }
}

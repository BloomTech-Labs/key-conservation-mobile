import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  buttonContainer: {
    marginTop: 3.5,
    flex: 1,
    padding: 15,
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
  },
  buttonTouch: {
    width: '100%',
    height: 48,
    backgroundColor: '#00ff9d',
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
  button_label: {
    color: '#323339',
    textTransform: 'uppercase',
    letterSpacing: 1.8,
    fontSize: 17,
    textAlign: 'center',
    fontFamily: 'Lato-Bold',
  },
  taking_action_container: {
    paddingHorizontal: 15,
  },
  section_container: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  section_icon: {

    paddingRight: 5,
    opacity: .85
  },
  section_title: {
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    paddingBottom: 5
  },
  section_text: {
    fontFamily: 'Lato',
    fontSize: 15,
    marginRight: 55,
  },
  action_container: {
    paddingTop: 20
  }
});

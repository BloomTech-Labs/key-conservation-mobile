import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    overflow: 'visible',
  },
  header: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 32
  },
  header2: {
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    fontSize: 22,
    marginBottom: 28
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'gray',
    marginRight: 16
  },
  report_info: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 32
  },
  text_data: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  username: {
    fontWeight: 'bold'
  },
  sublabel: {
    alignSelf: 'center',
    width: '96%',
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 12
  },
  picker_container: {
    width: '96%',
    alignSelf: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginVertical: 8,
    borderColor: 'gray'
  },
  report_button: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignSelf: 'center',
    width: '96%',
    height: 50,
    marginBottom: 18,
    borderRadius: 5,
    fontFamily: 'Lato',
    backgroundColor: '#F4F5F7',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      height: 4
    },
    shadowRadius: 4,
    shadowOpacity: 10,
    justifyContent: 'center'
  },
  button_label: {
    fontFamily: 'Lato-Bold',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20
  },
});
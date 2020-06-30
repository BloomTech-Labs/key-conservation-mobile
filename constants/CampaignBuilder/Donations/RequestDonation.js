import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  description: {
    marginBottom: 16,
  },
  subheader: {
    fontSize: 18,
    fontFamily: 'Lato-Bold',
    marginBottom: 8,
  },
  goals: {
    flex: 1,
    flexDirection: 'column',
  },
  textInput: {
    flex: 1,
    height: 34,
    backgroundColor: '#F5F5F5',
    padding: 8,
    borderRadius: 5,
    fontSize: 16,
    marginTop: 4,
    textAlignVertical: 'top',
  },
  bullet: {
    width: 20,
    height: 20,
    marginRight: 8,
    marginTop: 8,
    borderRadius: 50,
    backgroundColor: '#00FF9D',
  },
  donationGoal: {
    flexDirection: 'row',
  },
  plusSign: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginRight: 8,
    width: 30,
    height: 30,
    borderWidth: 2,
    borderRadius: 15,
  },
  addButton: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    fontFamily: 'Lato-Bold',
    fontSize: 15,
  },
  inputs: {
    flex: 1,
    flexDirection: 'column',
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldLabel: {
    fontFamily: 'Lato-Bold',
  },
  noGoalsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  noGoalsText: {
    color: 'gray',
  },
});

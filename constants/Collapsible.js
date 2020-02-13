import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginVertical: 12,
    borderRadius: 8,
    overflow: 'hidden'
  },
  title_bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8
  },
  right_content: {
    flex: 0.5
  },
  title: {
    flex: 2,
    padding: 10,
    fontWeight: 'bold',
    fontSize: 16
  },
  arrow: {
    flex: 1,
    width: null,
    height: null
  },
  arrowContainer: {
    width: 30,
    height: 30,
    alignItems: 'center'
  },
  content: {
    padding: 8,
    paddingTop: 8,
    overflow: 'hidden'
  }
});

export default styles;

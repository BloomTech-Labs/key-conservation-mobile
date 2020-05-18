import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '95%',
    borderWidth: 0,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    marginTop: 10,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 10,
  },
  logo: {
    marginLeft: 8,
  },
  title_bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  right_content: {
    flex: 0.5,
  },
  title: {
    flex: 2,
    padding: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  arrow: {
    flex: 1,
    width: null,
    height: null,
  },
  arrowContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
  },
  content: {
    padding: 8,
    paddingTop: 8,
    overflow: 'hidden',
  },
});

export default styles;

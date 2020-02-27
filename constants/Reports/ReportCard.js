import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  reportCard: {
    flex: 1,
    flexDirection: 'row',
    height: 48,
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  imageContainer: {
    height: 48,
    width: 48
  },
  image: {
    flex: 1,
    borderRadius: 40,
    height: null,
    width: null
  },
  reportInfo: {
    marginHorizontal: 6
  },
  reportName: {
    fontSize: 16
  },
  reportType: {
    fontSize: 12,
    color: 'grey'
  },
  reportCount: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  arrowContainer: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  flagIcon: {
    marginRight: 2
  },
  unique_reports: {
    fontWeight: 'bold',
    marginHorizontal: 6
  },
  arrowIcon: {
    transform: [{ rotateZ: '180deg' }],
    paddingVertical: 18,
    paddingHorizontal: 4,
    alignSelf: 'center'
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  right: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  }
});

export default styles;
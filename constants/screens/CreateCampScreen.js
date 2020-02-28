export default {
  container: {
    flex: 1,
    padding: 8,
  },
  sectionContainer: {
    flexDirection: 'column',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8
  },
  mediaSection: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 8,
    paddingTop: 18,
    alignItems: 'center'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomColor: '#f5f5f5',
    paddingLeft: 10,
    paddingRight: 10,
    height: 75
  },
  ButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#eee',
    marginTop: 12,
    marginBottom: 12,
    flex: 1
  },
  CancelButton: {
    fontSize: 16,
    color: 'black'
  },
  PublishButton: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold'
  },
  camera: {
    backgroundColor: '#C4C4C4',
    width: '100%',
    height: 150,
    flexDirection: 'row'
  },
  CameraContainerButton: {
    marginTop: 120,
    marginRight: 10,
    marginLeft: 10
  },
  inputContain: {
    height: 48,
    borderWidth: 2,
    borderColor: '#C4C4C4',
    padding: 5,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 25
  },
  inputContain2: {
    height: 140,
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 25,
    textAlignVertical: 'top'
  },
  sectionsText: {
    lineHeight: 22,
    fontSize: 16,
    fontFamily: 'Lato-Bold',
    marginBottom: 5
  },
  bodyText: {
    lineHeight: 19,
    fontSize: 14,
    fontFamily: 'Lato',
    color: '#323339',
    textAlign: 'left'
  },
  urgencyText: {
    lineHeight: 19,
    fontSize: 14,
    fontFamily: 'Lato',
    color: '#323339',
    textAlign: 'left',
    paddingLeft: 15
  },
  urgencyMenu: {
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10
  },
  checkMark: {
    height: 20,
    width: 20,
    marginTop: 4,
    marginLeft: 4
  },
  urgencyOption: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingVertical: 13,
    paddingHorizontal: 10,
    margin: 'auto'
  },
  criticalUrgency: {
    color: '#000',
    backgroundColor: '#E31059',
    fontSize: 16,
    fontFamily: 'Lato-Bold',
    textTransform: 'uppercase',
    height: 35,
    width: '100%',
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 5
  },
  urgentUrgency: {
    color: '#000',
    backgroundColor: '#FFC700',
    fontSize: 16,
    fontFamily: 'Lato-Bold',
    textTransform: 'uppercase',
    height: 35,
    width: '100%',
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 5
  },
  longtermUrgency: {
    color: '#000',
    backgroundColor: '#00FF9D',
    fontSize: 16,
    fontFamily: 'Lato-Bold',
    textTransform: 'uppercase',
    height: 35,
    width: '100%',
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 5
  },
  indicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
};

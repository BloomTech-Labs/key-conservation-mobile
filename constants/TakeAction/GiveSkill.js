import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  header_container: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  header_icon: {
    paddingLeft: 15,
    paddingRight: 5,
    opacity: .85
  },
  header_title: {
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    paddingBottom: 5
  },
  header_text: {
    fontFamily: 'Lato',
    fontSize: 15,
    marginRight: 50,
  },
  skill_bubble_container: {
    flexDirection: 'row'
  },
  skill_bubble: {
    marginTop: 7,
    marginRight: 5,
    justifyContent:"center",
    alignItems:'center',
    borderColor: "#3fffb5",
    borderWidth: 3,
    borderRadius: 30
  },
  skill_label: {
    textTransform: 'uppercase',
    paddingVertical: 1,
    paddingHorizontal: 7,
    fontSize: 15
  },
  needed_skills_card: {
    marginLeft: 46,
    marginRight: 20,   
  },
  skill_needed_header: {
    fontSize: 17,
    fontFamily: 'Lato-Bold',
    marginTop: 11,
    marginRight: 5
  },
  section_header: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  arrow_container: {
    position: 'absolute',
    right: 0
  },
  project_goal_title_container: {
    justifyContent: 'center',
    marginLeft: 5
  },
  project_goal_title: {
    fontFamily: 'Lato-Bold',
    fontSize: 15
  },
  goal_container: {
    borderLeftWidth: 4,
    borderColor: '#caff00',
    paddingLeft: 10,
    flexDirection: 'row',
  },
  goal_description_container: {
    marginLeft: 7
  },
  goal_title: {
    fontWeight: 'bold',
  },
  goal_text: {
    marginTop: 2,
    opacity: .65
  },
  buttonTouch: {
    marginTop: 20,
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
  }
});
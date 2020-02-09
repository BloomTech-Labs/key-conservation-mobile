import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  report_details: {},
  post_preview: {
    borderBottomWidth: 1,
    marginBottom: 8,
    padding: 8,
    paddingTop: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  detail_section: {},
  mini_header: {
    color: 'gray',
    fontSize: 11
  },
  detail_field: {
    flexDirection: 'row',
    padding: 8
  },
  text_label: {
    flex: 1
  },
  user_link: {
    fontWeight: 'bold',
    color: 'dodgerblue'
  },
  touch_op: {
    flex: 1
  },
  timestamp: {
    flex: 1,
    color: 'gray',
    textAlign: 'right',
    paddingVertical: 3
  },
  text_content_container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  text_content: {
    flex: 1,
    fontWeight: 'bold'
  },
  delete_button: {
    fontSize: 16,
    color: 'crimson'
  },
  image_content_container: {
    marginRight: 16,
    width: 70,
    height: 70
  },
  image_content: {
    backgroundColor: 'gray',
    width: null,
    height: null,
    flex: 1
  },
  report_count: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  flag_icon: {
    marginRight: 2
  },
  unique_reports: {
    fontWeight: 'bold',
    marginHorizontal: 6
  }
});

export default styles;

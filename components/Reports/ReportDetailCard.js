//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Collapsable from '../Collapsable';

import moment from 'moment';

// create a component
class ReportDetailCard extends Component {
  render() {
    let type;
    switch (this.props.currentReport?.table_name) {
      case 'campaignUpdates':
        type = 'Campaign';
        break;
      case 'campaigns':
        type = 'Campaign';
        break;
      case 'comments':
        type = 'Comment';
        break;
      case 'users':
        type = 'User Profile';
        break;

      default:
        type = this.props.currentReport?.table_name;
    }

    const timestamp = `Reported on ${moment(
      this.props.currentReport?.reported_at
    ).format('lll')}`;

    return (
      <Collapsable
        title={`#${this.props.currentReport?.id || '---'}: ${type || '---'}`}
        collapsed={this.props.collapsed}
      >
        <View style={styles.report_details}>
          {this.currentReport?.table_name === 'users' ? null : (
            <View style={styles.detail_section}>
              <Text style={styles.mini_header}>REPORT DETAILS</Text>
              <View style={styles.detail_field}>
                <Text style={styles.text_label}>Description</Text>
                <Text style={styles.text_label}>
                  {this.props.currentReport?.report_desc || '---'}
                </Text>
              </View>
              <View style={styles.detail_field}>
                <Text style={styles.text_label}>Reported By</Text>
                <TouchableOpacity style={styles.touch_op}>
                  <Text style={styles.user_link}>User</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.timestamp}>{timestamp || '---'}</Text>
            </View>
          )}
        </View>
      </Collapsable>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  report_details: {},
  detail_section: {},
  mini_header: {
    color: 'gray',
    fontSize: 12
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
  }
});

//make this component available to the app
export default ReportDetailCard;

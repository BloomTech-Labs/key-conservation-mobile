import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import ThunderIcon from './ThunderIcon';
import GiveSkill from './GiveSkills';

import styles from '../../constants/TakeAction/TakeActionCallToAction';

class TakeActionCallToAction extends React.Component {
  constructor(props) {
    super(props);

    this.data = props.data;
    this.style = props.style;
  }

  state = {
    takingAction: false,
  };

  render() {
    return (
      <React.Fragment>
        {this.data?.skilled_impact_requests && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={
                this.props.style
                  ? [styles.buttonTouch, { ...this.props.style }]
                  : styles.buttonTouch
              }
              onPress={() =>
                this.setState({
                  takingAction: true,
                })
              }
            >
              <Text style={styles.button_label}>Take Action</Text>
            </TouchableOpacity>
          </View>
        )}

        {this.state.takingAction && (
          <View style={styles.taking_action_container}>
            <View style={styles.section_container}>
              <View style={styles.section_icon}>
                <ThunderIcon />
              </View>
              <View>
                <Text style={styles.section_title}>What we need help with</Text>
                <Text style={styles.section_text}>
                  Below are the actionable steps you can take to help this
                  campaign. Select the options to see more details
                </Text>
              </View>
            </View>
            <View style={styles.action_container}>
              <GiveSkill data={this.props.data} />
            </View>
          </View>
        )}
      </React.Fragment>
    );
  }
}

export default TakeActionCallToAction;

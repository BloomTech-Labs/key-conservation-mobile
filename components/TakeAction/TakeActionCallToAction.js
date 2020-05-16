import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import ThunderIcon from './ThunderIcon';
import GiveSkill from './GiveSkills';

import styles from '../../constants/TakeAction/TakeActionCallToAction';

const test_data = [
  {
    skill: 'graphic design',
    goals: []
  },
  {
    skill: 'writing',
    goals: [ 
      {
        title: 'A 1,000 word blog on local fishermen',
        text: 'We would like a 1,000 word blog written up for our email outreach in 2 months. We want the blog to focus on local fishermen and their thoughts on sea tutle conservation.'
      },
      {
        title: 'Interview 3 local fishermen',
        text: 'We wouldlike the interview to showcase 3 native fishermen from different parts of the island. We would like the fishermen to be a part of a wide range of ages and experiences if possible'
      },
      {
        title: 'Open a discussion',
        text: 'Our hope is to help bridge the gap between conservationists and fishermen and help their voices be heard.'
      }
    ]
  }
]

class TakeActionCallToAction extends React.Component {
  constructor(props) {
    super(props);
    
    this.data = props.data;
    this.style = props.style
  }

  state = {
    takingAction: true
  }

  render() {
    return (
      <React.Fragment>
        {this.data.skilled_impact_request_id && 
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={
                this.props.style
                  ? [styles.buttonTouch, { ...this.props.style }]
                  : styles.buttonTouch
              }
              onPress={() => this.setState({
                takingAction: true
              })}
            >
              <Text style={styles.button_label}>Take Action</Text>
            </TouchableOpacity>
          </View>
        }

        {this.state.takingAction &&
          <View>
            <View style={styles.section_container}>
              <View style={styles.section_icon}>
                <ThunderIcon />
              </View>
              <View >
                <Text style={styles.section_title}>What we need help with</Text>
                <Text style={styles.section_text}>Below are the actionable steps you can take to help this campaign. Select the options to see more details</Text>
              </View>
            </View>
            <View style={styles.action_container}>
              <GiveSkill neededSkills={test_data}/>
            </View>
          </View>
        }
      </React.Fragment>
    );
  };
}
  

export default TakeActionCallToAction;

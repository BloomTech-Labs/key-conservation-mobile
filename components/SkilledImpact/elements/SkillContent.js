import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
} from 'react-native';
import styles from '../../../constants/SkilledImpact/SupporterSkilledImpactBody';
import Sync from '../../../assets/jsicons/bottomnavigation/Sync';
import ChevronBottom from '../../../assets/jsicons/miscIcons/ChevronBottom';
import ChevronRight from '../../../assets/jsicons/miscIcons/ChevronRight';
import Skills from '../../../constants/Skills';

import { editProfileData } from '../../../store/actions';
import { connect } from 'react-redux';

class SkillContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: true,
      isAcceptingHelp: props.isAcceptingHelp,
      skills: props.currentUserProfile.skills,
      loading: false,
      userId: props.userId,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.setState({
        skills: this.props.currentUserProfile.skills,
        loading: false,
      });
      console.log('Skills Updated');
    });
  }
  componentWillUnmount() {
    this.focusListener.remove();
  }

  toggleExpand = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  toggleAcceptingHelpSwitch = async () => {
    try {
      await editProfileData(this.state.userId, {
        accepting_help_requests: !this.state.isAcceptingHelp,
      });
      this.setState({
        isAcceptingHelp: !this.state.isAcceptingHelp,
      });
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Failed to change accepting help status');
      this.setState({
        loading: false,
        error: 'Failed to change accepting help status',
      });
    }
  };

  render() {
    return (
      <View style={styles.itemContainers}>
        <TouchableOpacity
          style={styles.itemTitleRow}
          onPress={this.toggleExpand}
        >
          <Sync />
          <Text style={styles.itemTitleText}>My Skills</Text>
          <View style={styles.chevronArrowContainer}>
            {this.state.expanded ? <ChevronBottom /> : <ChevronRight />}
          </View>
        </TouchableOpacity>
        {this.state.expanded ? (
          <View style={styles.itemContentBody}>
            {!this.state.loading && (
              <View style={styles.itemContentRows}>
                {this.state.skills.map((skill, i) => {
                  if (skill) {
                    return (
                      <TouchableOpacity key={i} style={styles.skillsButton}>
                        <Text style={styles.mediumButtonText}>
                          {Skills[skill].toUpperCase()}
                        </Text>
                      </TouchableOpacity>
                    );
                  }
                })}
                <TouchableOpacity
                  style={styles.responsiveButton}
                  onPress={() =>
                    this.props.navigation.navigate('EditSupporterProfile', {
                      goBack: () => this.setState({ loading: true }),
                    })
                  }
                >
                  <Text style={styles.buttonTextPlusIcon}>+</Text>
                  <Text style={styles.mediumButtonText}>ADD A SKILL</Text>
                </TouchableOpacity>
              </View>
            )}
            {this.state.loading && (
              <ActivityIndicator
                style={{ ...styles.itemContentRows, width: '100%' }}
              />
            )}
            <View style={styles.itemFooterRow}>
              <Text style={styles.reachMeText}>
                Conservation organizations and Researchers can contact me about
                my skills
              </Text>
              <Switch
                style={styles.reachMeSwitch}
                trackColor={{ false: '#767577', true: '#00ff9d' }}
                thumbColor={this.state.isAcceptingHelp ? '#fffeff' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={this.toggleAcceptingHelpSwitch}
                value={this.state.isAcceptingHelp}
              />
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  currentUserProfile: state.currentUserProfile,
});
export default connect(mapStateToProps, {
  editProfileData,
})(SkillContent);

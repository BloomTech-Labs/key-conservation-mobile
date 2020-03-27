import React from 'react';
import { TextInput, Text, View } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { editCampaign, getCampaigns } from '../store/actions';
import BackButton from '../components/BackButton';

import DoneButton from '../components/DoneButton';

import styles from '../constants/screens/EditCampScreen';

class EditCampScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Edit Campaign',
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff',
      headerLeft: () => <BackButton navigation={navigation} />,
      headerRight: () => (
        <DoneButton
          navigation={navigation}
          pressAction={navigation.getParam('edit')}
        />
      )
    };
  };

  constructor(props) {
    super(props);

    this.selectedCampaign =
      this.props.navigation.getParam('selectedCampaign') || {};

    this.state = {
      camp_desc: this.selectedCampaign.camp_desc
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({ edit: this.edit });
  }

  edit = async () => {
    if (!this.state.camp_desc) {
      return;
    } else {
      let changes = this.state;
      await this.props.editCampaign(this.selectedCampaign.camp_id, changes);
      this.props.navigation.goBack();
    }
  };

  clearState = () => {
    this.setState({
      camp_name: this.selectedCampaign.camp_name
    });
  };

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <NavigationEvents onDidBlur={this.clearState} />
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>
            Edit "{this.selectedCampaign.camp_name}"
          </Text>

          <View style={styles.sections}>
            <Text style={styles.sectionsText}>Campaign Details</Text>
            <TextInput
              ref={input => {
                this.campDetailsInput = input;
              }}
              returnKeyType="next"
              placeholder={`What's the story?`}
              style={styles.inputContain2}
              onChangeText={text => this.setState({ camp_desc: text })}
              multiline={true}
              value={this.state.camp_desc}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default connect(null, {
  editCampaign,
  getCampaigns
})(EditCampScreen);

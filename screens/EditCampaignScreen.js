import React from 'react';
import { TextInput, Text, View } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { editCampaignPost, getCampaigns } from '../store/actions';
import BackButton from '../components/BackButton';

import DoneButton from '../components/DoneButton';

import styles from '../constants/screens/EditCampaignScreen';

class EditCampaignScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Edit Campaign',
      headerStyle: {
        backgroundColor: '#323338',
      },
      headerTintColor: '#fff',
      headerLeft: () => <BackButton navigation={navigation} />,
      headerRight: () => (
        <DoneButton
          navigation={navigation}
          pressAction={navigation.getParam('edit')}
        />
      ),
    };
  };

  constructor(props) {
    super(props);

    this.selectedCampaign =
      this.props.navigation.getParam('selectedCampaign') || {};

    this.state = {
      description: this.selectedCampaign.description,
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({ edit: this.edit });
  }

  edit = async () => {
    if (!this.state.description) {
      return;
    } else {
      try {
        let changes = this.state;
        await this.props.editCampaignPost(this.selectedCampaign.id, changes);
        this.props.navigation.goBack();
      } catch (err) {
        console.log(err);
      }
    }
  };

  clearState = () => {
    this.setState({
      name: this.selectedCampaign.name,
    });
  };

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <NavigationEvents onDidBlur={this.clearState} />
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>
            Edit "{this.selectedCampaign.name}"
          </Text>

          <View style={styles.sections}>
            <Text style={styles.sectionsText}>Campaign Details</Text>
            <TextInput
              ref={(input) => {
                this.campaignDetailsInput = input;
              }}
              returnKeyType="next"
              placeholder={`What's the story?`}
              style={styles.inputContain2}
              onChangeText={(text) => this.setState({ description: text })}
              multiline={true}
              value={this.state.description}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default connect(null, {
  editCampaignPost,
  getCampaigns,
})(EditCampaignScreen);

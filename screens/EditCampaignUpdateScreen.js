import React from 'react';
import { TextInput, Text, View } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { editCampaignUpdate, getCampaigns } from '../store/actions';
import BackButton from '../components/BackButton';
import DoneButton from '../components/DoneButton';

import styles from '../constants/screens/EditCampaignScreen';

class EditCampaignUpdateScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Edit Update Post',
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
      description: this.selectedCampaign.description
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({ edit: this.edit });
  }

  edit = async () => {
    let changes = this.state;
    await this.props.editCampaignUpdate(this.selectedCampaign.id, changes);
    this.props.navigation.goBack();
  };
  clearState = () => {
    this.setState({
      description: this.selectedCampaign.description
    });
  };
  render() {
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <NavigationEvents onDidBlur={this.clearState} />

        <View style={styles.sectionContainer}>
          <View style={styles.sections}>
            <View style={styles.goToCampaignButton}>
              <Text style={styles.sectionHeader}>Edit update</Text>
            </View>
            <TextInput
              ref={input => {
                this.campaignDetailsInput = input;
              }}
              returnKeyType="next"
              placeholder="Write an update here to tell people what has happened since their donation."
              style={styles.inputContain2}
              onChangeText={text => this.setState({ description: text })}
              multiline={true}
              value={this.state.description}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
const mapStateToProps = state => ({
  currentUserProfile: state.currentUserProfile
});

export default connect(mapStateToProps, {
  editCampaignUpdate,
  getCampaigns
})(EditCampaignUpdateScreen);

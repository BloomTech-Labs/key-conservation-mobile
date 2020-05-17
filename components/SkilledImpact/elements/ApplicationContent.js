import React from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import styles from '../../../constants/SkilledImpact/SupporterSkilledImpactBody';
import ApplicationPage from '../../../assets/jsicons/SkilledImpact/ApplicationPage';
import LargeCrossCircle from '../../../assets/jsicons/SkilledImpact/LargeCrossCircle';
import PlayButton from '../../../assets/jsicons/SkilledImpact/PlayButton';
import StopButton from '../../../assets/jsicons/SkilledImpact/StopButton';
import ChevronBottom from '../../../assets/jsicons/miscIcons/ChevronBottom';
import ChevronRight from '../../../assets/jsicons/miscIcons/ChevronRight';
import ApplicationElement from './ApplicationElement';

class ApplicationContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainExpanded: true,
      noDecisionExpanded: true,
      selectedExpanded: true,
      notSelectedExpanded: true,
    };
    this.noDecisionSubmissions = props.submissions.map(
      (submission) => submission.submission.decision === 'PENDING'
    );
    this.selectedSubmissions = props.submissions.map(
      (submission) => submission.submission.decision === 'ACCEPTED'
    );
    this.notSelectedSubmissions = props.submissions.map(
      (submission) => submission.submission.decision === 'DENIED'
    );
  }

  toggleMainExpand = () => {
    this.setState({ mainExpanded: !this.state.mainExpanded });
  };

  toggleNoDecisionExpand = () => {
    this.setState({ noDecisionExpanded: !this.state.noDecisionExpanded });
  };

  toggleSelectedExpand = () => {
    this.setState({ selectedExpanded: !this.state.selectedExpanded });
  };

  toggleNotSelectedExpand = () => {
    this.setState({ notSelectedExpanded: !this.state.notSelectedExpanded });
  };

  render() {
    return (
      <View style={styles.itemContainers}>
        <TouchableOpacity
          style={styles.itemTitleRow}
          onPress={this.toggleMainExpand}
        >
          <ApplicationPage />
          <Text style={styles.itemTitleText}>My Applications</Text>
          <View style={styles.chevronArrowContainer}>
            {this.state.mainExpanded ? <ChevronBottom /> : <ChevronRight />}
          </View>
        </TouchableOpacity>

        {this.state.mainExpanded ? (
          <View style={styles.itemContentBody}>
            <TouchableOpacity
              style={styles.itemTitleRow}
              onPress={this.toggleNoDecisionExpand}
            >
              <LargeCrossCircle />
              <Text style={styles.itemTitleText}>No Decision</Text>
              <View style={styles.chevronArrowContainer}>
                {this.state.noDecisionExpanded ? (
                  <ChevronBottom />
                ) : (
                  <ChevronRight />
                )}
              </View>
            </TouchableOpacity>

            {this.state.mainExpanded && this.state.noDecisionExpanded ? (
              <View style={styles.itemContentBody}>
                {this.noDecisionSubmissions ? (
                  this.noDecisionSubmissions.map((submission, keyIndex) => {
                    return (
                      <ApplicationElement
                        key={keyIndex}
                        submission={submission}
                      />
                    );
                  })
                ) : (
                  <View style={styles.description}>
                    <Text>No Submissions with "No Decision" Decision</Text>
                  </View>
                )}
              </View>
            ) : null}

            <TouchableOpacity
              style={styles.itemTitleRow}
              onPress={this.toggleSelectedExpand}
            >
              <PlayButton />
              <Text style={styles.itemTitleText}>Selected</Text>
              <View style={styles.chevronArrowContainer}>
                {this.state.selectedExpanded ? (
                  <ChevronBottom />
                ) : (
                  <ChevronRight />
                )}
              </View>
            </TouchableOpacity>

            {this.state.mainExpanded && this.state.selectedExpanded ? (
              <View style={styles.itemContentBody}>
                {this.selectedSubmissions ? (
                  this.selectedSubmissions.map((submission, keyIndex) => {
                    return (
                      <ApplicationElement
                        key={keyIndex}
                        submission={submission}
                      />
                    );
                  })
                ) : (
                  <View style={styles.description}>
                    <Text>No Submissions with "Selected" Decision</Text>
                  </View>
                )}
              </View>
            ) : null}

            <TouchableOpacity
              style={styles.itemTitleRow}
              onPress={this.toggleNotSelectedExpand}
            >
              <StopButton />
              <Text style={styles.itemTitleText}>Not Selected</Text>
              <View style={styles.chevronArrowContainer}>
                {this.state.notSelectedExpanded ? (
                  <ChevronBottom />
                ) : (
                  <ChevronRight />
                )}
              </View>
            </TouchableOpacity>
          </View>
        ) : null}

        {this.state.mainExpanded && this.state.notSelectedExpanded ? (
          <View style={styles.itemContentBody}>
            {this.notSelectedSubmissions ? (
              this.notSelectedSubmissions.map((submission, keyIndex) => {
                return (
                  <ApplicationElement key={keyIndex} submission={submission} />
                );
              })
            ) : (
              <View style={styles.description}>
                <Text>No Submissions with "Not Selected" Decision</Text>
              </View>
            )}
          </View>
        ) : null}
      </View>
    );
  }
}

export default ApplicationContent;

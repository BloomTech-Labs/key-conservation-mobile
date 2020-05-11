import React from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import styles from '../../../constants/SkilledImpact/OrgSkilledImpactBody';
import Sync from '../../../assets/jsicons/bottomnavigation/Sync';
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
          <Sync />
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
              <Sync />
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
                {this.props.submissions.map((submission, keyIndex) => {
                  if (
                    submission &&
                    submission.submission.decision === 'PENDING'
                  ) {
                    return (
                      <ApplicationElement
                        key={keyIndex}
                        submission={submission}
                      />
                    );
                  }
                })}
              </View>
            ) : null}

            <TouchableOpacity
              style={styles.itemTitleRow}
              onPress={this.toggleSelectedExpand}
            >
              <Sync />
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
                {this.props.submissions.map((submission, keyIndex) => {
                  if (
                    submission &&
                    submission.submission.decision === 'ACCEPTED'
                  ) {
                    return (
                      <ApplicationElement
                        key={keyIndex}
                        submission={submission}
                      />
                    );
                  }
                })}
              </View>
            ) : null}

            <TouchableOpacity
              style={styles.itemTitleRow}
              onPress={this.toggleNotSelectedExpand}
            >
              <Sync />
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
            {this.props.submissions.map((submission, keyIndex) => {
              if (submission && submission.submission.decision === 'DENIED') {
                return (
                  <ApplicationElement key={keyIndex} submission={submission} />
                );
              }
            })}
          </View>
        ) : null}
      </View>
    );
  }
}

export default ApplicationContent;

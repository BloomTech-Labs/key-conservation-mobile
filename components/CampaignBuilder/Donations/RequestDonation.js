import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from '../../../constants/CampaignBuilder/Donations/RequestDonation';

export default class RequestDonation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.itemContainers}>
        <Text>
          In an effort to remain transparent and help supporters know where
          their money is going, we offer organizations the option to list
          multiple, more specific goals rather than a bigger, more obscure one.
          We highly recommend taking the few additional minutes to create this
          list, but you may always create one goal if this does not apply to
          you.
        </Text>
      </View>
    );
  }
}

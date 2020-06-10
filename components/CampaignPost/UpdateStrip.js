import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../../constants/CampaignPost/UpdateStrip';
import moment from 'moment';

import { getCampaignUpdates, setCampaign } from '../../store/actions';

import { navigate } from '../../navigation/RootNavigator';

import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

class UpdateStrip extends Component {
  constructor(props) {
    super(props);

    this.mounted = false;

    this.state = {
      updates: [],
      loading: false,
      error: '',
    };
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
    if (
      this.props.campaign.campaign_id &&
      typeof this.props.campaign.campaign_id === 'number' &&
      this.state.loading === false
    )
      this.setState({
        loading: true,
      });
    this.props
      .getCampaignUpdates(this.props.campaign.campaign_id)
      .then((res) => {
        if (this.mounted) this.setState({ updates: res?.data, loading: false });
      })
      .catch((err) => {
        console.log(err);
        if (this.mounted)
          this.setState({
            loading: false,
            error: err?.message,
          });
      });
  }

  goToUpdate(index = 0) {
    this.props.setCampaign(this.props.campaign);
    navigate(
      'Campaign',
      {
        userBookmarked: this.props.campaign.userBookmarked,
        targetUpdate: index,
        updates: this.state.updates,
      },
      `${this.props.campaign.campaign_id}`
    );
  }

  render() {
    return this.state.loading ||
      this.state.error ||
      this.state.updates?.length === 0 ? null : (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Latest updates ({this.state.updates?.length})
          </Text>
          {this.state.updates?.length > 3 ? (
            <TouchableOpacity onPress={this.goToUpdate.bind(this)}>
              <Text style={{ ...styles.title, color: '#4F4F4F' }}>
                See All >
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.tileContainer}>
          {this.state.updates?.slice?.(0, 3).map?.((update, index) => {
            return (
              <TouchableOpacity
                key={update.id}
                onPress={this.goToUpdate.bind(this, index)}
              >
                <View style={styles.updateTile}>
                  <Image style={styles.image} source={{ uri: update.image }} />
                  <View style={styles.dateContainer}>
                    <Text style={styles.date}>
                      {moment(update.created_at).format('MMM DD')}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
}

export default connect(null, { getCampaignUpdates, setCampaign })(UpdateStrip);

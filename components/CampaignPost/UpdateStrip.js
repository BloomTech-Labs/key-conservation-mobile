import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import styles from '../../constants/CampaignPost/UpdateStrip';
import moment from 'moment';

import { getCampaignUpdates, setCampaign } from '../../store/actions';

import { navigate } from '../../navigation/RootNavigator';

import { connect } from 'react-redux';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

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
        const updates = res?.data?.filter(
          (u) => u.id !== this.props.campaign.id
        );
        if (this.mounted) this.setState({ updates, loading: false });
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
    const updates = this.state.updates.map((update, i) => {
      return (
        <TouchableOpacity
          key={update.id}
          onPress={this.goToUpdate.bind(this, i)}
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
    });

    return this.state.loading ? (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          height: 48,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size="small" />
        <Text style={{ fontFamily: 'Lato-Bold', fontSize: 16, marginLeft: 8 }}>
          Loading related posts...
        </Text>
      </View>
    ) : this.state.error || this.state.updates?.length === 0 ? null : (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {this.props.campaign?.is_update
              ? 'More updates '
              : `Latest updates `}
            ({this.state.updates?.length})
          </Text>
          {this.state.updates?.length > 3 ? (
            <TouchableOpacity onPress={this.goToUpdate.bind(this)}>
              <Text style={{ ...styles.title, color: '#4F4F4F' }}>
                See All >
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <ScrollView style={styles.tileContainer} horizontal>{updates}</ScrollView>
      </View>
    );
  }
}

export default connect(null, { getCampaignUpdates, setCampaign })(UpdateStrip);

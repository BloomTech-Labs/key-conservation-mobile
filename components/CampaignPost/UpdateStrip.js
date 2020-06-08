import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../../constants/CampaignPost/UpdateStrip';
import moment from 'moment';

import { getCampaignUpdates } from '../../store/actions';

import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

class UpdateStrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updates: [],
      loading: true,
      error: '',
    };
  }

  componentDidMount() {
    if (this.props.id && typeof this.props.id === 'number')
      this.props
        .getCampaignUpdates(this.props.id)
        .then((res) => {
          this.setState({ updates: res?.data, loading: false });
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            loading: false,
            error: err?.message,
          });
        });
  }

  onSeeAll() {
      // TODO Implement
  }

  onTilePressed() {
      // TODO Implement
  }

  render() {
    return this.state.loading ||
      this.state.error ||
      this.state.updates.length === 0 ? null : (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Latest updates</Text>
          {this.state.updates?.length > 3 ? (
            <TouchableOpacity onPress={this.onSeeAll}>
              <Text style={{ ...styles.title, color: '#4F4F4F' }}>
                See All >
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.tileContainer}>
          {this.state.updates.slice(0, 3).map((update) => {
            console.log(update.image);
            return (
              <TouchableOpacity key={update.id} onPress={this.onTilePressed}>
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

export default connect(null, { getCampaignUpdates })(UpdateStrip);

import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

import styles from '../constants/screens/PaymentSettingsScreen';

import { getPaymentAccountWidget } from '../store/actions';

import { connect } from 'react-redux';

class PaymentSettingsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Payments',
      headerStyle: {
        backgroundColor: '#323338',
      },
      headerTintColor: '#fff',
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      progress: 0,
      error: '',
    };
  }

  // This component needs to ask the server for a widget link
  // Once it gets it, render in a WebView

  componentDidMount() {
    this.props.getPaymentAccountWidget();
  }

  onLoadStart = () => {
    this.setState({
      loading: true,
      progress: 0,
      error: '',
    });
  };

  onLoadProgress = ({ nativeEvent }) => {
    this.setState({
      progress: nativeEvent.progress,
    });
  };

  onLoadEnd = () => {
    this.setState({
      loading: false,
    });
  };

  onLoadError = () => {
    this.setState({
      loading: false,
      error: 'Failed to load widget',
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.section}>
          {this.state.loading && (
            <View
              style={{
                ...styles.progressBar,
                backgroundColor: this.state.error ? 'crimson' : 'gray',
              }}
            >
              <View
                style={{
                  ...styles.fill,
                  width: `${this.state.progress * 100 || 0}%`,
                  backgroundColor: this.state.error ? 'crimson' : 'dodgerblue',
                }}
              />
            </View>
          )}
          {this.props.error ? (
            <View style={styles.contentContainer}>
              <Text style={styles.errorText}>{this.props.error}</Text>
            </View>
          ) : this.props.loading ? (
            <View style={styles.contentContainer}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <WebView
              overScrollMode="never"
              originWhitelist={['*']}
              onLoadStart={this.onLoadStart}
              onLoadProgress={this.onLoadProgress}
              onLoadEnd={this.onLoadEnd}
              onError={this.onLoadError}
              containerStyle={{
                flex: 1,
              }}
              source={{
                html: `<meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0'><iframe src='${this.props.widget}' style='width: 100%; height: 100%; border: none' />`,
              }}
            />
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.pending.getPaymentWidget,
  error: state.errors.getPaymentWidget,
  widget: state.paymentWidgetUrl,
});

export default connect(mapStateToProps, { getPaymentAccountWidget })(
  PaymentSettingsScreen
);
